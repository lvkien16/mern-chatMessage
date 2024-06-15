import React from "react";
import { FaCaretRight, FaComment, FaHeart, FaShareAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Dropdown } from "flowbite-react";
import { BsThreeDotsVertical } from "react-icons/bs";

export default function PostForNewsFeed({ post }) {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="user flex items-center">
          <img
            src={post.userId.avatar}
            className="w-6 h-6 rounded-full bg-gray-300"
            alt=""
          />
          <span>
            <FaCaretRight />
          </span>
          <p className="font-bold"> {post.userId.name} </p>
        </div>
        <div className="about post flex gap-3 items-center">
          <p className="text-sm text-gray-500">
            {new Date(post.createdAt).toLocaleString()}
          </p>
          <Dropdown arrowIcon={false} inline label={<BsThreeDotsVertical />}>
            <Dropdown.Item
            //   onClick={() => {
            //     handleViewPostDetail(post._id);
            //   }}
            >
              <span>View detail</span>
            </Dropdown.Item>
            <Dropdown.Item
            //   onClick={() => {
            //     handleShowEditPost();
            //     setDataToEdit(post);
            //   }}
            >
              <span>Edit</span>
            </Dropdown.Item>
            <Dropdown.Item
            //   onClick={() => {
            //     handleShowDeletePost();
            //     setPostIdToDelete(post._id);
            //   }}
            >
              <span>Delete</span>
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
                    // onClick={() => handleShowMoreImages(post.images)}
                    className="absolute top-0 right-0 w-1/4 h-full flex items-center justify-center font-bold text-3xl md:text-5xl bg-gray-300 bg-opacity-70 text-emerald-700 cursor-pointer rounded"
                  >
                    <FaPlus /> {post.images.length - 3}
                  </div>
                )}
              </React.Fragment>
            ))}
        </div>
        <div className="post services flex justify-between mb-1 border-2 border-t-0 rounded">
          <div
            className="w-full py-3 hover:bg-gray-300 hover:cursor-pointer rounded flex gap-2 items-center px-3"
            // onClick={() => handleLikePost(post._id)}
          >
            <FaHeart
              className={`${
                post.likes.includes(currentUser._id) ? "text-red-500" : ""
              }`}
            />
            <span>{post.numberOfLikes}</span>
          </div>
          <div
            onClick={() => {
              //   handleViewPostDetail(post._id);
            }}
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
  );
}
