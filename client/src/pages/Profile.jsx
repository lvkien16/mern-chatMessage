import { useSelector } from "react-redux";
import { Modal, Dropdown } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import OtherProfile from "./OtherProfile";
import {
  FaCaretRight,
  FaHeart,
  FaComment,
  FaShareAlt,
  FaPlus,
} from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoClose } from "react-icons/io5";

export default function Profile() {
  const location = useLocation();
  const { userId } = useParams();
  const [postId, setPostId] = useState("");
  const [showAvatar, setShowAvatar] = useState(false);
  const [otherUser, setOtherUser] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const [posts, setPosts] = useState([]);
  const [showPostImage, setShowPostImage] = useState(false);
  const [currentImageFocus, setCurrentImageFocus] = useState({});
  const [showMoreImages, setShowMoreImages] = useState(false);
  const [imagesForModal, setImagesForModal] = useState([]);
  const [showEditPost, setShowEditPost] = useState(false);
  const [showDeletePost, setShowDeletePost] = useState(false);
  const [dataToEdit, setDataToEdit] = useState({});
  const [postIdToDelete, setPostIdToDelete] = useState("");
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();

  const refreshFriendRequests = () => {
    setRefresh((prevRefresh) => !prevRefresh);
  };

  useEffect(() => {
    if (userId && currentUser._id) {
      const fetchUser = async () => {
        const res = await fetch(`/api/user/getuser/${userId}`);
        const data = await res.json();
        if (res.ok) {
          if (currentUser._id !== userId) {
            setOtherUser(data);
          } else {
            setOtherUser(null);
          }
        }
      };
      fetchUser();
    }
  }, [userId, currentUser._id]);

  useEffect(() => {
    if (userId) {
      const fetchPosts = async () => {
        const res = await fetch(`/api/post/getposts/${userId}`);
        const data = await res.json();
        if (res.ok) {
          setPosts(data);
        }
      };

      fetchPosts();
    }
  }, [userId, refresh]);

  const handleShowAvatar = () => {
    setShowAvatar(true);
  };

  const handleShowPostImage = () => {
    setShowPostImage(true);
  };

  const handleShowMoreImages = (images) => {
    setImagesForModal(images);
    setShowMoreImages(true);
  };

  const handleViewPostDetail = (postId) => {
    navigate(`/post/${postId}`);
  };

  const handleShowEditPost = () => {
    setShowEditPost(true);
  };

  const handleShowDeletePost = () => {
    setShowDeletePost(true);
  };

  const handleLikePost = async (id) => {
    try {
      const res = await fetch(`/api/post/like/${id}/${currentUser._id}`, {
        method: "PUT",
      });
      if (res.ok) {
        const data = await res.json();
        setPosts(
          posts.map((post) =>
            post.id === id
              ? {
                  ...post,
                  likes: data.likes,
                  numberOfLikes: data.numberOfLikes.length,
                }
              : post
          )
        );
      }
      refreshFriendRequests();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitDeletePost = async (id) => {
    try {
      const res = await fetch(`/api/post/delete/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setShowDeletePost(false);
        setPosts(posts.filter((post) => post._id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitEditPost = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/post/edit/${dataToEdit._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToEdit),
      });
      if (res.ok) {
        const data = await res.json();
        setPosts(
          posts.map((post) =>
            post._id === data._id
              ? {
                  ...post,
                  content: data.content,
                  images: data.images,
                }
              : post
          )
        );
        setShowEditPost(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {currentUser._id === userId && !otherUser && (
        <div className="container mx-auto px-4">
          <div className="md:flex justify-between">
            <div className="bg-gray-300 px-2 md:w-1/3 pt-5">
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
              <div className="flex justify-center mb-5">
                <button className="border-2 border-emerald-700 bg-emerald-700 text-white px-2 mb-3 hover:bg-transparent hover:text-emerald-700">
                  Edit your profile
                </button>
              </div>
              <hr className="hidden md:block border-emerald-700" />
            </div>
            <div className="md:border-x-2 md:w-2/3 px-2 pt-5">
              {/* Post list */}
              <div className="">
                {posts &&
                  !postId &&
                  posts.map((post) => (
                    <div key={post._id}>
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
                        <div className="about post">
                          <Dropdown
                            arrowIcon={false}
                            inline
                            label={<BsThreeDotsVertical />}
                          >
                            <Dropdown.Item
                              onClick={() => {
                                handleViewPostDetail(post._id);
                              }}
                            >
                              <span>View detail</span>
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() => {
                                handleShowEditPost();
                                setDataToEdit(post);
                              }}
                            >
                              <span>Edit</span>
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() => {
                                handleShowDeletePost();
                                setPostIdToDelete(post._id);
                              }}
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
                                    onClick={() =>
                                      handleShowMoreImages(post.images)
                                    }
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
                            onClick={() => handleLikePost(post._id)}
                          >
                            <FaHeart
                              className={`${
                                post.likes.includes(currentUser._id)
                                  ? "text-red-500"
                                  : ""
                              }`}
                            />
                            <span>{post.numberOfLikes}</span>
                          </div>
                          <div
                            onClick={() => {
                              handleViewPostDetail(post._id);
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
                  ))}
              </div>
            </div>
          </div>
          {/* show post's image */}
          <Modal
            show={showPostImage}
            onClose={() => setShowPostImage(false)}
            popup
            size="xl"
          >
            <Modal.Header />
            <Modal.Body>
              <img
                src={currentImageFocus}
                alt="Post image"
                className="w-full"
              />
            </Modal.Body>
          </Modal>

          {/* show avatar */}
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

          {/* show edit post */}
          <Modal
            show={showEditPost}
            onClose={() => setShowEditPost(false)}
            popup
            size="xl"
          >
            <Modal.Header />
            <Modal.Body>
              <form onSubmit={handleSubmitEditPost}>
                <textarea
                  name="content"
                  className="w-full h-48 border-2 rounded p-2"
                  placeholder="What's on your mind?"
                  value={dataToEdit.content}
                  onChange={(e) =>
                    setDataToEdit({ ...dataToEdit, content: e.target.value })
                  }
                />
                <div className="flex gap-2 flex-wrap">
                  {dataToEdit.images &&
                    dataToEdit.images.map((image, index) => (
                      <div key={index} className="w-20 h-auto relative">
                        <img src={image} alt="" className="w-full h-full" />
                        <span className="absolute top-0 right-0 p-1 bg-gray-200">
                          <IoClose />
                        </span>
                      </div>
                    ))}
                </div>
                <button
                  type="submit"
                  className="w-full bg-emerald-700 text-white rounded py-2 mt-2"
                >
                  Edit
                </button>
              </form>
            </Modal.Body>
          </Modal>

          {/* show delete post */}
          <Modal
            show={showDeletePost}
            onClose={() => setShowDeletePost(false)}
            popup
            size="md"
          >
            <Modal.Header />
            <Modal.Body>
              <div className="text-center">
                <p>Are you sure you want to delete this post?</p>
                <button
                  type="button"
                  onClick={() => {
                    handleSubmitDeletePost(postIdToDelete);
                  }}
                  className="bg-red-500 text-white rounded py-1 px-3 mt-2"
                >
                  Yes
                </button>
                <button
                  onClick={() => setShowDeletePost(false)}
                  className="bg-gray-300 text-black rounded py-1 px-3 mt-2 ml-2"
                >
                  No
                </button>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      )}
      {otherUser && (
        <OtherProfile
          currentUser={currentUser}
          otherUser={otherUser}
          showAvatar={showAvatar}
          setShowAvatar={setShowAvatar}
          handleShowAvatar={handleShowAvatar}
          posts={posts}
          postId={postId}
          setCurrentImageFocus={setCurrentImageFocus}
          handleShowPostImage={handleShowPostImage}
          showPostImage={showPostImage}
          showMoreImages={showMoreImages}
          handleShowMoreImages={handleShowMoreImages}
          imagesForModal={imagesForModal}
          setImagesForModal={setImagesForModal}
          handleViewPostDetail={handleViewPostDetail}
          currentImageFocus={currentImageFocus}
          setShowPostImage={setShowPostImage}
          setShowMoreImages={setShowMoreImages}
          handleLikePost={handleLikePost}
          refreshFriendRequests={refreshFriendRequests}
        />
      )}
    </>
  );
}
