import React, { useEffect, useState } from "react";
import { BiMessageRounded } from "react-icons/bi";
import { IoCheckmark } from "react-icons/io5";
import { Link } from "react-router-dom";

export default function ListFriends({ friend }) {
  const [user, setUser] = useState({});
  useEffect(() => {
    const fetchGetUser = async () => {
      try {
        const response = await fetch(`/api/user/getuser/${friend}`);
        const data = await response.json();
        if (response.ok) {
          setUser(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchGetUser();
  }, [friend]);
  return (
    <>
      <div className="flex items-center gap-2 mb-5">
        <Link
          to={`/profile/${user._id}`}
          className="flex items-center gap-2 hover:bg-gray-400 w-full rounded-l-full"
        >
          <img
            src={user.avatar}
            alt=""
            className="w-12 h-12 rounded-full border-2 border-emerald-700"
          />
          <span className="font-bold">{user.name}</span>
        </Link>
        <div className="flex gap-2 ms-auto">
          <button className="flex items-center gap-1 font-semibold border-2 border-emerald-700 rounded bg-emerald-700 text-white hover:text-emerald-700 hover:bg-transparent">
            <span>Friend</span>
            <IoCheckmark className="text-xl" />
          </button>
          <Link
            to={`/messages/${user._id}`}
            className="flex items-center gap-1 font-semibold border-2 border-emerald-700 rounded bg-emerald-700 text-white hover:text-emerald-700 hover:bg-transparent"
          >
            <span>Message</span>
            <BiMessageRounded className="text-xl" />
          </Link>
        </div>
      </div>
    </>
  );
}
