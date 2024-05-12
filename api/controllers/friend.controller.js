import Friends from "../../client/src/pages/Friends";

export const addFriends = async (req, res, next) => {
  try {
    const { userId, friendId } = req.body;
    const newFriend = new Friends({
      userId,
      friendId,
    });

    await newFriend.save();

    res.status(200).json(newFriend);
  } catch (error) {
    next(error);
  }
};
