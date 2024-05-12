import mongoose from "mongoose";

const friendSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    friends: {
      type: Array,
      default: [],
    },
    numberOfFriends: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Friends = mongoose.model("Friends", friendSchema);

export default Friends;
