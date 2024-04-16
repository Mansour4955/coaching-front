import React, { useState } from "react";
import { PiDotsThreeCircle } from "react-icons/pi";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import CommentCard from "./CommentCard";
const PublishedPost = ({
  full_name,
  postPhoto,
  date_of_publish,
  description,
  profilePhoto,
  id,
  likes,
  comments,
}) => {
  const [showMore, setShowMore] = useState(false);
  const [toggleLike, setToggleLike] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showAllComments, setShowAllComments] = useState(false);
  const [showAllNestedComments, setShowAllNestedComments] = useState(false);
  const [showAllNestedBestedComments, setShowAllNestedNestedComments] = useState(false);


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
      <img alt="post" src={postPhoto} className="w-full h-[300px]" />
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
        {showComments && (
          <div className="flex flex-col">
            <div className="flex flex-col border border-main_color relative">
              {showAllComments
                ? comments?.map((comment) => (
                    <div key={comment.commentId}>
                      <CommentCard
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
                : comments?.length > 3
                ? comments?.slice(0, 3).map((comment) => (
                    <div key={comment.commentId}>
                      <CommentCard
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
            {comments.length > 3 && (
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
