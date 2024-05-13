import { FaPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Modal } from "flowbite-react";
import { useState } from "react";
import { RiImageAddFill } from "react-icons/ri";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

export default function Home() {
  const { currentUser } = useSelector((state) => state.user);
  const [showCreatePost, setShowCreatePost] = useState(false);

  const [imagesUploadError, setImagesUploadError] = useState(null);
  const [imagesUploadProgress, setImagesUploadProgress] = useState(null);
  const [formData, setFormData] = useState({});

  const handleShowCreatePost = () => {
    setShowCreatePost(true);
  };

  const handleUploadImages = async () => {
    try {
      if (!file) {
        setImagesUploadError("Please select images to upload");
        return;
      }
      setImagesUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImagesUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImagesUploadError("Failed to upload images");
          setImagesUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImagesUploadProgress(null);
            setImagesUploadError(null);
            setFormData({ ...formData, images: downloadURL });
          });
        }
      );
    } catch (error) {
      setImagesUploadError("Failed to upload images");
      setImagesUploadProgress(null);
      console.log(error);
    }
  };

  return (
    <>
      <div className="container mx-auto px-4">
        <div className="md:flex justify-between">
          <div className="bg-gray-300 px-2 md:w-1/3 pt-5 md:h-screen">
            <div>
              <p className="text-center">
                <span className="font-bold">{currentUser.name}</span> How are
                you feel today?
              </p>
              <div className="mt-5 flex justify-center">
                <button
                  onClick={handleShowCreatePost}
                  type="button"
                  className="border-2 border-emerald-700 bg-emerald-700 text-white hover:bg-transparent hover:text-emerald-700 p-3"
                >
                  <span className="flex items-center gap-3">
                    <FaPlus /> Create new post
                  </span>
                </button>
              </div>
            </div>
            <Modal
              show={showCreatePost}
              onClose={() => setShowCreatePost(false)}
              popup
              size="md"
            >
              <Modal.Header>
                <h2 className="text-2xl text-center mx-auto font-bold text-emerald-700">
                  Create new post
                </h2>
              </Modal.Header>

              <Modal.Body>
                <div className="">
                  <div className="">
                    <div className="">
                      <label
                        htmlFor="add-images"
                        className="flex gap-3 items-center border-2 px-2 text-white bg-emerald-700 border-emerald-700 hover:bg-transparent hover:text-emerald-700 hover:cursor-pointer"
                      >
                        <RiImageAddFill />
                        Add images
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        id="add-images"
                        multiple
                        hidden
                      />
                      <div className="show selected images name"></div>
                      <div className="show selected images"></div>
                      <textarea
                        className="mt-3 rounded w-full focus:border-emerald-700 text-emerald-700"
                        name=""
                        id=""
                        placeholder="Write something here..."
                      />
                      <div className="images chooces"></div>
                    </div>
                  </div>
                </div>
              </Modal.Body>
            </Modal>
          </div>
          <div className="md:border-x-2 md:w-2/3 px-2 pt-5"></div>
        </div>
      </div>
    </>
  );
}
