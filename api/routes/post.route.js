import express from "express";
import {
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

export default router;
