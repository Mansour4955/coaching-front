import React from "react";
import { Link } from "react-router-dom";
const CoachSingleCard = ({
  id,
  name,
  city,
  method,
  profession,
  course,
  diplomas,
  price,
  imageUrl,
}) => {
  return (
   <Link to={`${id}`}>
    <div  className=" duration-300 h-fit hover:shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px] cursor-pointer bg-white min-w-[266px] max-md:min-w-[216px] flex flex-col p-2 gap-2 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-lg col-span-1">
      <div
        className={`relative bg-cover bg-center w-full h-[300px] rounded-lg`}
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        <div className="absolute left-2 text-white bottom-1">
          <p className="font-bold text-lg">{name}</p>
          <p className="font-semibold">
            {city} <span className="text-sm">({method})</span>
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-right text-main_color pr-2 font-medium">
          {profession}
        </span>
        <p className="text-gray-600 text-sm overflow-hidden line-clamp-2">
          <span className="text-black font-semibold text-base">{course}</span> -{" "}
          {diplomas}
        </p>
        <span className="font-semibold text-gray-500">{price}MAD/h</span>
      </div>
    </div>
   </Link>
  );
};

export default CoachSingleCard;
