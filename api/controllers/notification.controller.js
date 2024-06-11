import Notification from "../models/notification.model.js";
import { errorHandler } from "../utils/error.js";

export const sendNotification = async ({
  userId,
  type,
  content,
  link,
  from,
}) => {
  const notification = new Notification({
    userId,
    type,
    content,
    link,
    from,
  });
  return notification.save();
};

export const getNotifications = async (req, res, next) => {
  try {
    const notifications = await Notification.find({
      userId: req.user.id,
    }).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (error) {
    next(error);
  }
};

export const readNotification = async (req, res, next) => {
  try {
    const notification = await Notification.findById(req.params.notificationId);
    if (!notification) {
      return next(errorHandler(404, "Notification not found"));
    }
    notification.read = true;
    await notification.save();
    res.status(200).json(notification);
  } catch (error) {
    next(error);
  }
};

export const deleteNotification = async (req, res, next) => {
  try {
    const notification = await Notification.findByIdAndDelete(
      req.params.notificationId
    );
    if (!notification) {
      return next(errorHandler(404, "Notification not found"));
    }
    res.status(200).json("Notification deleted");
  } catch (error) {
    next(error);
  }
};
