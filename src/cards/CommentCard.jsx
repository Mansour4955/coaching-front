import React, { useEffect, useState } from "react";
import { IoIosSend } from "react-icons/io";
import { MdDelete, MdModeEdit, MdOutlineReply } from "react-icons/md";
import DeleteComment from "../popups/DeleteComment";
import moment from "moment";
import axios from "axios";
import { URL } from "../data";
import { useLocalStorage } from "../hooks/useLocalStorege";
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
  parentDevStyle,
  level,
  parentCommentId,
  user,
}) => {
  const [theUser, setTheUser] = useState(user);
  useEffect(() => {
    console.log("theUser._id ", theUser._id);
    console.log("theDataOfUser._id ", theDataOfUser._id);
    console.log("user ", user._id);
  }, []);
  useEffect(() => {
    axios
      .get(`${URL}/api/users/${user._id}`)
      .then((response) => {
        setTheUser(response.data);
      })
      .catch((error) => {
        console.log("error getting users data ", error);
      });
  }, []);

  const { getItem } = useLocalStorage("Authorization");
  const { getItem: theUserData } = useLocalStorage("userData");
  const theDataOfUser = theUserData();
  const [reply, setReply] = useState(false);
  const [edit, setEdit] = useState(false);
  const [showDeleteCommentPopup, setShowDeleteCommentPopup] = useState(false);

  const [writeComment, setWriteComment] = useState("");
  const [editComment, setEditComment] = useState(comment);
  const handleSendReply = () => {
    const token = getItem();
    axios
      .post(
        `${URL}/api/comments/${parentCommentId}?level=${level}&levelId=${commentId}`,
        {
          comment: writeComment,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((response) => {
        // console.log(response.data);
        // console.log(parentCommentId);
        // console.log(level);
        // console.log(commentId);
        console.log("theUser._id ", theUser._id);
        console.log("theDataOfUser._id ", theDataOfUser._id);
        console.log("user ", user._id);
      })
      .catch((error) => {
        console.log("error posting nested comment ", error.response);
      });
    // console.log(writeComment, commentId);
    setReply(false);
    setWriteComment("");
  };
  const handleEditComment = () => {
    const token = getItem();
    axios
      .put(
        `${URL}/api/comments/${parentCommentId}?level=${level}&levelId=${commentId}`,
        {
          comment: editComment,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((response) => {})
      .catch((error) => {
        console.log("error edit comment ", error.response);
      });
    setEdit(false);
  };
  return (
    <div
      className={`${parentDevStyle} bg-gray-100 rounded-lg mb-2 p-2 flex-col flex `}
    >
      <div className="flex gap-2 ">
        <img
          alt={
            level === "main"
              ? name
              : theUser.username
          }
          src={
            level === "main"
              ? imageProfile
              : theUser.profileImage
          }
          className={`${imageStyle} rounded-full`}
        />
        <div className="flex flex-col ">
          <h4 className={`${nameStyle} font-semibold`}>
            {level === "main"
              ? name
              : theUser.username
              }
          </h4>
          <span className={`${descAndDateStyle} text-gray-500`}>
            {moment(commentDate).fromNow()}
          </span>
        </div>
      </div>
      <p className={`${descAndDateStyle} text-gray-700 `}>{comment}</p>
      <div className="flex items-center gap-2 mt-1">
        {user._id == theDataOfUser._id && (
          <div className="flex items-center gap-2 mt-1">
            <p
              onClick={() => setShowDeleteCommentPopup(!showDeleteCommentPopup)}
              className="text-red-600 cursor-pointer"
            >
              <MdDelete size={`${iconsSize}`} />
            </p>
            <p
              onClick={() => setEdit(!edit)}
              className="text-green-600 cursor-pointer"
            >
              <MdModeEdit size={`${iconsSize}`} />
            </p>
          </div>
        )}
        <p
          onClick={() => setReply(!reply)}
          className="text-blue-600 cursor-pointer"
        >
          <MdOutlineReply size={`${iconsSize}`} />
        </p>
      </div>
      {reply && (
        <div className="flex mt-2">
          <img
            alt=""
            src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"
            className="border-2 border-white rounded-full w-[32px] h-[32px] mr-2"
          />
          <input
            type="text"
            className="caret-main_color flex-1 border text-gray-500 font-medium  border-r-0 border-main_color rounded-l-xl px-2 outline-none py-1"
            placeholder="Write a comment"
            value={writeComment}
            onChange={(e) => setWriteComment(e.target.value)}
          />
          <div
            onClick={handleSendReply}
            className="bg-white flex items-center justify-center rounded-r-xl border border-main_color border-l-0 px-2 py-1 text-main_color font-bold cursor-pointer hover:bg-white_color duration-300"
          >
            <IoIosSend size={20} />
          </div>
        </div>
      )}
      {edit && (
        <div className="flex mt-2">
          <img
            alt=""
            src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"
            className="border-2 border-white rounded-full w-[32px] h-[32px] mr-2"
          />
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
      {showDeleteCommentPopup && (
        <div className="absolute  left-0 min-h-[140px] right-0 flex items-center justify-center ">
          <DeleteComment
            setShowDeleteCommentPopup={setShowDeleteCommentPopup}
            commentId={commentId}
            level={level}
            parentCommentId={parentCommentId}
          />
        </div>
      )}
    </div>
  );
};

export default CommentCard;
