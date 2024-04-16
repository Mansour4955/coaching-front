import React, { useState } from "react";
import { IoIosSend } from "react-icons/io";
import { MdDelete, MdModeEdit, MdOutlineReply } from "react-icons/md";

const CommentCard = ({
  commentId,
  name,
  comment,
  commentDate,
  imageProfile,
  imageStyle,
  nameStyle,
  descAndDateStyle,
  iconsSize,
  parentDevStyle
}) => {
  const [reply, setReply] = useState(false);
  const [edit, setEdit] = useState(false);

  const [writeComment, setWriteComment] = useState("");
  const [editComment, setEditComment] = useState(comment);

  const handleSendComment = () => {
    console.log(writeComment, commentId);
    setReply(false);
  };
  const handleEditComment = () => {
    console.log(editComment, commentId);
    setEdit(false);
  };
  return (
    <div className={`${parentDevStyle} bg-gray-100 rounded-lg mb-2 p-2 flex-col flex`}>
      <div className="flex gap-2 ">
        <img
          alt={name}
          src={imageProfile}
          className={`${imageStyle} rounded-full`}
        />
        <div className="flex flex-col ">
          <h4 className={`${nameStyle} font-semibold`}>{name}</h4>
          <span className={`${descAndDateStyle} text-gray-500`}>
            {commentDate}
          </span>
        </div>
      </div>
      <p className={`${descAndDateStyle} text-gray-700 `}>{comment}</p>
      <div className="flex items-center gap-2 mt-1">
        <p className="text-red-600 cursor-pointer">
          <MdDelete size={`${iconsSize}`} />
        </p>
        <p
          onClick={() => setEdit(!edit)}
          className="text-green-600 cursor-pointer"
        >
          <MdModeEdit size={`${iconsSize}`} />
        </p>
        <p
          onClick={() => setReply(!reply)}
          className="text-blue-600 cursor-pointer"
        >
          <MdOutlineReply size={`${iconsSize}`} />
        </p>
      </div>
      {reply && (
        <div className="flex mt-2">
           <img alt="" src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg" className="border-2 border-white rounded-full w-[32px] h-[32px] mr-2"/>
          <input
            type="text"
            className="caret-main_color flex-1 border text-gray-500 font-medium  border-r-0 border-main_color rounded-l-xl px-2 outline-none py-1"
            placeholder="Write a comment"
            value={writeComment}
            onChange={(e) => setWriteComment(e.target.value)}
          />
          <div
            onClick={handleSendComment}
            className="bg-white flex items-center justify-center rounded-r-xl border border-main_color border-l-0 px-2 py-1 text-main_color font-bold cursor-pointer hover:bg-white_color duration-300"
          >
            <IoIosSend size={20} />
          </div>
        </div>
      )}
      {edit && (
        <div className="flex mt-2">
           <img alt="" src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg" className="border-2 border-white rounded-full w-[32px] h-[32px] mr-2"/>
          <input
            type="text"
            className="caret-main_color flex-1 border text-gray-500 font-medium  border-r-0 border-main_color rounded-l-xl px-2 outline-none py-1"
            placeholder="Write a comment"
            value={editComment}
            onChange={(e) => setEditComment(e.target.value)}
          />
          <div
            onClick={handleEditComment}
            className="bg-white flex items-center justify-center rounded-r-xl border border-main_color border-l-0 px-2 py-1 text-main_color font-bold cursor-pointer hover:bg-white_color duration-300"
          >
            <IoIosSend size={20} />
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentCard;
