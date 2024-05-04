import React, { useState } from "react";
import { PiDotsThreeCircle } from "react-icons/pi";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import CommentCard from "./CommentCard";
import { IoIosSend } from "react-icons/io";
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
}) => {
  const [showMore, setShowMore] = useState(false);
  const [toggleLike, setToggleLike] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showAllComments, setShowAllComments] = useState(false);
  const [writeComment, setWriteComment] = useState("");

  const handleSendComment = () => {
    console.log(writeComment, { postid: id });
    setWriteComment("");
  };

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
            <span className="text-gray-500 text-sm">{date_of_publish}</span>
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
      <img
        alt="post"
        src={`../../../coaching-back/images/${postPhoto}`}
        className="w-full h-full"
      />
      <div className="flex flex-col">
        <div className="flex items-center gap-3 text-gray-600 mb-1">
          <p className="text-lg font-semibold flex items-center gap-1">
            {likes && likes?.length > 0 ? likes?.length : "0"}{" "}
            <span
              onClick={() => setToggleLike(!toggleLike)}
              className="font-bold cursor-pointer"
            >
              {toggleLike ? (
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
            {comments && comments?.length > 0 ? comments?.length : "0"}{" "}
            <span className="font-medium text-base ">
              {comments?.length == 1 || 0 ? "Comment" : "Comments"}
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
                ? comments?.map((comment) => (
                    <div key={comment.commentId}>
                      <CommentCard
                        parentDevStyle="ml-0"
                        iconsSize="18"
                        imageStyle="w-[60px] h-[60px]"
                        nameStyle="text-base"
                        descAndDateStyle="text-base"
                        commentId={comment.commentId}
                        name={comment.name}
                        comment={comment.comment}
                        commentDate={comment.commentDate}
                        imageProfile={comment.imageProfile}
                      />
                      {comment?.level1?.length > 0 &&
                        comment?.level1?.map((level1Item) => (
                          <div
                            className="ml-5 border-l border-l-main_color"
                            key={level1Item.commentChildId}
                          >
                            <CommentCard
                              parentDevStyle="ml-2.5"
                              iconsSize="16"
                              imageStyle="w-[50px] h-[50px]"
                              nameStyle="text-sm"
                              descAndDateStyle="text-sm"
                              commentId={level1Item.commentChildId}
                              name={level1Item.name}
                              comment={level1Item.comment}
                              commentDate={level1Item.commentDate}
                              imageProfile={level1Item.imageProfile}
                            />
                            {level1Item?.level2?.length > 0 &&
                              level1Item?.level2?.map((level2Item) => (
                                <div
                                  className="ml-5 border-l border-l-main_color"
                                  key={level2Item.commentSmallChildId}
                                >
                                  <CommentCard
                                    parentDevStyle="ml-2.5"
                                    iconsSize="14"
                                    imageStyle="w-[40px] h-[40px]"
                                    nameStyle="text-sm"
                                    descAndDateStyle="text-xs"
                                    commentId={level2Item.commentSmallChildId}
                                    name={level2Item.name}
                                    comment={level2Item.comment}
                                    commentDate={level2Item.commentDate}
                                    imageProfile={level2Item.imageProfile}
                                  />
                                  {level2Item?.level3?.length > 0 &&
                                    level2Item?.level3?.map((level3Item) => (
                                      <CommentCard
                                        parentDevStyle="ml-2.5"
                                        iconsSize="14"
                                        imageStyle="w-[40px] h-[40px]"
                                        nameStyle="text-sm"
                                        descAndDateStyle="text-xs"
                                        key={
                                          level3Item.commentTheSmallestChildId
                                        }
                                        commentId={
                                          level3Item.commentTheSmallestChildId
                                        }
                                        name={level3Item.name}
                                        comment={level3Item.comment}
                                        commentDate={level3Item.commentDate}
                                        imageProfile={level3Item.imageProfile}
                                      />
                                    ))}
                                </div>
                              ))}
                          </div>
                        ))}
                    </div>
                  ))
                : comments?.length > 2
                ? comments?.slice(0, 2).map((comment) => (
                    <div key={comment.commentId}>
                      <CommentCard
                        parentDevStyle="ml-0"
                        iconsSize="18"
                        imageStyle="w-[60px] h-[60px]"
                        nameStyle="text-base"
                        descAndDateStyle="text-base"
                        commentId={comment.commentId}
                        name={comment.name}
                        comment={comment.comment}
                        commentDate={comment.commentDate}
                        imageProfile={comment.imageProfile}
                      />
                      {comment?.level1?.length > 0 &&
                        comment?.level1?.map((level1Item) => (
                          <div
                            className="ml-5 border-l border-l-main_color"
                            key={level1Item.commentChildId}
                          >
                            <CommentCard
                              parentDevStyle="ml-2.5"
                              iconsSize="16"
                              imageStyle="w-[50px] h-[50px]"
                              nameStyle="text-sm"
                              descAndDateStyle="text-sm"
                              commentId={level1Item.commentChildId}
                              name={level1Item.name}
                              comment={level1Item.comment}
                              commentDate={level1Item.commentDate}
                              imageProfile={level1Item.imageProfile}
                            />
                            {level1Item?.level2?.length > 0 &&
                              level1Item?.level2?.map((level2Item) => (
                                <div
                                  className="ml-5 border-l border-l-main_color"
                                  key={level2Item.commentSmallChildId}
                                >
                                  <CommentCard
                                    parentDevStyle="ml-2.5"
                                    iconsSize="14"
                                    imageStyle="w-[40px] h-[40px]"
                                    nameStyle="text-sm"
                                    descAndDateStyle="text-xs"
                                    commentId={level2Item.commentSmallChildId}
                                    name={level2Item.name}
                                    comment={level2Item.comment}
                                    commentDate={level2Item.commentDate}
                                    imageProfile={level2Item.imageProfile}
                                  />
                                  {level2Item?.level3?.length > 0 &&
                                    level2Item?.level3?.map((level3Item) => (
                                      <CommentCard
                                        parentDevStyle="ml-2.5"
                                        iconsSize="14"
                                        imageStyle="w-[40px] h-[40px]"
                                        nameStyle="text-sm"
                                        descAndDateStyle="text-xs"
                                        key={
                                          level3Item.commentTheSmallestChildId
                                        }
                                        commentId={
                                          level3Item.commentTheSmallestChildId
                                        }
                                        name={level3Item.name}
                                        comment={level3Item.comment}
                                        commentDate={level3Item.commentDate}
                                        imageProfile={level3Item.imageProfile}
                                      />
                                    ))}
                                </div>
                              ))}
                          </div>
                        ))}
                    </div>
                  ))
                : comments?.map((comment) => (
                    <div key={comment.commentId}>
                      <CommentCard
                        parentDevStyle="ml-0"
                        iconsSize="18"
                        imageStyle="w-[60px] h-[60px]"
                        nameStyle="text-base"
                        descAndDateStyle="text-base"
                        commentId={comment.commentId}
                        name={comment.name}
                        comment={comment.comment}
                        commentDate={comment.commentDate}
                        imageProfile={comment.imageProfile}
                      />
                      {comment?.level1?.length > 0 &&
                        comment?.level1?.map((level1Item) => (
                          <div
                            className="ml-5 border-l border-l-main_color"
                            key={level1Item.commentChildId}
                          >
                            <CommentCard
                              parentDevStyle="ml-2.5"
                              iconsSize="16"
                              imageStyle="w-[50px] h-[50px]"
                              nameStyle="text-sm"
                              descAndDateStyle="text-sm"
                              commentId={level1Item.commentChildId}
                              name={level1Item.name}
                              comment={level1Item.comment}
                              commentDate={level1Item.commentDate}
                              imageProfile={level1Item.imageProfile}
                            />
                            {level1Item?.level2?.length > 0 &&
                              level1Item?.level2?.map((level2Item) => (
                                <div
                                  className="ml-5 border-l border-l-main_color"
                                  key={level2Item.commentSmallChildId}
                                >
                                  <CommentCard
                                    parentDevStyle="ml-2.5"
                                    iconsSize="14"
                                    imageStyle="w-[40px] h-[40px]"
                                    nameStyle="text-sm"
                                    descAndDateStyle="text-xs"
                                    commentId={level2Item.commentSmallChildId}
                                    name={level2Item.name}
                                    comment={level2Item.comment}
                                    commentDate={level2Item.commentDate}
                                    imageProfile={level2Item.imageProfile}
                                  />
                                  {level2Item?.level3?.length > 0 &&
                                    level2Item?.level3?.map((level3Item) => (
                                      <CommentCard
                                        parentDevStyle="ml-2.5"
                                        iconsSize="14"
                                        imageStyle="w-[40px] h-[40px]"
                                        nameStyle="text-sm"
                                        descAndDateStyle="text-xs"
                                        key={
                                          level3Item.commentTheSmallestChildId
                                        }
                                        commentId={
                                          level3Item.commentTheSmallestChildId
                                        }
                                        name={level3Item.name}
                                        comment={level3Item.comment}
                                        commentDate={level3Item.commentDate}
                                        imageProfile={level3Item.imageProfile}
                                      />
                                    ))}
                                </div>
                              ))}
                          </div>
                        ))}
                    </div>
                  ))}
            </div>
            {comments.length > 2 && (
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
