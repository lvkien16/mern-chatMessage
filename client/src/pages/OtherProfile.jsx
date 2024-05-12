import React from "react";
import { FaHeart, FaComment, FaShareAlt } from "react-icons/fa";
import { Modal } from "flowbite-react";

export default function OtherProfile({
  currentUser,
  showAvatar,
  setShowAvatar,
  handleShowAvatar,
}) {
  return (
    <>
      <div className="container mx-auto py-5 px-4">
        <div className="flex gap-5 items-center">
          <div className="">
            <img
              onClick={handleShowAvatar}
              src={currentUser.avatar}
              alt="Avatar"
              className="rounded-full hover:cursor-pointer w-16 h-16 border-2"
            />
          </div>
          <div className="">{currentUser.name}</div>
          <div>
            <button className="bg-emerald-700 text-white hover:bg-transparent hover:text-emerald-700 px-5 py-2 rounded border-2 border-emerald-700">
              Add friend
            </button>
          </div>
        </div>
        <hr className="mt-5" />
        <div className="mt-5">
          <div className="">
            <div className="mt-3">
              <div className="md:w-2/3 lg:w-1/2 mx-auto flex items-center gap-2 mb-3">
                <img
                  src={currentUser.avatar}
                  className="w-7 h7 rounded-full"
                  alt=""
                />
                <span>{currentUser.name}</span>
              </div>
              <div className="lg:w-1/2 md:w-2/3 mx-auto mb-3">
                <p>post title</p>
              </div>
              <div className="flex justify-center">
                <img
                  className="w-full h-auto rounded-lg lg:w-1/2 md:w-2/3"
                  src="https://www.picserver.org/highway-signs2/images/status.jpg"
                  alt=""
                />
              </div>
              <div className="mx-auto lg:w-1/2 md:w-2/3">
                <div className="mt-3 flex justify-between">
                  <div className="w-1/2 flex justify-center">
                    <button className="rounded hover:bg-gray-300 dark:hover:bg-gray-800 w-full flex justify-center items-center py-3 gap-2">
                      <FaHeart className="text-gray-700 dark:text-white" />
                      <p>999</p>
                    </button>
                  </div>
                  <div className="w-1/2 flex justify-center">
                    <button className="rounded hover:bg-gray-300 dark:hover:bg-gray-800 w-full flex justify-center items-center py-3 gap-2">
                      <FaComment className="text-gray-700 dark:text-white" />
                      <p>999</p>
                    </button>
                  </div>
                  <div className="w-1/2 flex justify-center">
                    <button className="rounded hover:bg-gray-300 dark:hover:bg-gray-800 w-full flex justify-center items-center py-3 gap-2">
                      <FaShareAlt className="text-gray-700 dark:text-white" />
                      <p>999</p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal
          show={showAvatar}
          onClose={() => setShowAvatar(false)}
          popup
          size="md"
        >
          <Modal.Header />
          <Modal.Body>
            <img src={currentUser.avatar} alt="Avatar" className="w-full" />
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}
