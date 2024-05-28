import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FriendRequests from "../components/friends/FriendRequests";
import ListFriends from "../components/friends/ListFriends";

export default function Friends() {
  const [friendButton, setFriendButton] = useState(true);
  const [requestButton, setRequestButton] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [friendRequests, setFriendRequests] = useState([]);
  const [listFriends, setListFriends] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchGetFriend = async () => {
      try {
        const response = await fetch(
          `/api/friend/get-friend/${currentUser._id}`
        );
        const data = await response.json();
        setFriendRequests([...data.requested]);
        setListFriends([...data.friends]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchGetFriend();
  }, [currentUser, refresh]);

  const handleFriendButton = () => {
    setFriendButton(true);
    setRequestButton(false);
  };

  const handleRequestButton = () => {
    setRequestButton(true);
    setFriendButton(false);
  };

  const refreshFriendRequests = () => {
    setRefresh((prevRefresh) => !prevRefresh);
  };

  return (
    <>
      <div className="container mx-auto px-4 min-h-screen">
        <div className={`md:hidden flex gap-3 my-5 }`}>
          <button
            onClick={handleFriendButton}
            type="button"
            className={`${
              friendButton ? "bg-emerald-700 text-white" : ""
            } border-2 px-3 py-1 border-emerald-700 rounded-full hover:bg-emerald-700 hover:text-white`}
          >
            Friends
          </button>
          <button
            type="button"
            onClick={handleRequestButton}
            className={`${
              requestButton ? "bg-emerald-700 text-white" : ""
            } border-2 px-3 py-1 border-emerald-700 rounded-full hover:bg-emerald-700 hover:text-white`}
          >
            Requests
          </button>
        </div>
        <div className="md:flex justify-between">
          <div
            className={`md:w-1/2 px-2 bg-gray-200 min-h-screen ${
              friendButton ? "" : "hidden md:block"
            } `}
          >
            <h3 className="title text-center text-xl border-b-2 border-emerald-700 py-2 mb-5 font-semibold">
              Friends
            </h3>
            <div className="">
              {listFriends.length === 0 ? (
                <h5 className="text-center font-semibold">
                  No have friends yet.
                </h5>
              ) : (
                listFriends.map((friend, index) => (
                  <ListFriends key={index} friend={friend} />
                ))
              )}
            </div>
          </div>
          <div
            className={`md:w-1/2 px-2  ${
              requestButton ? "" : "hidden md:block"
            }`}
          >
            <h3 className="title text-center text-xl border-b-2 border-emerald-700 py-2 mb-5 font-semibold">
              Friend requests
            </h3>
            <div className="">
              {friendRequests.length === 0 ? (
                <h5 className="font-semibold text-center">
                  No have friend requests yet.
                </h5>
              ) : (
                friendRequests.map((friend, index) => (
                  <FriendRequests
                    key={index}
                    friend={friend}
                    refreshFriendRequests={refreshFriendRequests}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
