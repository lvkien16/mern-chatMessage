import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function ListConversations({ id }) {
  const [user, setUser] = useState({});
  const location = useLocation();
  const parts = location.pathname.split("/");
  const userId = parts[2];
  useEffect(() => {
    const fetchGetUser = async () => {
      try {
        const response = await fetch(`/api/user/getuser/${id}`);
        const data = await response.json();
        if (response.ok) {
          setUser(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchGetUser();
  }, [id]);

  return (
    <div>
      <Link
        to={`/messages/${user._id}`}
        className={`block mb-5 rounded-l-full hover:bg-gray-100 ${
          userId === user._id ? "bg-gray-100" : ""
        }`}
      >
        <div className="flex gap-2 items-center">
          <img
            src={user.avatar}
            alt=""
            className="w-12 h-12 rounded-full border-2 border-emerald-700"
          />
          <div className="">
            <p className="font-semibold">{user.name}</p>
            <p className="text-sm text-gray-600">Last content</p>
          </div>
        </div>
      </Link>
    </div>
  );
}
