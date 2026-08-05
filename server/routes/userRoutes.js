const express = require('express');
const router = express.Router();
const { getUserProfile, updateUserProfile, searchUsers, addUserReview } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.route('/search').get(protect, searchUsers);
router.route('/me').get(protect, getUserProfile).put(protect, updateUserProfile);
router.route('/:id/reviews').post(protect, addUserReview);

module.exports = router;
