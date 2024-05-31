import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  getNotifications,
  readNotification,
  sendNotification,
} from "../controllers/notification.controller.js";

const router = express.Router();

router.post("/send/:userId", verifyToken, sendNotification);
router.get("/get-notifications", verifyToken, getNotifications);
router.put("/read/:notificationId", verifyToken, readNotification);
export default router;
