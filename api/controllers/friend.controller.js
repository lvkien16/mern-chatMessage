import Friends from "../models/friend.model.js";

export const addFriend = async (req, res, next) => {
  const { friendId } = req.params;
  try {
    const friend = await Friends.findOne({ userId: req.user.id });
    if (!friend.requested.includes(friendId)) {
      friend.requested.push(friendId);
      friend.numberOfRequests += 1;
      await friend.save();
      res.status(200).json("Friend added successfully");
    } else {
      friend.requested.slice(friend.requested.indexOf(friendId), 1);
      friend.numberOfRequests -= 1;
    }
  } catch (error) {
    next(error);
  }
};
