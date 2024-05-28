import Friends from "../models/friend.model.js";

export const addFriend = async (req, res, next) => {
  const { friendId } = req.params;
  try {
    const friend = await Friends.findOne({ userId: req.user.id });
    if (!friend.requested.includes(friendId)) {
      friend.requested.push(friendId);
      friend.numberOfRequests += 1;
      await friend.save();
      res.status(200).json("Friend request sent successfully");
    } else {
      const index = friend.requested.indexOf(friendId);
      if (index > -1) {
        friend.requested.splice(index, 1);
        friend.numberOfRequests -= 1;
        await friend.save();
        res.status(200).json("Friend request removed successfully");
      } else {
        res.status(400).json("Friend request not found");
      }
    }
  } catch (error) {
    next(error);
  }
};

export const getFriends = async (req, res, next) => {
  try {
    const friend = await Friends.findOne({ userId: req.user.id });
    res.status(200).json(friend);
  } catch (error) {
    next(error);
  }
};

export const confirmRequest = async (req, res, next) => {
  const { friendId } = req.params;
  try {
    const friend = await Friends.findOne({ userId: req.user.id });

    if (friend.requested.includes(friendId)) {
      friend.requested.splice(friend.requested.indexOf(friendId), 1);
      friend.friends.push(friendId);
      friend.numberOfRequests -= 1;
      friend.numberOfFriends += 1;
      await friend.save();
      res.status(200).json("Friend request confirmed successfully");
    } else {
      res.status(400).json("Friend request not found");
    }
  } catch (error) {
    next(error);
  }
};
