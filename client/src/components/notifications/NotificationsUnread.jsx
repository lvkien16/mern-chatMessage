import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export default function NotificationsUnread({ notification }) {
  const [user, setUser] = useState({});
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/user/getuser/${notification.from}`);
        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, [notification]);

  const handleRead = async () => {
    try {
      await fetch(`/api/notification/read/${notification._id}`, {
        method: "PUT",
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div
        className={` rounded-lg px-2 border-2 bg-gray-400`}
        onClick={handleRead}
      >
        <Link
          as="div"
          to={notification.link}
          key={notification._id}
          className="flex items-center gap-3 py-3 border-b"
        >
          <img
            src={user.avatar}
            className="w-12 h-12 rounded-full border-2 border-emerald-700"
            alt=""
          />
          <div>
            <p>{notification.content}</p>
            <p className="text-xs text-gray-500">
              {new Date(notification.createdAt).toLocaleString()}
            </p>
          </div>
        </Link>
      </div>
    </>
  );
}
