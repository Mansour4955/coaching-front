import React, { useEffect, useState } from "react";
import { IoIosSend } from "react-icons/io";
import MessageChat from "../cards/MessageChat";
import { useDispatch, useSelector } from "react-redux";
import { useLocalStorage } from "../hooks/useLocalStorege";
import axios from "axios";
import { URL } from "../data";
import useGetImages from "../hooks/useGetImages";
import { changeChat } from "../redux/changeChatConversation";
import { PiDotsThreeCircle } from "react-icons/pi";
import moment from "moment";
const ConversationChat = ({ setCount }) => {
  const dispatch = useDispatch();
  const { getItem } = useLocalStorage("userData");
  const { getItem: getToken } = useLocalStorage("Authorization");
  const token = getToken();
  const dataOfUser = getItem();
  const [showDeleteChat, setShowDeleteChat] = useState(false);
  const [currentChat, setCurrentChat] = useState();
  const [sendMessage, setSendMessage] = useState("");
  const theOwnerOfAccountImage = useGetImages(dataOfUser?.profileImage);
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
  };
  const handleDeleteChat = () => {
    axios
      .delete(`${URL}/api/chats/${currentChat?._id}`, {
        headers: { Authorization: token },
      })
      .then((response) => {
        dispatch(changeChat(null));
        setCurrentChat(null);
        setCount((n) => (n += 1));
        console.log(response.data);
        setShowDeleteChat(false);
      })
      .catch((error) => {
        console.log("Error deleting chat ", error.response);
      });
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
          <div className="flex items-center justify-between w-full pr-2">
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
                    {moment(
                      theDateOfOnline[theDateOfOnline?.length - 1]?.createdAt
                    ).fromNow()}
                  </span>
                )}
            </div>
            {currentChat && (
              <div className="relative h-[100%] flex items-center">
                <span
                  onClick={() => setShowDeleteChat(true)}
                  className="text-white font-semibold cursor-pointer"
                >
                  <PiDotsThreeCircle size={22} />
                </span>
                {showDeleteChat && (
                  <div className="absolute top-[100%] right-0 rounded-lg p-4 bg-white">
                    <div className="bg-white p-4 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-lg flex items-center justify-center flex-col z-20">
                      <p className="font-semibold text-lg text-main_color">
                        Warning
                      </p>
                      <p className="text-gray-600 font-medium">
                        Are you sure you want to delete this chat!
                      </p>
                      <div className="flex justify-center gap-10 mt-2">
                        <p
                          onClick={handleDeleteChat}
                          className="px-2 py-0.5 border border-main_color bg-main_color active:bg-main_color active:text-white hover:bg-white hover:text-main_color text-white duration-100 font-medium cursor-pointer rounded-lg"
                        >
                          Delete
                        </p>
                        <p
                          onClick={() => setShowDeleteChat(false)}
                          className="px-2 py-0.5 border border-green-600 bg-green-600 active:bg-green-600 active:text-white hover:bg-white hover:text-green-600 text-white duration-100 font-medium cursor-pointer rounded-lg"
                        >
                          Cancel
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
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
            src={theOwnerOfAccountImage[dataOfUser?.profileImage]}
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
