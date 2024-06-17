import React from "react";
import { FaComment } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import NumberOfComment from "../comments/NumberOfComment";

export default function CommentPost({ post, refresh }) {
  const navigate = useNavigate();
  const handleCommentPost = (postId) => {
    navigate(`/post/${postId}`);
    console.log("Commenting on post");
  };
  return (
    <div
      onClick={() => {
        handleCommentPost(post._id);
      }}
      className="w-full py-3 hover:bg-gray-300 hover:cursor-pointer rounded flex gap-2 items-center px-3"
    >
      <FaComment />
      <NumberOfComment postId={post._id} refresh={refresh} />
    </div>
  );
}
