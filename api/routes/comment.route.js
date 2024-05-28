import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { create, getComments } from "../controllers/comment.controller.js";

const router = express.Router();

router.post("/create", verifyToken, create);
router.get("/getcomments/:postId", getComments);

export default router;
