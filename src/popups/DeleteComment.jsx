import axios from "axios";
import React from "react";
import { URL } from "../data";
import { useLocalStorage } from "../hooks/useLocalStorege";

const DeleteComment = ({
  setShowDeleteCommentPopup,
  commentId,
  parentCommentId,
  level,
  setTheValueAgain,
  theValueAgain,
}) => {
  const { getItem } = useLocalStorage("Authorization");
  const handleDeleteComment = () => {
    const token = getItem();
    axios
      .delete(
        `${URL}/api/comments/${parentCommentId}?level=${level}&levelId=${commentId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((response) => {
        console.log("comment has been deleted");
        setTheValueAgain(true);
        setTimeout(() => {
          setTheValueAgain(false);
        }, 3000);
      })
      .catch((error) => {
        console.log("error edit comment ", error.response);
      });
    setShowDeleteCommentPopup(false);
  };
  return (
    <div className=" shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px]  rounded-lg w-[50%]">
      <div className=" rounded-lg p-2 flex items-center justify-center flex-col z-20 bg-white">
        <p className="font-semibold text-lg text-main_color">Warning</p>
        <p className="text-gray-600 font-medium">
          Are you sure you want to delete this comment!
        </p>
        <div className="flex justify-center gap-10 mt-2">
          <p
            onClick={handleDeleteComment}
            className="px-2 py-0.5 border border-main_color bg-main_color active:bg-main_color active:text-white hover:bg-white hover:text-main_color text-white duration-100 font-medium cursor-pointer rounded-lg"
          >
            Delete
          </p>
          <p
            onClick={() => setShowDeleteCommentPopup(false)}
            className="px-2 py-0.5 border border-green-600 bg-green-600 active:bg-green-600 active:text-white hover:bg-white hover:text-green-600 text-white duration-100 font-medium cursor-pointer rounded-lg"
          >
            Cancel
          </p>
        </div>
      </div>
    </div>
  );
};

export default DeleteComment;
