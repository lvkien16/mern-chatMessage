import express from "express";
import { create, getPost, getPosts } from "../controllers/post.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", verifyToken, create);
router.get("/getposts/:userId", verifyToken, getPosts);
router.get("/getpost/:postId", verifyToken, getPost);

export default router;
