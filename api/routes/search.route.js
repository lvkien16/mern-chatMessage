import express from "express";
import { verifyToken } from "./../utils/verifyUser.js";
import { search } from "../controllers/search.controller.js";

const router = express.Router();

router.get("/:search", verifyToken, search);

export default router;
