import axios from "axios";
import React, { useEffect, useState } from "react";
import { URL } from "../data";
import moment from "moment";
import { useLocalStorage } from "../hooks/useLocalStorege";
const MessageChat = ({ sender, date, message, id }) => {
  const { getItem } = useLocalStorage("userData");
  const me = getItem();
  const [user, setUser] = useState(null);
  useEffect(() => {
    axios
      .get(`${URL}/api/users/${sender}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log("Error getting user ", error.response);
      });
  }, []);
  return (
    <div className={`flex   ${sender === me?._id && "justify-end"}`}>
      <div className="flex flex-col max-w-[80%]">
        <span className="font-semibold text-sm ">{user?.username}</span>
        <div
          className={`flex flex-col gap-1 px-2 p-1 rounded-lg ${
            sender === me?._id ? "bg-main_color " : "bg-gray-100"
          }`}
        >
          <span className="">{message}</span>
          <span
            className={`text-xs ${
              sender === me?._id ? "text-white" : "text-main_color"
            }`}
          >
            {moment(date).fromNow()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MessageChat;
