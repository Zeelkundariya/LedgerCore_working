const asyncHandler = require('express-async-handler');
const SwapRequest = require('../models/swapRequestModel');
const User = require('../models/userModel');

// @desc    Create new swap request
// @route   POST /api/swaps/request
// @access  Private
const createSwapRequest = asyncHandler(async (req, res) => {
  const { receiverId, message, offeredSkills, requestedSkills } = req.body;

  if (!receiverId || !offeredSkills || !requestedSkills) {
    res.status(400);
    throw new Error('Please provide receiverId, offeredSkills, and requestedSkills');
  }

  const swapRequest = new SwapRequest({
    senderId: req.user._id,
    receiverId,
    message,
    offeredSkills,
    requestedSkills,
    status: 'PENDING',
  });

  const createdSwapRequest = await swapRequest.save();

  res.status(201).json(createdSwapRequest);
});

// @desc    Get user's swap requests (incoming and outgoing)
// @route   GET /api/swaps/my-requests
// @access  Private
const getMySwapRequests = asyncHandler(async (req, res) => {
  const requests = await SwapRequest.find({
    $or: [{ senderId: req.user._id }, { receiverId: req.user._id }],
  }).populate('senderId', 'name profilePhoto').populate('receiverId', 'name profilePhoto');

  res.json(requests);
});

module.exports = {
  createSwapRequest,
  getMySwapRequests,
};
