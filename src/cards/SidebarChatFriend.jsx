import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { changeChat } from "../redux/changeChatConversation";
import useGetImages from "../hooks/useGetImages";
import { useLocalStorage } from "../hooks/useLocalStorege";
import axios from "axios";
import { URL } from "../data";

const SidebarChatFriend = ({ messages, users, id }) => {
  const { getItem: getToken } = useLocalStorage("Authorization");
  const token = getToken();
  const [chat, setChat] = useState(null);
  useEffect(() => {
    axios
      .get(`${URL}/api/chats/${id}`, {
        headers: { Authorization: token },
      })
      .then((response) => {
        setChat(response.data);
      })
      .catch((error) => {
        console.log("Error getting chat ", error.response);
      });
  }, []);
  const { getItem } = useLocalStorage("userData");
  const myData = getItem();
  const theUser = users.find((user) => user._id !== myData._id);
  const imageOfUser = useGetImages(theUser?.profileImage);
  const dispatch = useDispatch();
  return (
    <div
      onClick={() => dispatch(changeChat(chat))}
      className="flex gap-2 p-1 hover:bg-gray-100 cursor-pointer border-b border-b-main_color "
    >
      <img
        className=" w-[50px] h-[50px] rounded-full min-h-[50px] min-w-[50px]"
        alt=""
        src={imageOfUser[theUser?.profileImage]}
      />
      <div className="flex flex-col ">
        <span className="font-semibold">{theUser?.username}</span>
        <span className="text-sm text-gray-500 overflow-hidden line-clamp-1">
          {messages[messages.length - 1]?.message}
        </span>
      </div>
    </div>
  );
};

export default SidebarChatFriend;
