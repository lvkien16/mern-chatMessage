import React from "react";

export default function Notifications() {
  return (
    <>
      <div className="container mx-auto px-4">
        <div className="md:flex justify-center">
          <div className={`bg-gray-300 px-2 md:w-1/3 h-screen-60px`}>
            <div className="title py-3 border-b">
              <h3 className="text-xl font-semibold h-12 flex items-center justify-center">
                Unread
              </h3>
            </div>
            <div className="pt-3  overflow-y-auto">
              <h3 className="text-center font-semibold mt-5">
                No notifications
              </h3>
            </div>
          </div>
          <div className="md:w-2/3 h-screen-60px px-2 border-x">
            <div className="title py-3 border-b">
              <h3 className="text-xl font-semibold h-12 flex items-center justify-center">
                All
              </h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
