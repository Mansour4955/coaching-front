import axios from "axios";
import React, { useState } from "react";

const PostPopup = ({ setShowDeletePost, setShowEditPost, setPostPopup }) => {
  const handleCancelPostPopup = () => {
    setPostPopup(false);
  };

  return (
    <div className=" shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px]  rounded-lg w-[300px] relative">
      <div className=" rounded-lg p-2 flex items-center justify-center flex-col z-20 bg-white">
        <p className="font-semibold text-lg text-main_color">Warning</p>
        <div className="flex justify-center gap-5 mt-2">
          <p
            onClick={() => setShowDeletePost(true)}
            className="px-2 py-0.5 border border-main_color bg-main_color active:bg-main_color active:text-white hover:bg-white hover:text-main_color text-white duration-100 font-medium cursor-pointer rounded-lg"
          >
            Delete
          </p>
          <p
            onClick={() => setShowEditPost(true)}
            className="px-2 py-0.5 border border-green-600 bg-green-600 active:bg-green-600 active:text-white hover:bg-white hover:text-green-600 text-white duration-100 font-medium cursor-pointer rounded-lg"
          >
            Update
          </p>
          <p
            onClick={handleCancelPostPopup}
            className="px-2 py-0.5 border border-gray-600 bg-gray-600 active:bg-gray-600 active:text-white hover:bg-white hover:text-gray-600 text-white duration-100 font-medium cursor-pointer rounded-lg"
          >
            Cancel
          </p>
        </div>
      </div>
    </div>
  );
};

export default PostPopup;
