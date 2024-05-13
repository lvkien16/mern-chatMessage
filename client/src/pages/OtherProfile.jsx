import React from "react";
import { FaHeart, FaComment, FaShareAlt, FaCaretRight } from "react-icons/fa";
import { Modal } from "flowbite-react";

export default function OtherProfile({
  currentUser,
  showAvatar,
  setShowAvatar,
  handleShowAvatar,
}) {
  return (
    <>
      <div className="container mx-auto px-4">
        <div className="md:flex justify-between">
          <div className="bg-gray-300 px-2 md:w-1/3 pt-5 md:h-screen">
            <div className="flex gap-3 items-center justify-center">
              <img
                src={currentUser.avatar}
                onClick={handleShowAvatar}
                className="rounded-full h-14 w-14 bg-gray-200 hover:cursor-pointer"
                alt=""
              />
              <h2 className="text-2xl mt-2 font-bold">{currentUser.name}</h2>
            </div>
            <div className="other information my-3 flex justify-center">
              <div className="my-5 text-center w-2/3">
                <p>From Dien Bien city</p>
                <p>Birthday 16/05/2004</p>
              </div>
            </div>
            <hr className="hidden md:block border-emerald-700" />

            <div className="flex justify-center gap-5 my-5">
              <button className="border-2 border-emerald-700 bg-emerald-700 text-white px-2 mb-3 hover:bg-transparent hover:text-emerald-700">
                Add friend
              </button>
              <button className="border-2 border-emerald-700 bg-emerald-700 text-white px-2 mb-3 hover:bg-transparent hover:text-emerald-700">
                Message
              </button>
            </div>
          </div>
          <div className="md:border-x-2 md:w-2/3 px-2 pt-5">
            <div className="">
              <div className="flex justify-between items-center">
                <div className="user flex items-center">
                  <img
                    src={currentUser.avatar}
                    className="w-6 h-6 rounded-full bg-gray-300"
                    alt=""
                  />
                  <span>
                    <FaCaretRight />
                  </span>
                  <p className="font-bold"> {currentUser.name} </p>
                </div>
              </div>
              <div className="posts">
                <div className="post title py-3">
                  <p>This is a new post</p>
                </div>
                <div className="post image">
                  <img
                    src="https://elementor.com/marketing/wp-content/uploads/sites/9/2017/09/10ways3.png"
                    alt=""
                  />
                </div>
                <div className="post services flex justify-between mt-1 gap-2">
                  <div className="w-full  py-3 hover:bg-gray-300 hover:cursor-pointer rounded flex gap-2 items-center px-3">
                    <FaHeart className="text-red-500" />
                    <span>99</span>
                  </div>
                  <div className="w-full  py-3 hover:bg-gray-300 hover:cursor-pointer rounded flex gap-2 items-center px-3">
                    <FaComment />
                    <span>100</span>
                  </div>
                  <div className="w-full  py-3 hover:bg-gray-300 hover:cursor-pointer rounded flex gap-2 items-center px-3">
                    <FaShareAlt />
                    <span>999+</span>
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
