import React from "react";

export default function CreatePost() {
  const handleUploadImages = async () => {
    try {
      if (!files || files.length === 0) {
        setImagesUploadError("Please select images to upload");
        return;
      }
      setImagesUploadError(null);

      const storage = getStorage(app);
      const uploadPromises = Array.from(files).map((fileItem) => {
        const fileName = new Date().getTime() + "-" + fileItem.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, fileItem);

        return new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setImagesUploadProgress((prevProgress) => ({
                ...prevProgress,
                [fileItem.name]: progress.toFixed(0),
              }));
            },
            (error) => {
              setImagesUploadError(`Failed to upload image: ${fileItem.name}`);
              setImagesUploadProgress(null);
              reject(error);
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                setImagesUploadProgress(null);
                resolve({ fileName: fileItem.name, url: downloadURL });
              });
            }
          );
        });
      });

      const downloadURLs = await Promise.all(uploadPromises);
      const images = downloadURLs.map((item) => item.url);
      setFormData((prevFormData) => ({
        ...prevFormData,
        images,
      }));
      setImagesUploadError(null);
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
        navigate(`/profile?user=${currentUser._id}&post=${data._id}`);
      }
    } catch (error) {}
  };
  return (
    <Modal
      show={showCreatePost}
      onClose={() => setShowCreatePost(false)}
      popup
      size="md"
    >
      <Modal.Header>
        <span className="text-2xl text-center mx-auto font-bold text-emerald-700">
          Create new post
        </span>
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
                    disabled={Object.values(imagesUploadProgress || {}).some(
                      (progress) => progress !== null
                    )}
                    className="flex items-center gap-2 text-emerald-700 border-2 border-emerald-700 px-2 hover:bg-emerald-700 hover:text-white rounded"
                  >
                    {imagesUploadProgress ? (
                      <span>Uploading...</span>
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
                  name="images"
                  multiple
                  hidden
                  onChange={(e) => setFiles(e.target.files)}
                />
                <div className="mt-3">
                  {imagesUploadError && (
                    <Alert color="failure">{imagesUploadError}</Alert>
                  )}
                  {formData.images && (
                    <div className="mt-3 flex">
                      {console.log(formData.images)}
                    </div>
                  )}
                </div>
                <div className="show selected images name"></div>
                <div className="show selected images">
                  {
                    <div className="flex gap-3 flex-wrap">
                      {formData.images &&
                        formData.images.map((image, index) => (
                          <div key={index}>
                            <img
                              src={image}
                              alt=""
                              className="w-14 h-14 object-cover rounded border-2 border-gray-200"
                            />
                          </div>
                        ))}
                    </div>
                  }
                </div>
                <textarea
                  className="mt-3 rounded w-full focus:border-emerald-700 text-emerald-700"
                  name="content"
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
  );
}
