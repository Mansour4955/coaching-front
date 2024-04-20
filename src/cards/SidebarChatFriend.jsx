import React from "react";
import { useDispatch } from "react-redux";
import {changeChat} from "../redux/changeChatConversation"
import {conversations}from "../data"

const SidebarChatFriend = ({ messages, username, profilePhoto,id }) => {
  const friendChat = conversations.find(friend => friend.id === id)
  const dispatch = useDispatch()
  return (
    <div
    onClick={()=>dispatch(changeChat(friendChat))}
    className="flex gap-2 p-1 hover:bg-gray-100 cursor-pointer border-b border-b-main_color ">
      <img
        className=" w-[50px] h-[50px] rounded-full min-h-[50px] min-w-[50px]"
        alt=""
        src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"
      />
      <div className="flex flex-col ">
        <span className="font-semibold">{username}</span>
        <span className="text-sm text-gray-500 overflow-hidden line-clamp-1">
          {messages[messages.length - 1].message}
        </span>
      </div>
    </div>
  );
};

export default SidebarChatFriend;
