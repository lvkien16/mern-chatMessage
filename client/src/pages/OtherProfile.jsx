import React, { useEffect, useState } from "react";
import {
  FaHeart,
  FaComment,
  FaShareAlt,
  FaCaretRight,
  FaPlus,
} from "react-icons/fa";
import { Dropdown, Modal } from "flowbite-react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoCheckmark } from "react-icons/io5";
import { Link } from "react-router-dom";

export default function OtherProfile({
  currentUser,
  showAvatar,
  setShowAvatar,
  handleShowAvatar,
  otherUser,
  posts,
  postId,
  setCurrentImageFocus,
  handleShowPostImage,
  showPostImage,
  currentImageFocus,
  showMoreImages,
  setShowMoreImages,
  imagesForModal,
  handleShowMoreImages,
  handleViewPostDetail,
  setShowPostImage,
  handleLikePost,
  refreshFriendRequests,
}) {
  const [friend, setFriend] = useState({});
  const [showRemoveFriend, setShowRemoveFriend] = useState(false);
  useEffect(() => {
    const fetchGetFriend = async () => {
      try {
        const response = await fetch(
          `/api/friend/get-friend/${currentUser._id}`
        );
        const data = await response.json();
        setFriend(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchGetFriend();
  }, [otherUser, refreshFriendRequests]);

  const handleAddFriend = async (friendId) => {
    try {
      if (friend.friends && friend.friends.includes(friendId)) {
        setShowRemoveFriend(true);
      } else if (friend.requested && friend.requested.includes(friendId)) {
        try {
          const res = await fetch(`/api/friend/confirm-request/${friendId}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ friendId }),
          });
          const data = await res.json();
          if (!res.ok) {
            return console.log("error");
          }
          refreshFriendRequests();
        } catch (error) {
          console.log(error);
        }
      } else {
        const res = await fetch(`/api/friend/add-friend/${friendId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ friendId }),
        });
        const data = await res.json();
        if (!res.ok) {
          return console.log("error");
        }
        refreshFriendRequests();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveFriend = async (friendId) => {
    try {
      const res = await fetch(`/api/friend/remove-friend/${friendId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ friendId }),
      });
      const data = await res.json();
      if (!res.ok) {
        return console.log("error");
      }
      refreshFriendRequests();
      setShowRemoveFriend(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="container mx-auto px-4">
        <div className="md:flex justify-between">
          <div className="bg-gray-300 px-2 md:w-1/3 pt-5 md:h-screen-60px overflow-y-auto">
            <div className="flex gap-3 items-center justify-center">
              <img
                src={otherUser.avatar}
                onClick={handleShowAvatar}
                className="rounded-full h-14 w-14 bg-gray-200 hover:cursor-pointer"
                alt=""
              />
              <h2 className="text-2xl mt-2 font-bold">{otherUser.name}</h2>
            </div>
            <div className="other information my-3 flex justify-center">
              <div className="my-5 text-center w-2/3">
                <p>From Dien Bien city</p>
                <p>Birthday 16/05/2004</p>
              </div>
            </div>
            <hr className="hidden md:block border-emerald-700" />

            <div className="flex justify-center gap-5 my-5">
              <button
                type="button"
                onClick={() => {
                  handleAddFriend(otherUser._id);
                }}
                className="border-2 border-emerald-700 bg-emerald-700 text-white px-2 mb-3 hover:bg-transparent hover:text-emerald-700"
              >
                {friend.requestSend &&
                friend.requestSend.includes(otherUser._id) ? (
                  <span>Cancel request</span>
                ) : friend.friends && friend.friends.includes(otherUser._id) ? (
                  <span className="flex items-center gap-1">
                    Friend
                    <IoCheckmark />
                  </span>
                ) : friend.requested &&
                  friend.requested.includes(otherUser._id) ? (
                  <span>Confirm </span>
                ) : (
                  <span>Add friend</span>
                )}
              </button>
              <Link
                to={`/messages/${otherUser._id}`}
                className="border-2 border-emerald-700 bg-emerald-700 text-white px-2 mb-3 hover:bg-transparent hover:text-emerald-700"
              >
                Message
              </Link>
            </div>
          </div>
          <div className="md:border-x-2 md:w-2/3 px-2 pt-5 md:h-screen-60px overflow-y-auto">
            <div className="">
              {posts &&
                !postId &&
                posts.map((post) => (
                  <div key={post._id}>
                    <div className="flex justify-between items-center">
                      <div className="user flex items-center">
                        <img
                          src={otherUser.avatar}
                          className="w-6 h-6 rounded-full bg-gray-300"
                          alt=""
                        />
                        <span>
                          <FaCaretRight />
                        </span>
                        <p className="font-bold"> {otherUser.name} </p>
                      </div>
                      <div className="about post">
                        <Dropdown
                          arrowIcon={false}
                          inline
                          label={<BsThreeDotsVertical />}
                        >
                          <Dropdown.Item
                            onClick={() => handleViewPostDetail(post._id)}
                          >
                            <span>View detail</span>
                          </Dropdown.Item>
                        </Dropdown>
                      </div>
                    </div>
                    <div className="posts">
                      <div className="post title py-3">
                        <p>{post.content}</p>
                      </div>
                      <div className="post image flex relative">
                        {post.images &&
                          post.images.map((image, index) => (
                            <React.Fragment key={index}>
                              <img
                                onClick={() => {
                                  setCurrentImageFocus(image);
                                  handleShowPostImage();
                                }}
                                src={image}
                                alt=""
                                className={`${
                                  post.images.length === 1
                                    ? "w-auto mx-auto max-w-full"
                                    : post.images.length === 2
                                    ? "w-1/2"
                                    : post.images.length === 3
                                    ? "w-1/3"
                                    : post.images.length === 4
                                    ? "w-1/4"
                                    : "w-1/4"
                                } ${
                                  index > 3 ? "hidden" : ""
                                } h-auto max-h-480 border-2 border-gray-200 rounded hover:cursor-pointer`}
                              />
                              {post.images.length > 4 && index === 4 && (
                                <div
                                  onClick={() =>
                                    handleShowMoreImages(post.images)
                                  }
                                  className="absolute top-0 right-0 w-1/4 h-full flex items-center justify-center font-bold text-3xl md:text-5xl bg-gray-300 bg-opacity-70 text-emerald-700 cursor-pointer rounded"
                                >
                                  <FaPlus /> {post.images.length - 4}
                                </div>
                              )}
                            </React.Fragment>
                          ))}
                      </div>
                      <div className="post services flex justify-between mb-3 border-2 border-t-0 rounded">
                        <div
                          className="w-full py-3 hover:bg-gray-300 hover:cursor-pointer rounded flex gap-2 items-center px-3"
                          onClick={() => handleLikePost(post._id)}
                        >
                          <FaHeart
                            className={`${
                              currentUser._id &&
                              post.likes.includes(currentUser._id) &&
                              "!text-red-500"
                            }`}
                          />
                          <span>{post.numberOfLikes}</span>
                        </div>
                        <div
                          onClick={() => handleViewPostDetail(post._id)}
                          className="w-full py-3 hover:bg-gray-300 hover:cursor-pointer rounded flex gap-2 items-center px-3"
                        >
                          <FaComment />
                        </div>
                        <div className="w-full py-3 hover:bg-gray-300 hover:cursor-pointer rounded flex gap-2 items-center px-3">
                          <FaShareAlt />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* show avatar */}
        <Modal
          show={showAvatar}
          onClose={() => setShowAvatar(false)}
          popup
          size="md"
        >
          <Modal.Header />
          <Modal.Body>
            <img src={otherUser.avatar} alt="Avatar" className="w-full" />
          </Modal.Body>
        </Modal>

        {/* show post image */}
        <Modal
          show={showPostImage}
          onClose={() => setShowPostImage(false)}
          popup
          size="xl"
        >
          <Modal.Header />
          <Modal.Body>
            <img src={currentImageFocus} alt="Post image" className="w-full" />
          </Modal.Body>
        </Modal>

        {/* show more images */}
        <Modal
          show={showMoreImages}
          onClose={() => setShowMoreImages(false)}
          popup
          size="xl"
        >
          <Modal.Header />
          <Modal.Body>
            <div>
              {imagesForModal.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt=""
                  className="w-full h-auto mb-3"
                />
              ))}
            </div>
          </Modal.Body>
        </Modal>

        {/* show remove friend */}
        <Modal
          show={showRemoveFriend}
          onClose={() => setShowRemoveFriend(false)}
          popup
          size="md"
        >
          <Modal.Header>
            <p className="text-center">
              Are you sure remove this user from your list friends?
            </p>
          </Modal.Header>
          <Modal.Body>
            <div className="flex justify-center gap-5">
              <button
                type="button"
                onClick={() => {
                  handleRemoveFriend(otherUser._id);
                }}
                className="border-2 border-emerald-700 bg-emerald-700 text-white px-2 hover:bg-transparent hover:text-emerald-700"
              >
                Remove friend
              </button>
              <button
                className="border-2 border-emerald-700 bg-emerald-700 text-white px-2 hover:bg-transparent hover:text-emerald-700"
                onClick={() => setShowRemoveFriend(false)}
              >
                Cancel
              </button>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}
