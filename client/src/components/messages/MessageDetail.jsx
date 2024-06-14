import React, { useEffect, useRef, useState } from "react";
import { IoMdSend } from "react-icons/io";
import { useSelector } from "react-redux";
import moment from "moment";
import io from "socket.io-client";

const socket = io("http://localhost:3000");

export default function MessageDetail({ userId, refeshPage, refresh }) {
  const { currentUser } = useSelector((state) => state.user);
  const elementRef = useRef(null);
  const [elementWidth, setElementWidth] = useState(0);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState({});
  const userId1 = currentUser._id;

  const updateWidth = () => {
    if (elementRef.current) {
      setElementWidth(elementRef.current.offsetWidth);
    }
  };

  useEffect(() => {
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    const res = await fetch(`/api/message/send/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: message,
        userId: currentUser._id,
        userIdReceive: userId,
      }),
    });

    const data = await res.json();
    setMessages([...messages, data]);

    setMessage(""); // Clear message input after sending

    if (!res.ok) {
      return;
    }
  };

  useEffect(() => {
    // Listen for 'chat-message' event from server
    socket.on("chat-message", (message) => {
      setMessages([...messages, message]);
    });

    // Clean up socket event listener on unmount
    return () => {
      socket.off("chat-message");
    };
  }, [messages]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch(
          `/api/message/getMessage/${currentUser._id}/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!res.ok) {
          return;
        }
        const data = await res.json();
        setMessages(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    fetchMessages();
  }, [userId, currentUser._id, refresh]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/user/getuser/${userId}`);
        if (!res.ok) {
          return;
        }
        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, [userId]);

  return (
    <>
      <div className="" ref={elementRef}>
        <div className="flex items-center gap-3 py-3 border-b">
          <img
            src={user.avatar}
            className="w-12 h-12 rounded-full border-2 border-emerald-700"
            alt=""
          />
          <span className="font-semibold">{user.name}</span>
        </div>
        <div className="message-contents pb-10 h-screen-60px-72px overflow-y-auto">
          {messages.length === 0 ? (
            <h3 className="text-center font-semibold mt-5">No messages</h3>
          ) : (
            messages.map((message) => (
              <div
                key={message._id}
                className={`${
                  message.userIdSend === currentUser._id
                    ? "right-message-content"
                    : "left-message-content"
                } px-2`}
              >
                <div
                  className={`${
                    message.userIdSend === currentUser._id
                      ? "message-box ms-auto bg-emerald-700 p-3 rounded-lg w-2/3 my-3"
                      : "message-box bg-gray-300 p-3 rounded-lg w-2/3 my-3"
                  }`}
                >
                  <p
                    className={`${
                      message.userIdSend === currentUser._id
                        ? " text-white"
                        : "text-gray-800"
                    }`}
                  >
                    {message.content}
                  </p>
                  <p
                    className={`text-sm text-end ${
                      message.userIdSend === currentUser._id
                        ? " text-white"
                        : "text-gray-800"
                    }`}
                  >
                    {moment(message.createdAt).fromNow()}
                  </p>
                </div>
              </div>
            ))
          )}

          <div
            className="fixed bottom-0 bg-gray-300 rounded-l-full rounded-r-md"
            style={{ width: elementWidth }}
          >
            <form className="flex gap-3" onSubmit={handleSendMessage}>
              <textarea
                rows={1}
                type="text"
                name="content"
                className="border border-gray-300 p-2 rounded-full w-full resize-none"
                placeholder="Type a message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
              <button
                type="submit"
                className="bg-emerald-700 text-white px-5 rounded-md hover:bg-white hover:text-emerald-700 border-2 border-emerald-700"
              >
                <IoMdSend />
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
