import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Comment from "./Comment";

export default function CommentSection({ postId, refreshPage, refresh }) {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/comment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: comment,
          postId,
          userId: currentUser._id,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setComment("");
        setComments([data, ...comments]);
        refreshPage();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await fetch(`/api/comment/getcomments/${postId}`);
        if (res.ok) {
          const data = await res.json();
          setComments(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getComments();
  }, [postId, refresh]);
  return (
    <>
      <div>
        <form onSubmit={handleSubmitComment} className="flex">
          <img
            src={currentUser.avatar}
            className="w-10 h-10 rounded-full bg-gray-300 mr-3 hidden lg:block"
            alt=""
          />
          <textarea
            required
            name="content"
            value={comment}
            rows={1}
            placeholder={`Comment...`}
            className="rounded-full w-full px-2 resize-none"
            onChange={(e) => setComment(e.target.value)}
          />
          <button className="rounded bg-emerald-700 hover:bg-transparent text-white hover:text-emerald-700 border-2 px-3">
            Send
          </button>
        </form>
      </div>
      <div>
        {comments.map((comment) => (
          <Comment key={comment._id} comment={comment} />
        ))}
      </div>
    </>
  );
}
