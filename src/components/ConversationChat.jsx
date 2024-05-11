import React, { useEffect, useState } from "react";
import { IoIosSend } from "react-icons/io";
import MessageChat from "../cards/MessageChat";
import { useDispatch, useSelector } from "react-redux";
import { useLocalStorage } from "../hooks/useLocalStorege";
import axios from "axios";
import { URL } from "../data";
import useGetImages from "../hooks/useGetImages";
import { changeChat } from "../redux/changeChatConversation";
const ConversationChat = () => {
  const dispatch = useDispatch();
  const { getItem } = useLocalStorage("userData");
  const { getItem: getToken } = useLocalStorage("Authorization");
  const token = getToken();
  const dataOfUser = getItem();
  const [currentChat, setCurrentChat] = useState();
  const [sendMessage, setSendMessage] = useState("");

  const { theCurrentChat } = useSelector((state) => state.chat);
  useEffect(() => {
    if (theCurrentChat) {
      setCurrentChat(theCurrentChat);
    }
  }, [theCurrentChat]);
  const theUser = currentChat?.users.find(
    (user) => user._id !== dataOfUser?._id
  );
  const theDateOfOnline = currentChat?.messages?.filter(
    (message) => message.sender !== dataOfUser?._id
  );
  const imageOfUser = useGetImages(theUser?.profileImage);
  console.log(currentChat);
  const handleSendmessage = (e) => {
    e.preventDefault();
    if (sendMessage && currentChat) {
      axios
        .post(
          `${URL}/api/messages`,
          {
            chatId: currentChat?._id,
            message: sendMessage,
          },
          {
            headers: { Authorization: token },
          }
        )
        .then((response) => {
          dispatch(changeChat(response.data));
          console.log(response.data);
        })
        .catch((error) => {
          console.log("Error creating message ", error.response);
        });
      setSendMessage("");
    }
    // console.log(sendMessage);
  };
  return (
    <div className=" flex-[2] h-[70vh] relative">
      <div className="flex flex-col pb-2 ">
        <div className="flex gap-2 py-2 px-1 bg-main_color mb-2">
          <img
            className=" w-[50px] h-[50px] rounded-full ml-1"
            alt=""
            src={imageOfUser[theUser?.profileImage]}
          />
          <div className="flex flex-col ">
            {theUser && (
              <span className="font-semibold text-white">
                {theUser?.username}
              </span>
            )}
            {theUser &&
              currentChat?.messages?.length > 0 &&
              theDateOfOnline && (
                <span className="text-sm  text-white">
                  {theDateOfOnline[theDateOfOnline?.length - 1]?.createdAt}
                </span>
              )}
          </div>
        </div>
        <div className="h-[56vh] px-2 flex flex-col gap-1 overflow-y-auto pb-2">
          {currentChat ? (
            currentChat?.messages?.map((message, index) => (
              // <div key={index}>
              <MessageChat
                key={message?._id}
                id={message?._id}
                sender={message?.sender}
                date={message?.createdAt}
                message={message?.message}
              />
              // </div>
            ))
          ) : (
            <div className="text-main_color text-2xl text-center">
              Choose a conversation
            </div>
          )}
        </div>
        <div className="flex absolute bottom-0 right-0 left-0">
          <img
            alt=""
            src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"
            className="border-2 border-white rounded-full w-[32px] h-[32px] mr-2"
          />
          <input
            value={sendMessage}
            onChange={(e) => setSendMessage(e.target.value)}
            type="text"
            className="caret-main_color flex-1 border text-gray-500 font-medium  border-r-0 border-main_color rounded-l-xl px-2 outline-none py-1"
            placeholder="Write something"
          />
          <div
            onClick={handleSendmessage}
            className="bg-white flex items-center justify-center rounded-r-xl border border-main_color border-l-0 px-2 py-1 text-main_color font-bold cursor-pointer hover:bg-white_color duration-300"
          >
            <IoIosSend size={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationChat;
