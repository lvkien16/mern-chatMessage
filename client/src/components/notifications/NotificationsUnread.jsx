import { Dropdown } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function NotificationsUnread({ notification, refreshPage }) {
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
      refreshPage();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/notification/delete/${id}`, {
        method: "DELETE",
      });
      refreshPage();
      toast.success("Notification deleted successfully!");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div
        className={` rounded-lg px-2 border-2 bg-gray-400 flex justify-between items-center gap-2`}
      >
        <Link
          onClick={handleRead}
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
        <div>
          <Dropdown arrowIcon={false} inline label={<BsThreeDotsVertical />}>
            <Dropdown.Item onClick={() => handleDelete(notification._id)}>
              <span>Delete</span>
            </Dropdown.Item>
            {notification.read === false && (
              <Dropdown.Item onClick={handleRead}>
                <span>Mark as read</span>
              </Dropdown.Item>
            )}
          </Dropdown>
        </div>
      </div>
    </>
  );
}
