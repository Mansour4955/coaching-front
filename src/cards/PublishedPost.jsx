import React, { useState } from "react";
import { PiDotsThreeCircle } from "react-icons/pi";
const PublishedPost = ({
  full_name,
  postPhoto,
  date_of_publish,
  description,
  profilePhoto,
  id,
}) => {
  const [showMore, setShowMore] = useState(false);

  const hide = "overflow-hidden line-clamp-2";
  return (
    <div className="bg-white flex flex-col p-4 gap-2 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-lg">
      <div className="flex justify-between">
      <div className="flex gap-3">
        <img
          className="w-[50px] h-[50px] rounded-full"
          alt={profilePhoto}
          src={profilePhoto}
        />
        <div className="flex flex-col">
          <p className="text-sm">
            <span className="font-semibold text-base">{full_name}</span> published <span className="font-semibold text-base text-main_color">a photo</span>
          </p>
          <span className="text-gray-500 text-sm">{date_of_publish}</span>
        </div>
      </div>
      <span className="font-bold text-gray-500 cursor-pointer"><PiDotsThreeCircle size={20}/></span>
      </div>
      <div>
        <p className={`text-gray-500  ${!showMore ? hide : ""}`}>
          {description}
        </p>
        <button
          onClick={() => setShowMore(!showMore)}
          className="text-main_color text-sm"
        >
          {showMore ? "See less" : "See more"}
        </button>
      </div>
      <img alt="post" src={postPhoto} className="w-full h-[300px]" />
    </div>
  );
};

export default PublishedPost;
