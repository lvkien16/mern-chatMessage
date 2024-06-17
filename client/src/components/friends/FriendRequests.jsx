import React, { useEffect, useState } from "react";
import { IoCheckmark } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import UseRefreshPage from "../UseRefreshPage";

export default function FriendRequests({ friend, refreshPage }) {
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

  const handleRemoveRequest = async (id) => {
    try {
      const res = await fetch(`/api/friend/add-friend/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (!res.ok) {
        return console.log("error");
      }
      refreshPage();
    } catch (error) {
      console.log(error);
    }
  };

  const handleConfirmRequest = async (id) => {
    try {
      const res = await fetch(`/api/friend/confirm-request/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (!res.ok) {
        return console.log("error");
      }
      refreshPage();
    } catch (error) {
      console.log(error);
    }
  };
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
          <button
            type="button"
            onClick={() => {
              handleConfirmRequest(user._id);
            }}
            className="flex items-center gap-1 font-semibold border-2 border-emerald-700 rounded bg-emerald-700 text-white hover:text-emerald-700 hover:bg-transparent"
          >
            <span>Confirm</span>
            <IoCheckmark className="text-xl" />
          </button>
          <button
            type="button"
            onClick={() => {
              handleRemoveRequest(user._id);
            }}
            className="flex items-center gap-1 font-semibold border-2 border-emerald-700 rounded bg-emerald-700 text-white hover:text-emerald-700 hover:bg-transparent"
          >
            <span>Delete</span>
            <MdDeleteOutline className="text-xl" />
          </button>
        </div>
      </div>
    </>
  );
}
