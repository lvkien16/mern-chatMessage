import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return next(errorHandler(400, "All fields are required"));
  }

  const hashPassword = await bcryptjs.hash(password, 10);
  const newUser = new User({
    name,
    email,
    password: hashPassword,
  });
  try {
    await newUser.save();
    res.json("User created successfully");
  } catch (err) {
    next(err);
  }
};
