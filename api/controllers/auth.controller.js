import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {
  const { name, email, password, address, birthday } = req.body;
  if (!name || !email || !password || !address || !birthday) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const hashPassword = await bcryptjs.hash(password, 10);
  const newUser = new User({
    name,
    email,
    password: hashPassword,
    address,
    birthday,
  });
  try {
    await newUser.save();
    res.json("User created successfully");
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};
