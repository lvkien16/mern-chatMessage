import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AllNotifications from "./../components/notifications/AllNotifications";
import NotificationsUnread from "../components/notifications/NotificationsUnread";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Notifications() {
  const { currentUser } = useSelector((state) => state.user);
  const [notifications, setNotifications] = useState([]);
  const [unreadNotifications, setUnreadNotifications] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const refreshPage = () => {
    setRefresh((prevRefresh) => !prevRefresh);
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await fetch("/api/notification/get-notifications", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentUser.token}`,
          },
        });

        const data = await res.json();
        setNotifications(data);

        const unread = data.filter((notification) => !notification.read);
        setUnreadNotifications(unread);
      } catch (error) {
        console.log(error);
      }
    };

    fetchNotifications();
  }, [currentUser, refresh]);

  return (
    <>
      <div className="container mx-auto px-4">
        <div className="md:flex justify-center">
          <div className={`bg-gray-300 px-2 md:w-1/3`}>
            <div className="title py-3 border-b">
              <h3 className="text-xl font-semibold h-12 flex items-center justify-center">
                Unread
              </h3>
            </div>
            <div className="pt-3 md:h-screen-60px-72px overflow-y-auto">
              {unreadNotifications.length === 0 ? (
                <h3 className="text-center font-semibold mt-5">
                  No unread notifications
                </h3>
              ) : (
                <>
                  {unreadNotifications.map((notification) => (
                    <NotificationsUnread
                      key={notification._id}
                      notification={notification}
                      refreshPage={refreshPage}
                    />
                  ))}
                </>
              )}
            </div>
          </div>
          <div className="md:w-2/3 h-screen-60px px-2 border-x">
            <div className="title py-3 border-b">
              <h3 className="text-xl font-semibold h-12 flex items-center justify-center">
                All
              </h3>
            </div>
            {notifications.length === 0 ? (
              <h3 className="text-center font-semibold mt-5">
                No notifications
              </h3>
            ) : (
              <div className="pt-3 md:h-screen-60px-72px overflow-y-auto">
                {notifications.map((notification) => (
                  <AllNotifications
                    key={notification._id}
                    notification={notification}
                    refreshPage={refreshPage}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}
