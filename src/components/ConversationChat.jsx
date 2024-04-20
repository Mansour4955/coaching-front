import React, { useEffect, useState } from "react";
import { IoIosSend } from "react-icons/io";
import MessageChat from "../cards/MessageChat";
import { useSelector } from "react-redux";

const ConversationChat = () => {
  const [currentChat, setCurrentChat] = useState();
  const [sendMessage, setSendMessage] = useState("");
  const handleSendmessage = (e) => {
    e.preventDefault();
    console.log(sendMessage);
    setSendMessage("");
  };

  const { theCurrentChat } = useSelector((state) => state.chat);
  useEffect(() => {
    if (theCurrentChat) {
      setCurrentChat(theCurrentChat);
    }
  }, [theCurrentChat]);

  return (
    <div className=" flex-[2] h-[70vh]">
      <div className="flex flex-col pb-2 ">
        <div className="flex gap-2 py-2 px-1 bg-main_color mb-2">
          <img
            className=" w-[50px] h-[50px] rounded-full ml-1"
            alt=""
            src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"
          />
          <div className="flex flex-col ">
            {currentChat?.username && (
              <span className="font-semibold text-white">
                {currentChat?.username}
              </span>
            )}
            {currentChat && (
              <span className="text-sm  text-white">last seen at 10PM</span>
            )}
          </div>
        </div>
        <div className="h-[56vh] px-2 flex flex-col gap-1 overflow-y-auto">
          {currentChat ? (
            currentChat?.messages?.map((message, index) => (
              <div key={index}>
                <MessageChat
                  id={message.id}
                  username={message.username}
                  date={message.date}
                  message={message.message}
                />
              </div>
            ))
          ) : (
            <div className="text-main_color text-2xl text-center">
              Choose a conversation
            </div>
          )}
        </div>
        <div className="flex pt-1">
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
