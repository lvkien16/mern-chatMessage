import Message from "../models/message.model.js";
import { errorHandler } from "../utils/error.js";
import { sendNotification } from "./notification.controller.js";

export const sendMessage = async (req, res, next) => {
  const { userId } = req.params;
  const { content } = req.body;

  if (!req.user || !userId || !content) {
    return next(errorHandler(400, "Invalid data"));
  }

  const message = new Message({
    userIdSend: req.user.id,
    userIdReceive: userId,
    content,
  });

  try {
    const savedMessage = await message.save();

    await sendNotification({
      userId,
      type: "message",
      content: "You have a new message!",
      link: `/messages/${req.user.id}`,
      from: req.user.id,
    });

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

// Get all users that the current user has sent messages to or received messages from
export const getConversations = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const messages = await Message.find({
      $or: [{ userIdSend: userId }, { userIdReceive: userId }],
    }).sort({ createdAt: -1 });
    const users = messages.reduce((acc, message) => {
      if (message.userIdSend !== userId) {
        acc[message.userIdSend] = message.userIdSend;
      }
      if (message.userIdReceive !== userId) {
        acc[message.userIdReceive] = message.userIdReceive;
      }
      return acc;
    }, {});
    res.json(Object.keys(users));
  } catch (error) {
    next(error);
  }
};
