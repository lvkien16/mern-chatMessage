import React, { useState } from "react";
import { IoCheckmark } from "react-icons/io5";
import { BiMessageRounded } from "react-icons/bi";
import { Link } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";

export default function Friends() {
  const [friendButton, setFriendButton] = useState(true);
  const [requestButton, setRequestButton] = useState(false);

  const handleFriendButton = () => {
    setFriendButton(true);
    setRequestButton(false);
  };

  const handleRequestButton = () => {
    setRequestButton(true);
    setFriendButton(false);
  };
  return (
    <>
      <div className="container mx-auto px-4">
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
            className={`md:w-1/2 bg-gray-200 px-2 ${
              friendButton ? "" : "hidden md:block"
            } `}
          >
            <h3 className="title text-center text-xl border-b-2 border-emerald-700 py-2 mb-5 font-semibold">
              Friends
            </h3>
            <div className="">
              <div className="flex items-center gap-2 mb-5">
                <Link className="flex items-center gap-2 hover:bg-gray-400 w-full rounded-l-full">
                  <img
                    src="https://image.freepik.com/free-vector/user-icon_126283-435.jpg"
                    alt=""
                    className="w-12 h-12 rounded-full"
                  />
                  <span className="font-bold">John Doe</span>
                </Link>
                <div className="flex gap-2 ms-auto">
                  <button className="flex items-center gap-1 font-semibold border-2 border-emerald-700 rounded bg-emerald-700 text-white hover:text-emerald-700 hover:bg-transparent">
                    <span>Friend</span>
                    <IoCheckmark className="text-xl" />
                  </button>
                  <button className="flex items-center gap-1 font-semibold border-2 border-emerald-700 rounded bg-emerald-700 text-white hover:text-emerald-700 hover:bg-transparent">
                    <span>Message</span>
                    <BiMessageRounded className="text-xl" />
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-2 mb-5">
                <Link className="flex items-center gap-2 hover:bg-gray-400 w-full rounded-l-full">
                  <img
                    src="https://image.freepik.com/free-vector/user-icon_126283-435.jpg"
                    alt=""
                    className="w-12 h-12 rounded-full"
                  />
                  <span className="font-bold">John Doe</span>
                </Link>
                <div className="flex gap-2 ms-auto">
                  <button className="flex items-center gap-1 font-semibold border-2 border-emerald-700 rounded bg-emerald-700 text-white hover:text-emerald-700 hover:bg-transparent">
                    <span>Friend</span>
                    <IoCheckmark className="text-xl" />
                  </button>
                  <button className="flex items-center gap-1 font-semibold border-2 border-emerald-700 rounded bg-emerald-700 text-white hover:text-emerald-700 hover:bg-transparent">
                    <span>Message</span>
                    <BiMessageRounded className="text-xl" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`md:w-1/2 px-2 ${
              requestButton ? "" : "hidden md:block"
            }`}
          >
            <h3 className="title text-center text-xl border-b-2 border-emerald-700 py-2 mb-5 font-semibold">
              Friend requests
            </h3>
            <div className="">
              <div className="flex items-center gap-2 mb-5">
                <Link className="flex items-center gap-2 hover:bg-gray-400 w-full rounded-l-full">
                  <img
                    src="https://image.freepik.com/free-vector/user-icon_126283-435.jpg"
                    alt=""
                    className="w-12 h-12 rounded-full"
                  />
                  <span className="font-bold">John Doe</span>
                </Link>
                <div className="flex gap-2 ms-auto">
                  <button className="flex items-center gap-1 font-semibold border-2 border-emerald-700 rounded bg-emerald-700 text-white hover:text-emerald-700 hover:bg-transparent">
                    <span>Confirm</span>
                    <IoCheckmark className="text-xl" />
                  </button>
                  <button className="flex items-center gap-1 font-semibold border-2 border-emerald-700 rounded bg-emerald-700 text-white hover:text-emerald-700 hover:bg-transparent">
                    <span>Delete</span>
                    <MdDeleteOutline className="text-xl" />
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-2 mb-5">
                <Link className="flex items-center gap-2 hover:bg-gray-400 w-full rounded-l-full">
                  <img
                    src="https://image.freepik.com/free-vector/user-icon_126283-435.jpg"
                    alt=""
                    className="w-12 h-12 rounded-full"
                  />
                  <span className="font-bold">John Doe</span>
                </Link>
                <div className="flex gap-2 ms-auto">
                  <button className="flex items-center gap-1 font-semibold border-2 border-emerald-700 rounded bg-emerald-700 text-white hover:text-emerald-700 hover:bg-transparent">
                    <span>Confirm</span>
                    <IoCheckmark className="text-xl" />
                  </button>
                  <button className="flex items-center gap-1 font-semibold border-2 border-emerald-700 rounded bg-emerald-700 text-white hover:text-emerald-700 hover:bg-transparent">
                    <span>Delete</span>
                    <MdDeleteOutline className="text-xl" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
