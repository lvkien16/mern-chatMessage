import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import Friend from "../models/friend.model.js";

export const getPosts = async (req, res, next) => {
  try {
    const friendsOfUser = await Friend.find({ userId: req.user.id }).select(
      "friends"
    );

    const friendsIds = friendsOfUser[0].friends;

    const postsForNewsFeed = await Post.find({
      $or: [{ userId: req.user.id }, { userId: { $in: friendsIds } }],
    })
      .populate("userId", "name avatar _id")
      .sort({ createdAt: -1 });

    res.status(200).json(postsForNewsFeed);
  } catch (error) {}
};
