import { Modal } from "flowbite-react";
import React, { useEffect, useState } from "react";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase";
import {
  updateStart,
  updateSuccess,
  updateFailure,
} from "../../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ShowAvatar({
  avatar,
  showAvatar,
  setShowAvatar,
  refreshPage,
}) {
  const [formData, setFormData] = useState({});
  const [file, setFile] = useState(null);
  const dishpatch = useDispatch();

  const handleChangeAvatar = async (file) => {
    if (!file) {
      console.log("Please select an image");
      return;
    }

    try {
      const storage = getStorage(app);
      const fileName = `${Date.now()}-${file.name}`;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          console.error("Image upload failed:", error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setFormData({ ...formData, image: downloadURL });
          });
        }
      );
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleSave = async () => {
    try {
      dishpatch(updateStart());
      const response = await fetch("/api/user/change-avatar", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ avatar: formData.image }),
      });
      const data = await response.json();
      if (!response.ok) {
        dishpatch(updateFailure(data));
        return;
      }
      setShowAvatar(false);
      setFormData({});
      refreshPage();
      dishpatch(updateSuccess(data));
      toast.success("Avatar updated successfully");
    } catch (error) {
      console.error("Error saving avatar:", error);
      dishpatch(updateFailure("Error saving avatar"));
    }
  };

  return (
    <Modal
      show={showAvatar}
      onClose={() => {
        setShowAvatar(false);
        setFormData({});
      }}
      popup
    >
      <Modal.Header />
      <Modal.Body>
        <div className="mb-3 flex justify-center w-full">
          <label
            htmlFor="change-avatar"
            className="border-2 border-emerald-700 bg-emerald-700 text-white hover:bg-transparent hover:text-emerald-700 px-2 rounded hover:cursor-pointer"
          >
            Change avatar
          </label>
          <input
            type="file"
            id="change-avatar"
            name="avatar"
            hidden
            accept="image/*"
            onChange={(e) => {
              const selectedFile = e.target.files[0];
              setFile(selectedFile);
              handleChangeAvatar(selectedFile);
            }}
          />
        </div>
        {formData.image ? (
          <>
            <img src={formData.image} alt="Avatar" className="w-full" />
            <button
              type="button"
              onClick={handleSave}
              className="border-2 border-emerald-700 w-full mt-3 bg-emerald-700 text-white hover:bg-transparent hover:text-emerald-700 rounded"
            >
              Save
            </button>
          </>
        ) : (
          <img src={avatar} alt="Avatar" className="w-full" />
        )}
      </Modal.Body>
    </Modal>
  );
}
