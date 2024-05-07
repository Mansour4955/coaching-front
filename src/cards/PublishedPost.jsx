import React, { useCallback, useEffect, useMemo, useState } from "react";
import { PiDotsThreeCircle } from "react-icons/pi";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import CommentCard from "./CommentCard";
import { IoIosSend } from "react-icons/io";
import moment from "moment";
import useGetImages from "../hooks/useGetImages";
import { URL } from "../data";
import axios from "axios";
import { useLocalStorage } from "../hooks/useLocalStorege";
const PublishedPost = ({
  full_name,
  postPhoto,
  date_of_publish,
  description,
  profilePhoto,
  id,
  likes,
  comments,
  domaine,
  theValueAgain,
  setTheValueAgain,
}) => {
  const { getItem } = useLocalStorage("userData");
  const { getItem: auth } = useLocalStorage("Authorization");
  const [theLikes, setTheLikes] = useState(
    likes && likes?.length > 0 ? likes?.length : "0"
  );
  const [theComments, setTheComments] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [theValue, setTheValue] = useState(false);
  const theUser = getItem();
  const imageData = useGetImages(postPhoto);
  const [showMore, setShowMore] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showAllComments, setShowAllComments] = useState(false);
  const [writeComment, setWriteComment] = useState("");
  const token = auth();
  const handleToggleLike = () => {
    axios
      .put(
        `${URL}/api/posts/like/${id}`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((response) => {
        setTheLikes(response.data.likes.length);
        setIsLiked(response.data.likes.includes(theUser._id));
        setTheValue(true);
      })
      .catch((error) => {
        // Handle error if needed
        console.error("Error toggling like:", error.data);
      });
  };
  const handleSendComment = () => {
    axios
      .post(
        `${URL}/api/comments`,
        {
          postId: id,
          comment: writeComment,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((response) => {
        setTheComments(response.data);
        setTheValue(true);
        setTheValueAgain(true);
        setTimeout(() => {
          setTheValueAgain(false);
        }, 3000);
      })
      .catch((error) => {
        // Handle error if needed
        console.error("Error posting comments ", error.data);
      });

    setWriteComment("");
  };

  useEffect(() => {
    const internalId = setInterval(() => {
      if (theValue || theValueAgain) {
        axios
          .get(`${URL}/api/comments?postId=${id}`)
          .then((response) => {
            setTheComments(response.data);
            console.log("get comments ", response.data);
          })
          .catch((error) => {
            console.error("Error get comments of the post:", error.data);
          });
      }
    }, 0);

    return () => {
      clearInterval(internalId);
      setTheValue(false);
    };
  }, [theComments, theValueAgain]);

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
              <span className="font-semibold text-base">{full_name}</span>{" "}
              published{" "}
              <span className="font-semibold text-base text-main_color">
                a photo
              </span>
            </p>
            <span className="text-gray-500 text-sm">
              {moment(date_of_publish).fromNow()}
            </span>
          </div>
        </div>
        <span className="font-bold text-gray-500 cursor-pointer">
          <PiDotsThreeCircle size={20} />
        </span>
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
      <img alt="post" src={imageData[postPhoto]} className="w-full h-full" />
      <div className="flex flex-col">
        <div className="flex items-center gap-3 text-gray-600 mb-1">
          <p className="text-lg font-semibold flex items-center gap-1">
            {theLikes}{" "}
            <span
              onClick={handleToggleLike}
              className="font-bold cursor-pointer"
            >
              {isLiked ? (
                <AiFillLike size={20} className="text-main_color" />
              ) : (
                <AiOutlineLike size={20} className="text-main_color" />
              )}
            </span>
          </p>
          <p
            className="text-lg font-semibold cursor-pointer"
            onClick={() => setShowComments(!showComments)}
          >
            {theComments && theComments?.length > 0 ? theComments?.length : "0"}{" "}
            <span className="font-medium text-base ">
              {theComments?.length == 1 || 0 ? "Comment" : "Comments"}
            </span>
          </p>
        </div>
        <div className="flex mb-2">
          <img
            alt=""
            src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"
            className="rounded-full w-[40px] h-[40px] mr-2"
          />
          <input
            type="text"
            className="caret-main_color flex-1 border text-gray-500 font-medium  border-r-0 border-main_color rounded-l-xl px-2 outline-none py-1"
            placeholder="Write a comment"
            value={writeComment}
            onChange={(e) => setWriteComment(e.target.value)}
          />
          <div
            onClick={handleSendComment}
            className="flex items-center justify-center rounded-r-xl border border-main_color border-l-0 px-2 py-1 text-main_color font-bold cursor-pointer hover:bg-white_color duration-300"
          >
            <IoIosSend size={20} />
          </div>
        </div>
        {showComments && (
          <div className="flex flex-col">
            <div className="flex flex-col p-2 border border-main_color relative">
              {showAllComments
                ? theComments?.map((comment) => (
                    <div key={comment._id}>
                      <CommentCard
                      theValueAgain={theValueAgain}
                      setTheValueAgain={setTheValueAgain}
                        level="main"
                        parentDevStyle="ml-0"
                        iconsSize="18"
                        imageStyle="w-[60px] h-[60px]"
                        nameStyle="text-base"
                        descAndDateStyle="text-base"
                        user={comment.user}
                        commentId={comment._id}
                        parentCommentId={comment._id}
                        comment={comment.comment}
                        commentDate={comment.createdAt}
                        name={comment.user.username}
                        imageProfile={comment.user.profileImage}
                      />
                      {comment?.level1?.length > 0 &&
                        comment?.level1?.map((level1Item) => (
                          <div
                            className="ml-5 border-l border-l-main_color"
                            key={level1Item._id}
                          >
                            <CommentCard
                            theValueAgain={theValueAgain}
                            setTheValueAgain={setTheValueAgain}
                              level="level1"
                              parentCommentId={comment._id}
                              parentDevStyle="ml-2.5"
                              iconsSize="16"
                              imageStyle="w-[50px] h-[50px]"
                              nameStyle="text-sm"
                              descAndDateStyle="text-sm"
                              commentId={level1Item._id}
                              user={level1Item.user}
                              comment={level1Item.comment}
                              commentDate={level1Item.commentDate}
                              name={level1Item.user.username}
                              imageProfile={level1Item.user.profileImage}
                            />
                            {level1Item?.level2?.length > 0 &&
                              level1Item?.level2?.map((level2Item) => (
                                <div
                                  className="ml-5 border-l border-l-main_color"
                                  key={level2Item._id}
                                >
                                  <CommentCard
                                  theValueAgain={theValueAgain}
                                  setTheValueAgain={setTheValueAgain}
                                    level="level2"
                                    parentCommentId={comment._id}
                                    parentDevStyle="ml-2.5"
                                    iconsSize="14"
                                    imageStyle="w-[40px] h-[40px]"
                                    nameStyle="text-sm"
                                    descAndDateStyle="text-xs"
                                    commentId={level2Item._id}
                                    user={level2Item.user}
                                    comment={level2Item.comment}
                                    commentDate={level2Item.commentDate}
                                    name={level2Item.user.username}
                                    imageProfile={level2Item.user.profileImage}
                                  />
                                  {level2Item?.level3?.length > 0 &&
                                    level2Item?.level3?.map((level3Item) => (
                                      <CommentCard
                                      theValueAgain={theValueAgain}
                                      setTheValueAgain={setTheValueAgain}
                                        level="level3"
                                        parentCommentId={comment._id}
                                        parentDevStyle="ml-2.5"
                                        iconsSize="14"
                                        imageStyle="w-[40px] h-[40px]"
                                        nameStyle="text-sm"
                                        descAndDateStyle="text-xs"
                                        key={level3Item._id}
                                        user={level3Item.user}
                                        commentId={level3Item._id}
                                        comment={level3Item.comment}
                                        commentDate={level3Item.commentDate}
                                        name={level3Item.user.username}
                                        imageProfile={
                                          level3Item.user.profileImage
                                        }
                                      />
                                    ))}
                                </div>
                              ))}
                          </div>
                        ))}
                    </div>
                  ))
                : theComments?.length > 2
                ? theComments?.slice(0, 2).map((comment) => (
                    <div key={comment._id}>
                      <CommentCard
                      theValueAgain={theValueAgain}
                      setTheValueAgain={setTheValueAgain}
                        level="main"
                        parentDevStyle="ml-0"
                        iconsSize="18"
                        imageStyle="w-[60px] h-[60px]"
                        nameStyle="text-base"
                        descAndDateStyle="text-base"
                        user={comment.user}
                        parentCommentId={comment._id}
                        commentId={comment._id}
                        comment={comment.comment}
                        commentDate={comment.createdAt}
                        name={comment.user.username}
                        imageProfile={comment.user.profileImage}
                      />
                      {comment?.level1?.length > 0 &&
                        comment?.level1?.map((level1Item) => (
                          <div
                            className="ml-5 border-l border-l-main_color"
                            key={level1Item._id}
                          >
                            <CommentCard
                            theValueAgain={theValueAgain}
                            setTheValueAgain={setTheValueAgain}
                              level="level1"
                              parentCommentId={comment._id}
                              parentDevStyle="ml-2.5"
                              iconsSize="16"
                              imageStyle="w-[50px] h-[50px]"
                              nameStyle="text-sm"
                              descAndDateStyle="text-sm"
                              commentId={level1Item._id}
                              user={level1Item.user}
                              comment={level1Item.comment}
                              commentDate={level1Item.commentDate}
                              name={level1Item.user.username}
                              imageProfile={level1Item.user.profileImage}
                            />
                            {level1Item?.level2?.length > 0 &&
                              level1Item?.level2?.map((level2Item) => (
                                <div
                                  className="ml-5 border-l border-l-main_color"
                                  key={level2Item._id}
                                >
                                  <CommentCard
                                  theValueAgain={theValueAgain}
                                  setTheValueAgain={setTheValueAgain}
                                    level="level2"
                                    parentCommentId={comment._id}
                                    parentDevStyle="ml-2.5"
                                    iconsSize="14"
                                    imageStyle="w-[40px] h-[40px]"
                                    nameStyle="text-sm"
                                    descAndDateStyle="text-xs"
                                    commentId={level2Item._id}
                                    user={level2Item.user}
                                    comment={level2Item.comment}
                                    commentDate={level2Item.commentDate}
                                    name={level2Item.user.username}
                                    imageProfile={level2Item.user.profileImage}
                                  />
                                  {level2Item?.level3?.length > 0 &&
                                    level2Item?.level3?.map((level3Item) => (
                                      <CommentCard
                                      theValueAgain={theValueAgain}
                                      setTheValueAgain={setTheValueAgain}
                                        level="level3"
                                        parentCommentId={comment._id}
                                        parentDevStyle="ml-2.5"
                                        iconsSize="14"
                                        imageStyle="w-[40px] h-[40px]"
                                        nameStyle="text-sm"
                                        descAndDateStyle="text-xs"
                                        key={level3Item._id}
                                        user={level3Item.user}
                                        commentId={level3Item._id}
                                        comment={level3Item.comment}
                                        commentDate={level3Item.commentDate}
                                        name={level3Item.user.username}
                                        imageProfile={
                                          level3Item.user.profileImage
                                        }
                                      />
                                    ))}
                                </div>
                              ))}
                          </div>
                        ))}
                    </div>
                  ))
                : theComments?.map((comment) => (
                    <div key={comment._id}>
                      <CommentCard
                      theValueAgain={theValueAgain}
                      setTheValueAgain={setTheValueAgain}
                        level="main"
                        parentDevStyle="ml-0"
                        iconsSize="18"
                        imageStyle="w-[60px] h-[60px]"
                        nameStyle="text-base"
                        descAndDateStyle="text-base"
                        user={comment.user}
                        parentCommentId={comment._id}
                        commentId={comment._id}
                        comment={comment.comment}
                        commentDate={comment.createdAt}
                        name={comment.user.username}
                        imageProfile={comment.user.profileImage}
                      />
                      {comment?.level1?.length > 0 &&
                        comment?.level1?.map((level1Item) => (
                          <div
                            className="ml-5 border-l border-l-main_color"
                            key={level1Item._id}
                          >
                            <CommentCard
                            theValueAgain={theValueAgain}
                            setTheValueAgain={setTheValueAgain}
                              level="level1"
                              parentCommentId={comment._id}
                              parentDevStyle="ml-2.5"
                              iconsSize="16"
                              imageStyle="w-[50px] h-[50px]"
                              nameStyle="text-sm"
                              descAndDateStyle="text-sm"
                              commentId={level1Item._id}
                              user={level1Item.user}
                              comment={level1Item.comment}
                              commentDate={level1Item.commentDate}
                              name={level1Item.user.username}
                              imageProfile={level1Item.user.profileImage}
                            />
                            {level1Item?.level2?.length > 0 &&
                              level1Item?.level2?.map((level2Item) => (
                                <div
                                  className="ml-5 border-l border-l-main_color"
                                  key={level2Item._id}
                                >
                                  <CommentCard
                                  theValueAgain={theValueAgain}
                                  setTheValueAgain={setTheValueAgain}
                                    level="level2"
                                    parentCommentId={comment._id}
                                    parentDevStyle="ml-2.5"
                                    iconsSize="14"
                                    imageStyle="w-[40px] h-[40px]"
                                    nameStyle="text-sm"
                                    descAndDateStyle="text-xs"
                                    commentId={level2Item._id}
                                    user={level2Item.user}
                                    comment={level2Item.comment}
                                    commentDate={level2Item.commentDate}
                                    name={level2Item.user.username}
                                    imageProfile={level2Item.user.profileImage}
                                  />
                                  {level2Item?.level3?.length > 0 &&
                                    level2Item?.level3?.map((level3Item) => (
                                      <CommentCard
                                      theValueAgain={theValueAgain}
                                      setTheValueAgain={setTheValueAgain}
                                        level="level3"
                                        parentCommentId={comment._id}
                                        parentDevStyle="ml-2.5"
                                        iconsSize="14"
                                        imageStyle="w-[40px] h-[40px]"
                                        nameStyle="text-sm"
                                        descAndDateStyle="text-xs"
                                        key={level3Item._id}
                                        user={level3Item.user}
                                        commentId={level3Item._id}
                                        comment={level3Item.comment}
                                        commentDate={level3Item.commentDate}
                                        name={level3Item.user.username}
                                        imageProfile={
                                          level3Item.user.profileImage
                                        }
                                      />
                                    ))}
                                </div>
                              ))}
                          </div>
                        ))}
                    </div>
                  ))}
            </div>
            {theComments.length > 2 && (
              <button
                onClick={() => setShowAllComments(!showAllComments)}
                className="text-main_color text-sm mt-1"
              >
                {showAllComments ? "See less" : "See more"}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PublishedPost;
