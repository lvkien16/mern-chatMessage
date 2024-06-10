import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return next(errorHandler(404, "User not found"));
    }
    const { password, ...rest } = user._doc;
    res.json(rest);
  } catch (error) {
    next(error);
  }
};

export const signout = async (req, res, next) => {
  try {
    res.clearCookie("access_token").status(200).json("Signout success");
  } catch (error) {
    next(error);
  }
};

export const changeAvatar = async (req, res, next) => {
  try {
    const updateUser = await User.findByIdAndUpdate(
      req.user.id,
      { avatar: req.body.avatar },
      { new: true }
    );
    const { password, ...rest } = updateUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const changeUserName = async (req, res, next) => {
  try {
    const updateUser = await User.findByIdAndUpdate(
      req.user.id,
      { name: req.body.userName },
      { new: true }
    );
    const { password, ...rest } = updateUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const editProfile = async (req, res, next) => {
  try {
    const updateUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        hometown: req.body.hometown,
        birthday: req.body.birthday,
        bio: req.body.bio,
      },
      { new: true }
    );
    const { password, ...rest } = updateUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
