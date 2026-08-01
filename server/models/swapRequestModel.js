const mongoose = require('mongoose');

const swapRequestSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    status: {
      type: String,
      enum: ['PENDING', 'ACCEPTED', 'REJECTED', 'CANCELLED', 'COMPLETED'],
      default: 'PENDING',
    },
    message: {
      type: String,
      default: '',
    },
    offeredSkills: {
      type: [String],
      required: true,
    },
    requestedSkills: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const SwapRequest = mongoose.model('SwapRequest', swapRequestSchema);

module.exports = SwapRequest;
