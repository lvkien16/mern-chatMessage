import mongoose from "mongoose";

const friendSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    requested: {
      type: Array,
      default: [],
    },
    requestSend: {
      type: Array,
      default: [],
    },
    friends: {
      type: Array,
      default: [],
    },
    numberOfRequests: {
      type: Number,
      default: 0,
    },
    numberOfFriends: {
      type: Number,
      default: 0,
    },
    numberOfRequestsSent: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Friend = mongoose.model("Friends", friendSchema);

export default Friend;
