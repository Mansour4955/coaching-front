import React, { useEffect, useState } from "react";
import SidebarChatFriend from "../cards/SidebarChatFriend";
import { MdChat } from "react-icons/md";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { URL, conversations } from "../data";
import { IoSearchOutline } from "react-icons/io5";
import axios from "axios";
import { useLocalStorage } from "../hooks/useLocalStorege";
import useGetImages from "../hooks/useGetImages";
const SidebarChat = ({ count }) => {
  const { getItem } = useLocalStorage("Authorization");
  const { getItem: getAccountOwner } = useLocalStorage("userData");
  const accountOwner = getAccountOwner();
  const token = getItem();
  const [filterByName, setFilterByName] = useState("");
  const [theChats, setTheChats] = useState([]);
  const handleFilterByName = (e) => {
    e.preventDefault();
    console.log(filterByName);
    setFilterByName("");
  };
  useEffect(() => {
    axios
      .get(`${URL}/api/chats`, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setTheChats(response.data);
        // setTheValueAgain(true);
        // setTimeout(() => {
        //   setTheValueAgain(false);
        // }, 3000);
      })
      .catch((error) => {
        // Handle error if needed
        console.error("Error getting chats ", error.response);
      });
  }, [count]);
  const imageOfUser = useGetImages(accountOwner?.profileImage);
  return (
    <div className=" flex-col flex-1 min-h-[50vh]  border-r border-main_color mr-1">
      <div className="flex justify-between bg-main_color items-center mb-2 py-2 gap-1 pr-2">
        <img
          className=" w-[50px] h-[50px] min-w-[50px] min-h-[50px] rounded-full ml-1 "
          alt=""
          src={imageOfUser[accountOwner?.profileImage]}
        />
        <div className="flex max-sm:hidden w-full">
          <input
            type="text"
            className="caret-main_color w-full max-lg:w-[60%] text-gray-500 font-medium  border-r-0 rounded-l-xl px-2 outline-none py-1"
            placeholder="Search"
            value={filterByName}
            onChange={(e) => setFilterByName(e.target.value)}
          />
          <div
            onClick={handleFilterByName}
            className="flex items-center justify-center rounded-r-xl  cursor-pointer hover:bg-gray-100 text-main_color bg-white px-2 duration-300"
          >
            <IoSearchOutline size={20} />
          </div>
        </div>
        {/* <div className="flex gap-2 items-center">
          <span className="text-white p-2 flex items-center justify-center rounded-full hover:bg-gray-100 hover:text-main_color cursor-pointer duration-100">
            <MdChat size={22} />
          </span>
          <span className="text-white p-2 flex items-center justify-center rounded-full mr-1 hover:bg-gray-100 hover:text-main_color cursor-pointer duration-100">
            <HiOutlineDotsVertical size={22} />
          </span>
        </div> */}
      </div>
      <div className="flex flex-col overflow-y-auto h-[60vh]">
        {theChats &&
          theChats?.map((chat) => (
            // <div key={chat._id}>
            <SidebarChatFriend
              key={chat._id}
              id={chat._id}
              messages={chat.messages}
              users={chat.users}
              // image={chat.users}
              // username={chat.username}
            />
            // </div>
          ))}
      </div>
    </div>
  );
};

export default SidebarChat;
