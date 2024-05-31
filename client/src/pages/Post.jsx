import React, { useEffect, useState } from "react";
import {
  FaCaretRight,
  FaComment,
  FaHeart,
  FaPlus,
  FaShareAlt,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CommentSection from "../components/CommentSection";

export default function Post() {
  const { postId } = useParams();
  const [post, setPost] = useState({});
  const [postUser, setPostUser] = useState({});
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch(`/api/post/getpost/${postId}`);
      const data = await res.json();
      if (!res.ok) {
        return;
      }
      setPost(data);
    };
    fetchPost();
  }, [postId]);

  useEffect(() => {
    if (post.userId) {
      const fetchPostUser = async () => {
        try {
          const res = await fetch(`/api/user/getuser/${post.userId}`);
          if (!res.ok) {
            throw new Error("Failed to fetch user");
          }
          const data = await res.json();
          setPostUser(data);
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      };
      fetchPostUser();
    }
  }, [post.userId]);

  const handleLikePost = async (id) => {
    try {
      const res = await fetch(`/api/post/like/${id}/${currentUser._id}`, {
        method: "PUT",
      });
      if (res.ok) {
        const data = await res.json();
        setPost((prevPost) => ({
          ...prevPost,
          likes: data.likes,
          numberOfLikes: data.likes.length,
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className=" md:h-screen-60px overflow-y-auto">
        <div className="w-2/3 mx-auto mt-5">
          <div className="post's user">
            <div className="user flex items-center">
              <img
                src={postUser.avatar}
                className="w-6 h-6 rounded-full bg-gray-300"
                alt=""
              />
              <span>
                <FaCaretRight />
              </span>
              <p className="font-bold"> {postUser.name} </p>
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
                        onClick={() => handleShowMoreImages(post.images)}
                        className="absolute top-0 right-0 w-1/4 h-full flex items-center justify-center font-bold text-3xl md:text-5xl bg-gray-300 bg-opacity-70 text-emerald-700 cursor-pointer rounded"
                      >
                        <FaPlus /> {post.images.length - 3}
                      </div>
                    )}
                  </React.Fragment>
                ))}
            </div>
            <div className="post services flex justify-between mb-3 border-2 rounded">
              <div
                className="w-full py-3 hover:bg-gray-300 hover:cursor-pointer rounded flex gap-2 items-center px-3"
                onClick={() => {
                  handleLikePost(post._id);
                }}
              >
                <FaHeart
                  className={`${
                    currentUser._id &&
                    post.likes &&
                    post.likes.includes(currentUser._id) &&
                    "text-red-500"
                  }`}
                />

                <span>{post.numberOfLikes}</span>
              </div>
              <div className="w-full py-3 hover:bg-gray-300 hover:cursor-pointer rounded flex gap-2 items-center px-3">
                <FaComment />
              </div>
              <div className="w-full py-3 hover:bg-gray-300 hover:cursor-pointer rounded flex gap-2 items-center px-3">
                <FaShareAlt />
              </div>
            </div>
            <div className="write comment">
              <CommentSection postId={postId} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
