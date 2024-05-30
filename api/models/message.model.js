import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    userIdSend: {
      type: String,
      required: true,
    },
    userIdReceive: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    seen: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;
