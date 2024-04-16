import React from "react";
import { MdDelete,MdModeEdit,MdOutlineReply   } from "react-icons/md";

const CommentCard = ({
  commentId,
  name,
  comment,
  commentDate,
  imageProfile,
  imageStyle,
  nameStyle,
  descAndDateStyle,
  iconsSize
}) => {
  return (
    <div className="bg-white p-2 flex-col flex">
      <div className="flex gap-2 ">
        <img
          alt={name}
          src={imageProfile}
          className={`${imageStyle} rounded-full`}
        />
        <div className="flex flex-col ">
          <h4 className={`${nameStyle} font-semibold`}>{name}</h4>
          <span className={`${descAndDateStyle} text-gray-500`}>{commentDate}</span>
        </div>
      </div>
      <p className={`${descAndDateStyle} text-gray-700 `}>{comment}</p>
      <div className="flex items-center gap-2 mt-1">
        <p className="text-red-600 cursor-pointer"><MdDelete size={`${iconsSize}`}/></p>
        <p className="text-green-600 cursor-pointer"><MdModeEdit size={`${iconsSize}`}/></p>
        <p className="text-blue-600 cursor-pointer"><MdOutlineReply size={`${iconsSize}`}/></p>
      </div>
    </div>
  );
};

export default CommentCard;