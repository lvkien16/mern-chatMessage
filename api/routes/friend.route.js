import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { addFriend } from "../controllers/friend.controller.js";

const router = express.Router();

router.put("/add-friend/:friendId", verifyToken, addFriend);

export default router;
