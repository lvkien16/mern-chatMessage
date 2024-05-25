import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    postId: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    numberOfLikes: {
      type: Number,
      default: 0,
    },
    likes: {
      type: Array,
      default: [],
    },
    respondComments: {
      type: Array,
      default: [],
      userId: {
        type: String,
        required: true,
      },
      userName: {
        type: String,
        required: true,
      },
      userAvatar: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      numberOfLikes: {
        type: Number,
        default: 0,
      },
      likes: {
        type: Array,
        default: [],
      },
      responsedAt: {
        type: Date,
        default: new Date(),
      },
    },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
