import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  getConversations,
  getMessages,
  sendMessage,
} from "../controllers/message.controller.js";

const router = express.Router();

router.post("/send/:userId", verifyToken, sendMessage);
router.get("/getMessage/:userId1/:userId2", verifyToken, getMessages);
router.get("/getConversations", verifyToken, getConversations);

export default router;
