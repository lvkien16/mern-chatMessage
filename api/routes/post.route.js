import express from "express";
import {
  commentPost,
  create,
  getPost,
  getPosts,
  likePost,
} from "../controllers/post.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", verifyToken, create);
router.get("/getposts/:userId", verifyToken, getPosts);
router.get("/getpost/:postId", verifyToken, getPost);
router.put("/like/:postId/:userId", verifyToken, likePost);
router.put("/comment/:postId/:userId", verifyToken, commentPost);

export default router;
