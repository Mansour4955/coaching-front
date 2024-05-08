import React, { useState } from "react";
import useGetImages from "../hooks/useGetImages";

const CoachStatisticsCard = ({
  full_name,
  email,
  course,
  description,
  followers,
  following,
  profilePhoto,
  id,
  role,
}) => {
  const [showMore, setShowMore] = useState(false);
  const imageOfUser = useGetImages(profilePhoto);
  const hide = "overflow-hidden line-clamp-3";
  return (
    <div className="bg-white flex flex-col items-center gap-2 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-lg">
      <img
        className=" w-[80px] h-[80px] rounded-full mt-5"
        alt={imageOfUser[profilePhoto]}
        src={imageOfUser[profilePhoto]}
      />
      <p className="font-bold text-lg">{full_name}</p>
      <span className="text-gray-500 text-sm pb-1">{email}</span>
      {role === "coach" && <span className="-mt-2 font-medium">{course}</span>}
      {role === "coach" && (
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
      )}
      {role === "coach" && (
        <div className="flex border-t border-t-gray-300 w-full justify-center py-2 items-center gap-3">
          <p className="text-gray-500">
            <span className="font-semibold text-sm text-black">
              {followers?.length > 0 ? followers : 0}
            </span>{" "}
            followers
          </p>
          <span className="h-[20px] w-[2px] bg-gray-300"></span>
          <p className="text-gray-500">
            <span className="font-semibold text-sm text-black">
              {following?.length > 0 ? following : 0}
            </span>{" "}
            following
          </p>
        </div>
      )}
    </div>
  );
};

export default CoachStatisticsCard;
