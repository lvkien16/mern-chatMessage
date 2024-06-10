import express from "express";
import {
  changeAvatar,
  changeUserName,
  getUser,
  signout,
} from "../controllers/user.controller.js";
import { verifyToken } from "./../utils/verifyUser.js";

const router = express.Router();

router.get("/getuser/:userId", getUser);
router.post("/sign-out", signout);
router.put("/change-avatar", verifyToken, changeAvatar);
router.put("/change-user-name", verifyToken, changeUserName);

export default router;
