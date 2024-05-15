import { FaPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Modal, Alert } from "flowbite-react";
import { CircularProgressbar } from "react-circular-progressbar";
import { useState } from "react";
import { RiImageAddFill } from "react-icons/ri";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { FaFileUpload } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { currentUser } = useSelector((state) => state.user);
  const [showCreatePost, setShowCreatePost] = useState(false);

  const [file, setFile] = useState(null);
  const [imagesUploadError, setImagesUploadError] = useState(null);
  const [imagesUploadProgress, setImagesUploadProgress] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);

  const navigate = useNavigate();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/post/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }
      if (res.ok) {
        setPublishError(null);
        navigate("/");
      }
    } catch (error) {}
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
                      <form onSubmit={handleSubmit}>
                        <div className="flex justify-between">
                          <label
                            htmlFor="add-images"
                            className="rounded flex gap-3 items-center border-2 px-2 text-white bg-emerald-700 border-emerald-700 hover:bg-transparent hover:text-emerald-700 hover:cursor-pointer"
                          >
                            <RiImageAddFill />
                            Add images
                          </label>
                          <button
                            type="button"
                            onClick={handleUploadImages}
                            disabled={imagesUploadProgress}
                            className="flex items-center gap-2 text-emerald-700 border-2 border-emerald-700 px-2 hover:bg-emerald-700 hover:text-white rounded"
                          >
                            {imagesUploadProgress ? (
                              <CircularProgressbar
                                value={imagesUploadProgress}
                                text={`${imagesUploadProgress || 0}%`}
                              />
                            ) : (
                              <>
                                <FaFileUpload />
                                Upload
                              </>
                            )}
                          </button>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          id="add-images"
                          multiple
                          hidden
                          onChange={(e) => setFile(e.target.files[0])}
                        />
                        <div className="mt-3">
                          {imagesUploadError && (
                            <Alert color="failure">{imagesUploadError}</Alert>
                          )}
                          {formData.images && (
                            <div className="mt-3">
                              <img
                                src={formData.images}
                                alt=""
                                className="w-full object-cover rounded"
                              />
                            </div>
                          )}
                        </div>
                        <div className="show selected images name"></div>
                        <div className="show selected images"></div>
                        <textarea
                          className="mt-3 rounded w-full focus:border-emerald-700 text-emerald-700"
                          name=""
                          id=""
                          placeholder="Write something here..."
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              content: e.target.value,
                            })
                          }
                        />
                        <div className="images chooces"></div>
                        <div className="">
                          <button
                            type="submit"
                            className="border-2 px-2 bg-emerald-700 text-white hover:bg-transparent hover:text-emerald-700 rounded border-emerald-700 mt-3 w-full"
                          >
                            Publish
                          </button>
                        </div>
                      </form>
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
