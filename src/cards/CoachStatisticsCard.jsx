import React, { useState } from "react";

const CoachStatisticsCard = ({
  full_name,
  email,
  company,
  description,
  followers,
  following,
  profilePhoto,
  id,
}) => {
  const [showMore, setShowMore] = useState(false);

  const hide = "overflow-hidden line-clamp-3";
  return (
    <div className="bg-white flex flex-col items-center gap-2 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-lg">
      <img
        className=" w-[80px] h-[80px] rounded-full mt-5"
        alt={profilePhoto}
        src={profilePhoto}
      />
      <p className="font-bold text-lg">{full_name}</p>
      <span className="text-gray-500 text-sm">{email}</span>
      <span className="-mt-2 font-medium">{company}</span>
      <div className="px-2">
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
      <div className="flex border-t border-t-gray-300 w-full justify-center py-2 items-center gap-3">
        <p className="text-gray-500">
          <span className="font-semibold text-sm text-black">{followers}</span>{" "}
          followers
        </p>
        <span className="h-[20px] w-[2px] bg-gray-300"></span>
        <p className="text-gray-500">
          <span className="font-semibold text-sm text-black">{following}</span>{" "}
          following
        </p>
      </div>
    </div>
  );
};

export default CoachStatisticsCard;
