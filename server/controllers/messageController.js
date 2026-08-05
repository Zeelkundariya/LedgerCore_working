const asyncHandler = require('express-async-handler');
const Message = require('../models/messageModel');
const User = require('../models/userModel');

// @desc    Send a message
// @route   POST /api/messages
// @access  Private
const sendMessage = asyncHandler(async (req, res) => {
  const { receiverId, content } = req.body;

  if (!receiverId || !content) {
    res.status(400);
    throw new Error('Please provide receiver and content');
  }

  const message = await Message.create({
    sender: req.user._id,
    receiver: receiverId,
    content,
  });

  const fullMessage = await Message.findById(message._id).populate('sender', 'name profilePhoto').populate('receiver', 'name profilePhoto');

  res.status(201).json(fullMessage);
});

// @desc    Get conversation between two users
// @route   GET /api/messages/:userId
// @access  Private
const getConversation = asyncHandler(async (req, res) => {
  const otherUserId = req.params.userId;

  const messages = await Message.find({
    $or: [
      { sender: req.user._id, receiver: otherUserId },
      { sender: otherUserId, receiver: req.user._id },
    ],
  })
    .sort({ createdAt: 1 })
    .populate('sender', 'name profilePhoto')
    .populate('receiver', 'name profilePhoto');

  res.json(messages);
});

// @desc    Get all active conversations (unique users)
// @route   GET /api/messages/conversations/all
// @access  Private
const getConversations = asyncHandler(async (req, res) => {
  // Find all messages where user is sender or receiver
  const messages = await Message.find({
    $or: [{ sender: req.user._id }, { receiver: req.user._id }],
  })
    .sort({ createdAt: -1 })
    .populate('sender', 'name profilePhoto')
    .populate('receiver', 'name profilePhoto');

  // Group by unique other user
  const conversationsMap = new Map();

  messages.forEach((msg) => {
    const otherUser = msg.sender._id.toString() === req.user._id.toString() ? msg.receiver : msg.sender;
    
    if (!conversationsMap.has(otherUser._id.toString())) {
      conversationsMap.set(otherUser._id.toString(), {
        user: otherUser,
        lastMessage: msg,
      });
    }
  });

  const conversations = Array.from(conversationsMap.values());
  res.json(conversations);
});

module.exports = {
  sendMessage,
  getConversation,
  getConversations,
};
