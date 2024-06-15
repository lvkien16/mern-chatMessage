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
    user: req.user.id,
  });
  try {
    const savedPost = await post.save();
    res.status(201).json(savedPost);
  } catch (error) {
    next(error);
  }
};

export const getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({ userId: req.params.userId }).sort({
      createdAt: -1,
    });
    res.json(posts);
  } catch (error) {
    next(error);
  }
};

export const getPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId);
    res.json(post);
  } catch (error) {
    next(error);
  }
};

export const likePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return next(errorHandler(404, "Post not found"));
    }
    const userIndex = post.likes.indexOf(req.params.userId);
    if (userIndex === -1) {
      post.numberOfLikes += 1;
      post.likes.push(req.user.id);
    } else {
      post.numberOfLikes -= 1;
      post.likes.splice(userIndex, 1);
    }
    await post.save();
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

export const editPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return next(errorHandler(404, "Post not found"));
    }
    if (req.user.id !== post.userId) {
      return next(errorHandler(403, "You can only edit your own posts"));
    }
    post.content = req.body.content;
    await post.save();
    res.json(post);
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return next(errorHandler(404, "Post not found"));
    }
    if (req.user.id !== post.userId) {
      return next(errorHandler(403, "You can only delete your own posts"));
    }
    await Post.findByIdAndDelete(req.params.postId);
    res.status(200).json("Post deleted");
  } catch (error) {
    next(error);
  }
};
