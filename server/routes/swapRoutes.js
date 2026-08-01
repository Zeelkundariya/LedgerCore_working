const express = require('express');
const router = express.Router();
const { createSwapRequest, getMySwapRequests } = require('../controllers/swapController');
const { protect } = require('../middleware/authMiddleware');

router.route('/request').post(protect, createSwapRequest);
router.route('/my-requests').get(protect, getMySwapRequests);

module.exports = router;
