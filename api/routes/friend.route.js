import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  addFriend,
  confirmRequest,
  getFriends,
  removeFriend,
} from "../controllers/friend.controller.js";

const router = express.Router();

router.put("/add-friend/:friendId", verifyToken, addFriend);
router.get("/get-friend/:userId", verifyToken, getFriends);
router.put("/confirm-request/:friendId", verifyToken, confirmRequest);
router.put("/remove-friend/:friendId", verifyToken, removeFriend);

export default router;
