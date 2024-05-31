import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import MessageDetail from "../components/messages/MessageDetail";
import ListConversations from "../components/messages/ListConversations";
import { useSelector } from "react-redux";

export default function Messages() {
  const { userId } = useParams();
  const { currentUser } = useSelector((state) => state.user);
  const [conversations, setConversations] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const refreshFriendRequests = () => {
    setRefresh((prevRefresh) => !prevRefresh);
  };

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const res = await fetch("/api/message/getConversations");
        if (!res.ok) {
          return;
        }
        const data = await res.json();
        setConversations(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchConversations();
  }, [userId, refresh]);

  return (
    <>
      <div className="container mx-auto px-4">
        <div className="md:flex justify-between">
          <div className={`bg-gray-300 px-2 md:w-1/3 `}>
            <div className="title py-3 border-b">
              <h3 className="text-xl font-semibold h-12 flex items-center justify-center">
                Messaage
              </h3>
            </div>
            {
              <div className="pt-3 md:h-screen-60px-72px overflow-y-auto">
                {conversations.length === 0 && (
                  <h3 className="text-center font-semibold mt-5">
                    No messages
                  </h3>
                )}
                {conversations.map((conversation) => (
                  <>
                    <ListConversations
                      key={conversation}
                      id={conversation}
                      refresh={refresh}
                    />
                  </>
                ))}
              </div>
            }
          </div>
          <div className="md:w-2/3 px-2 md:border-x-2">
            <div className="content">
              {userId ? (
                <MessageDetail
                  userId={userId}
                  refreshFriendRequests={refreshFriendRequests}
                />
              ) : (
                <h3 className="text-center font-semibold mt-5">
                  Select a message
                </h3>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
