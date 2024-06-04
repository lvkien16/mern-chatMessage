import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

export const search = async (req, res, next) => {
  try {
    const users = await User.find({
      name: { $regex: req.params.search, $options: "i" },
    });
    res.json(users);
  } catch (error) {
    next(error);
  }
};
