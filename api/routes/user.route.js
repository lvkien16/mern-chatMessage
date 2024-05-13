import express from "express";
import { getUser, signout } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/getuser/:userId", getUser);
router.post("/sign-out", signout);

export default router;
