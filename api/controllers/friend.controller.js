import Friends from "../models/friend.model.js";

export const addFriend = async (req, res, next) => {
  const { friendId } = req.params;
  try {
    const fromSend = await Friends.findOne({ userId: req.user.id });
    const fromReceive = await Friends.findOne({ userId: friendId });

    if (
      !fromSend.requestSend.includes(friendId) &&
      !fromReceive.requested.includes(req.user.id)
    ) {
      // Nếu chưa có yêu cầu kết bạn từ trước
      fromSend.requestSend.push(friendId);
      fromSend.numberOfRequestsSent += 1;
      fromReceive.requested.push(req.user.id);
      fromReceive.numberOfRequests += 1;

      await fromSend.save();
      await fromReceive.save();
      res.status(200).json("Friend request sent successfully");
    } else {
      // Nếu đã có yêu cầu kết bạn từ trước
      const indexFromSend = fromSend.requestSend.indexOf(friendId);
      const indexFromReceive = fromReceive.requested.indexOf(req.user.id);

      if (indexFromSend > -1 && indexFromReceive > -1) {
        fromSend.requestSend.splice(indexFromSend, 1);
        fromSend.numberOfRequestsSent -= 1;
        fromReceive.requested.splice(indexFromReceive, 1);
        fromReceive.numberOfRequests -= 1;

        await fromSend.save();
        await fromReceive.save();
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
  const { userId } = req.params;
  try {
    const friend = await Friends.findOne({ userId });
    res.status(200).json(friend);
  } catch (error) {
    next(error);
  }
};

export const confirmRequest = async (req, res, next) => {
  const { friendId } = req.params;
  try {
    const friend = await Friends.findOne({ userId: req.user.id });
    const friendToConfirm = await Friends.findOne({ userId: friendId });

    if (friend.requested.includes(friendId)) {
      friend.requested.splice(friend.requested.indexOf(friendId), 1);
      friend.numberOfRequests -= 1;
      friend.friends.push(friendId);
      friend.numberOfFriends += 1;
      await friend.save();

      friendToConfirm.requestSend.splice(
        friendToConfirm.requestSend.indexOf(req.user.id),
        1
      );
      friendToConfirm.numberOfRequestsSent -= 1;
      friendToConfirm.friends.push(req.user.id);
      friendToConfirm.numberOfFriends += 1;
      await friendToConfirm.save();
      res.status(200).json("Friend confirmed successfully");
    } else {
      res.status(400).json("Friend not found");
    }
  } catch (error) {
    next(error);
  }
};

export const removeFriend = async (req, res, next) => {
  const { friendId } = req.params;
  try {
    const friend = await Friends.findOne({ userId: req.user.id });
    const friendToRemove = await Friends.findOne({ userId: friendId });

    if (friend.friends.includes(friendId)) {
      friend.friends.splice(friend.friends.indexOf(friendId), 1);
      friend.numberOfFriends -= 1;
      await friend.save();

      friendToRemove.friends.splice(
        friendToRemove.friends.indexOf(req.user.id),
        1
      );
      friendToRemove.numberOfFriends -= 1;
      await friendToRemove.save();
      res.status(200).json("Friend removed successfully");
    } else {
      res.status(400).json("Friend not found");
    }
  } catch (error) {
    next(error);
  }
};
