import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  deleteConversation,
  deleteMessage,
  getConversations,
  getMessages,
  sendMessage,
} from "../controllers/message.controller.js";

const router = express.Router();

router.post("/send/:userId", verifyToken, sendMessage);
router.get("/getMessage/:userId1/:userId2", verifyToken, getMessages);
router.get("/getConversations", verifyToken, getConversations);
router.put("/delete-conversation/:userId", verifyToken, deleteConversation);
router.put("/delete-message/:messageId", verifyToken, deleteMessage);

export default router;
