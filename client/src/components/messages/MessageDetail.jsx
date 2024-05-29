import React, { useEffect, useRef, useState } from "react";
import { IoMdSend } from "react-icons/io";

export default function MessageDetail() {
  const elementRef = useRef(null);
  const [elementWidth, setElementWidth] = useState(0);

  const updateWidth = () => {
    if (elementRef.current) {
      setElementWidth(elementRef.current.offsetWidth);
    }
  };

  useEffect(() => {
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  return (
    <>
      <div className="" ref={elementRef}>
        <div className="flex items-center gap-3 py-3 border-b">
          <img
            src="https://www.pngitem.com/pimgs/m/551-5510463_default-user-image-png-transparent-png.png"
            className="w-12 h-12 rounded-full border-2 border-emerald-700"
            alt=""
          />
          <span className="font-semibold">User name</span>
        </div>
        <div className="message-contents pb-10 max-h-screen-60px-72px overflow-y-auto">
          <div className="left-message-content my-3">
            <div className="message-box bg-gray-300 p-3 rounded-lg w-2/3 mb-3">
              <p className="text-sm">Message content</p>
            </div>
          </div>
          <div className="right-message-content">
            <div className="message-box ms-auto bg-emerald-700 p-3 rounded-lg w-2/3 mb-3">
              <p className="text-sm text-white">Message content</p>
            </div>
          </div>
          <div className="right-message-content">
            <div className="message-box ms-auto bg-emerald-700 p-3 rounded-lg w-2/3 mb-3">
              <p className="text-sm text-white">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure
                harum magni consectetur laudantium quo assumenda aperiam
                voluptatem quam tenetur nesciunt, minus magnam, debitis
                excepturi accusantium perferendis commodi distinctio numquam
                dignissimos.
              </p>
            </div>
          </div>
          <div className="left-message-content mt-5">
            <div className="message-box bg-gray-300 p-3 rounded-lg w-2/3 mb-3">
              <p className="text-sm">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eum
                tempora similique accusamus praesentium aliquid, ex at sit
                blanditiis eveniet, nemo doloremque architecto alias, officia
                facilis suscipit corporis reprehenderit molestiae ratione?
              </p>
            </div>
          </div>
          <div className="left-message-content mt-5">
            <div className="message-box bg-gray-300 p-3 rounded-lg w-2/3 mb-3">
              <p className="text-sm">Message content</p>
            </div>
          </div>
          <div className="right-message-content">
            <div className="message-box ms-auto bg-emerald-700 p-3 rounded-lg w-2/3 mb-3">
              <p className="text-sm text-white">Message content</p>
            </div>
          </div>
          <div className="right-message-content">
            <div className="message-box ms-auto bg-emerald-700 p-3 rounded-lg w-2/3 mb-3">
              <p className="text-sm text-white">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure
                harum magni consectetur laudantium quo assumenda aperiam
                voluptatem quam tenetur nesciunt, minus magnam, debitis
                excepturi accusantium perferendis commodi distinctio numquam
                dignissimos.
              </p>
            </div>
          </div>
          <div className="left-message-content my-3">
            <div className="message-box bg-gray-300 p-3 rounded-lg w-2/3 mb-3">
              <p className="text-sm">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eum
                tempora similique accusamus praesentium aliquid, ex at sit
                blanditiis eveniet, nemo doloremque architecto alias, officia
                facilis suscipit corporis reprehenderit molestiae ratione?
              </p>
            </div>
          </div>
          <div
            className="fixed bottom-0 bg-gray-300 rounded-l-full rounded-r-md"
            style={{ width: elementWidth }}
          >
            <form className="flex gap-3">
              <textarea
                rows={1}
                type="text"
                name="message-content"
                className="border border-gray-300 p-2 rounded-full w-full resize-none"
                placeholder="Type a message"
                required
              />
              <button className="bg-emerald-700 text-white px-5 rounded-md hover:bg-white hover:text-emerald-700 border-2 border-emerald-700">
                <IoMdSend />
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
