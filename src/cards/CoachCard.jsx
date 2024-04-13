import React, { useState } from "react";

const CoachCard = ({ full_name, description, profilePhoto, domaine, id }) => {
  const [showMore, setShowMore] = useState(false);

  const hide = "overflow-hidden line-clamp-2";
  return (
    <div className="bg-white flex p-2 gap-2 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-lg">
      <img
        className="w-[50px] h-[50px] rounded-full"
        alt={profilePhoto}
        src={profilePhoto}
      />
      <div className="px-2">
        <p className="font-bold text-base">{full_name}</p>
        <p className="font-semibold text-sm">{domaine}</p>
        <div>
          <p className={`text-gray-500  ${!showMore ? hide : ""}`}>
            {description}
          </p>
         <div className="flex items-center justify-between mt-1">
         <button
            onClick={() => setShowMore(!showMore)}
            className="text-main_color text-sm"
          >
            {showMore ? "See less" : "See more"}
          </button>
          <button className="flex items-center justify-center px-2 border border-main_color rounded-xl font-semibold text-main_color duration-300 hover:bg-main_color hover:text-white"><span className="text-xl">+</span> Follow</button>
         </div>
        </div>
        
      </div>
    </div>
  );
};

export default CoachCard;
