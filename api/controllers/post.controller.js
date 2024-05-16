import Post from "../models/post.model.js";
import { errorHandler } from "../utils/error.js";

export const create = async (req, res, next) => {
  if (!req.user) {
    return next(errorHandler(400, "Invalid data"));
  }
  if (!req.body.content && !req.body.image) {
    return next(errorHandler(400, "Content or image is required"));
  }
  const post = new Post({
    userId: req.user.id,
    content: req.body.content,
    images: req.body.images,
  });
  try {
    const savedPost = await post.save();
    res.status(201).json(savedPost);
  } catch (error) {
    next(error);
  }
};
