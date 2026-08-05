const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const { generateMatch } = require('../services/matchService');

// @desc    Get user profile
// @route   GET /api/users/me
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      profilePhoto: user.profilePhoto,
      location: user.location,
      skillsOffered: user.skillsOffered,
      skillsWanted: user.skillsWanted,
      availability: user.availability,
      isPublic: user.isPublic,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update user profile
// @route   PUT /api/users/me
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.profilePhoto = req.body.profilePhoto || user.profilePhoto;
    user.location = req.body.location || user.location;

    if (req.body.skillsOffered) {
      user.skillsOffered = req.body.skillsOffered;
    }
    if (req.body.skillsWanted) {
      user.skillsWanted = req.body.skillsWanted;
    }

    user.availability = req.body.availability || user.availability;

    if (req.body.isPublic !== undefined) {
      user.isPublic = req.body.isPublic;
    }

    if (req.body.password) {
      const bcrypt = require('bcryptjs');
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.password, salt);
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      profilePhoto: updatedUser.profilePhoto,
      location: updatedUser.location,
      skillsOffered: updatedUser.skillsOffered,
      skillsWanted: updatedUser.skillsWanted,
      availability: updatedUser.availability,
      isPublic: updatedUser.isPublic,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Search public users by skill
// @route   GET /api/users/search
// @access  Private (or Public, but usually need to be logged in to swap)
const searchUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.skill
    ? {
      skillsOffered: {
        $regex: req.query.skill,
        $options: 'i',
      },
    }
    : {};

  // Only return users whose profiles are public, and are not the current user
  const users = await User.find({ ...keyword, isPublic: true, _id: { $ne: req.user._id } }).select(
    '-password -email -role'
  );

  res.json(users);
});

// @desc    Add a review to a user profile
// @route   POST /api/users/:id/reviews
// @access  Private
const addUserReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const userToReview = await User.findById(req.params.id);

  if (userToReview) {
    const review = {
      reviewerName: req.user.name,
      rating: Number(rating),
      comment,
    };

    userToReview.reviews.push(review);
    await userToReview.save();
    res.status(201).json({ message: 'Review added' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Get AI Matches for current user
// @route   GET /api/users/matches
// @access  Private
const getMatches = asyncHandler(async (req, res) => {
  const currentUser = await User.findById(req.user._id);

  if (!currentUser) {
    res.status(404);
    throw new Error('User not found');
  }

  // Find all public users except current user
  const otherUsers = await User.find({ isPublic: true, _id: { $ne: req.user._id } }).select(
    '-password -email -role'
  );

  // Generate real matches
  let matches = otherUsers.map(targetUser => generateMatch(currentUser, targetUser));

  // Sort by highest match score
  matches.sort((a, b) => b.score - a.score);

  res.json(matches);
});

module.exports = {
  getUserProfile,
  updateUserProfile,
  searchUsers,
  addUserReview,
  getMatches,
};
