import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function ListConversations({ id, refresh, currentUser }) {
  const [user, setUser] = useState({});
  const location = useLocation();
  const parts = location.pathname.split("/");
  const userId = parts[2];
  const [lastMessage, setLastMessage] = useState("");
  const [userLastSend, setUserLastSend] = useState("");

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
  }, [id, refresh]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(
          `/api/message/getMessage/${currentUser._id}/${id}`
        );
        const data = await response.json();
        if (response.ok) {
          setLastMessage(data[data.length - 1].content);
          setUserLastSend(data[data.length - 1].userIdSend);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchMessages();
  }, [currentUser._id, id, refresh]);

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
          <div className="flex flex-col w-2/3">
            <p className="font-semibold">{user.name}</p>
            <p className="block text-sm text-gray-600 overflow-hidden text-ellipsis whitespace-nowrap">
              {userLastSend === currentUser._id ? (
                <span>You: </span>
              ) : (
                <span>{user.name}: </span>
              )}
              {lastMessage}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
