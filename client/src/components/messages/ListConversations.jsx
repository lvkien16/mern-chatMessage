import { Dropdown } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ListConversations({
  id,
  refresh,
  currentUser,
  refeshPage,
}) {
  const [user, setUser] = useState({});
  const location = useLocation();
  const parts = location.pathname.split("/");
  const userId = parts[2];
  const [lastMessage, setLastMessage] = useState("");
  const [userLastSend, setUserLastSend] = useState("");
  const navigate = useNavigate();

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
        if (response.ok && data.length > 0) {
          setLastMessage(data[data.length - 1].content);
          setUserLastSend(data[data.length - 1].userIdSend);
          setTimeOfLastMessage(data[data.length - 1].createdAt);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchMessages();
  }, [currentUser._id, id, refresh]);

  const handleDeleteConversation = async (id) => {
    try {
      const response = await fetch(`/api/message/delete-conversation/${id}`, {
        method: "PUT",
      });
      if (!response.ok) {
        return;
      }
      refeshPage();
      if (userId) {
        navigate(`/messages`);
      }
      toast.success("Conversation deleted successfully!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex gap-2 items-center justify-between mb-5">
      <Link
        to={`/messages/${user._id}`}
        as="div"
        className={`block rounded-l-full hover:bg-gray-100 ${
          userId === user._id ? "bg-gray-100" : ""
        } w-11/12`}
      >
        <div className="flex gap-2 items-center">
          <img
            src={user.avatar}
            alt=""
            className="w-12 h-12 rounded-full border-2 border-emerald-700"
          />
          <div className="flex flex-col w-2/3">
            <p className="font-semibold">{user.name}</p>
            <p className="block text-sm text-gray-600 overflow-hidden text-ellipsis whitespace-nowrap w-2/3">
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
      <div>
        <Dropdown arrowIcon={false} inline label={<BsThreeDotsVertical />}>
          <Dropdown.Item
            onClick={() => {
              handleDeleteConversation(user._id);
            }}
          >
            <span>Delete</span>
          </Dropdown.Item>
          <Dropdown.Item>
            <span>Mark as read</span>
          </Dropdown.Item>
        </Dropdown>
      </div>
    </div>
  );
}
