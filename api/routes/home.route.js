import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { getPosts } from "../controllers/home.controller.js";

const router = express.Router();

router.get("/posts-for-news-feed", verifyToken, getPosts);

export default router;
