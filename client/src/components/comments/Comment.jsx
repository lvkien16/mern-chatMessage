import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { AiFillLike } from "react-icons/ai";

export default function Comment({ comment }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/getuser/${comment.userId}`);
        const data = await res.json();
        if (res.ok) {
          setUser(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [comment]);

  return (
    <>
      <div className="my-5">
        <div className="flex">
          <img
            src={user.avatar}
            className="w-6 lg:h-10 h-6 lg:w-10 rounded-full bg-gray-300 mr-3"
            alt=""
          />
          <div className="border-2 px-3 pt-2 rounded-lg">
            <span className="font-bold">{user.name}</span>
            <p>{comment.content}</p>
          </div>
        </div>
        <div className="ms-10 flex gap-3 mt-1 items-center">
          <span className="lg:ms-4 flex items-center text-gray-500 text-sm">
            {moment(comment.createdAt).fromNow()}
          </span>
          <span className="hover:cursor-pointer hover:font-bold hover:text-emerald-700">
            Like
          </span>
          <span className="hover:cursor-pointer hover:font-bold hover:text-emerald-700">
            Response
          </span>
          <span className="flex items-center">
            3 <AiFillLike className="text-blue-500" />
          </span>
        </div>
      </div>
    </>
  );
}
