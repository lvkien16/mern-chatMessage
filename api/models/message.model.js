import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    messages: {
      type: Array,
      default: [],
      users: {
        type: Array,
        default: [],
        content: {
          type: String,
          default: "",
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
        read: {
          type: Boolean,
          default: false,
        },
      },
    },
  },
  { timestamps: true }
);
