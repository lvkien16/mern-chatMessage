import { useSelector } from "react-redux";
import { Dropdown, Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { FaComment } from "react-icons/fa";
import { FaShareAlt } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import OtherProfile from "./OtherProfile";
import { FaCaretRight } from "react-icons/fa";
// import { avatar } from "../../public/images/avatar.png";
import { BsThreeDotsVertical } from "react-icons/bs";

export default function Profile() {
  const location = useLocation();
  const [user, setUser] = useState("");
  const [showAvatar, setShowAvatar] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [otherUser, setOtherUser] = useState(null);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const user = searchParams.get("user");
    if (user) {
      setUser(user);
      const fetchPost = async () => {
        const res = await fetch(`/api/user/getuser/${user}`);
        const data = await res.json();
        if (!res.ok) {
          return;
        } else {
          if (currentUser._id !== user) {
            setOtherUser(data);
          } else {
            setOtherUser(null);
          }
        }
      };
      fetchPost();
    }
  }, [location.search]);
  const handleShowAvatar = async () => {
    setShowAvatar(true);
  };
  const handleShowEditProfile = async () => {
    setShowEditProfile(true);
  };
  return (
    <>
      {currentUser._id === user && !otherUser && (
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
              <div className="flex justify-center mb-5">
                <button className="border-2 border-emerald-700 bg-emerald-700 text-white px-2 mb-3 hover:bg-transparent hover:text-emerald-700">
                  Edit your profile
                </button>
              </div>
              <hr className="hidden md:block border-emerald-700" />
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
                  <div className="about post">
                    <Dropdown
                      arrowIcon={false}
                      inline
                      label={<BsThreeDotsVertical />}
                    >
                      <Dropdown.Item>
                        <button>Edit</button>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <button>Delete</button>
                      </Dropdown.Item>
                    </Dropdown>
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
            show={showEditProfile}
            onClose={() => setShowEditProfile(false)}
            popup
            size="md"
          >
            <Modal.Header />
            <Modal.Body>
              <p>Edit profile</p>
            </Modal.Body>
          </Modal>
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
      )}
      {currentUser._id !== user && !otherUser && (
        <h2 className="text-3xl text-center mt-5 text-emerald-700">
          User not found
        </h2>
      )}
      {currentUser.id !== user && otherUser && (
        <OtherProfile
          currentUser={currentUser}
          otherUser={otherUser}
          showAvatar={showAvatar}
          setShowAvatar={setShowAvatar}
          handleShowAvatar={handleShowAvatar}
        />
      )}
    </>
  );
}
