import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function LikePost({ post, refreshPage }) {
  const { currentUser } = useSelector((state) => state.user);

  const handleLikePost = async (id) => {
    try {
      const res = await fetch(`/api/post/like/${id}/${currentUser._id}`, {
        method: "PUT",
      });
      if (res.ok) {
        const data = await res.json();
      }
      refreshPage();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className="w-full py-3 hover:bg-gray-300 hover:cursor-pointer rounded flex gap-2 items-center px-3"
      onClick={() => handleLikePost(post._id)}
    >
      <FaHeart
        className={`${
          post.likes.includes(currentUser._id) ? "text-red-500" : ""
        }`}
      />
      <span>{post.numberOfLikes}</span>
    </div>
  );
}
