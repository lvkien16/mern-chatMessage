import Message from "../models/message.model.js";
import { errorHandler } from "../utils/error.js";

export const sendMessage = async (req, res, next) => {
  if (!req.user) {
    return next(errorHandler(400, "Invalid data"));
  }
  if (!req.body.content) {
    return next(errorHandler(400, "Content is required"));
  }
  const message = new Message({
    userIdSend: req.user.id,
    userIdReceive: req.params.userId,
    content: req.body.content,
  });
  try {
    const savedMessage = await message.save();
    res.status(201).json(savedMessage);
  } catch (error) {
    next(error);
  }
};

// Get messages between two users
export const getMessages = async (req, res, next) => {
  try {
    const { userId1, userId2 } = req.params;
    const messages = await Message.find({
      $or: [
        { userIdSend: userId1, userIdReceive: userId2 },
        { userIdSend: userId2, userIdReceive: userId1 },
      ],
    }).sort({ createdAt: 1 });
    res.json(messages);
  } catch (error) {
    next(error);
  }
};

// Get all users that the current user has sent messages to
export const getConversations = async (req, res, next) => {
  try {
    const conversations = await Message.distinct("userIdReceive", {
      userIdSend: req.user.id,
    });

    res.json(conversations);
  } catch (error) {
    next(error);
  }
};
