import React from "react";

const MessageChat = ({ username, date, message, id }) => {
  return (
    <div className={`flex   ${id === 2 && "justify-end"}`}>
      <div className="flex flex-col max-w-[80%]">
        <span className="font-semibold text-sm ">{username}</span>
        <div
          className={`flex flex-col gap-1 px-2 p-1 rounded-lg ${
            id === 2 ? "bg-main_color " : "bg-gray-100"
          }`}
        >
          <span className="">{message}</span>
          <span
            className={`text-xs ${id === 2 ? "text-white" : "text-main_color"}`}
          >
            {date}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MessageChat;
