import React, { useEffect, useState } from "react";

export default function NumberOfComment({ postId, refresh }) {
  const [comments, setComments] = useState([]);
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
  return <div>{comments.length}</div>;
}
