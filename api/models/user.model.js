import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
      default:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png",
    },
    // check if user doesn't have an avatar, then user the default avatar
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: false,
    },
    birthday: {
      type: Date,
      required: false,
    },
    bio: {
      type: String,
      required: false,
    },
    hometown: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("Users", userSchema);

export default User;
