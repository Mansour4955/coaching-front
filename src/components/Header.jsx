import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import { MdHome } from "react-icons/md";
import { IoMdVideocam } from "react-icons/io";
import { HiMiniChatBubbleLeftRight } from "react-icons/hi2";
import { BiSolidBell } from "react-icons/bi";
import { FaCalendarAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";
const Header = () => {
  return (
    <div className="fixed right-0 left-0 top-0 z-50 bg-white px-4 py-3 shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)] flex justify-between items-center">
      <div className="flex gap-2 items-center">
        <img
          alt="logo"
          src="https://images.pexels.com/photos/3689532/pexels-photo-3689532.jpeg"
          className="w-[30px] h-[30px] rounded-full"
        />
        <div className="flex">
          <input
            type="text"
            className="caret-main_color border text-gray-500 font-medium  border-r-0 border-main_color rounded-l-xl px-2 outline-none py-1"
            placeholder="Search"
          />
          <div className="flex items-center justify-center rounded-r-xl border border-main_color border-l-0 px-2 py-1 text-main_color font-bold cursor-pointer hover:bg-white_color duration-300">
            <IoSearchOutline size={20} />
          </div>
        </div>
      </div>
      <div className="flex gap-10 items-center">
        <div className="flex gap-5 items-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-main_color" : "text-gray-500"
            }
          >
            <MdHome size={19} />
          </NavLink>
          <NavLink
            to="/streaming"
            className={({ isActive }) =>
              isActive ? "text-main_color" : "text-gray-500"
            }
          >
            <IoMdVideocam size={19} />
          </NavLink>
          <NavLink
            to="/chat"
            className={({ isActive }) =>
              isActive ? "text-main_color" : "text-gray-500"
            }
          >
            <HiMiniChatBubbleLeftRight size={19} />
          </NavLink>
          <NavLink
            to="/notification"
            className={({ isActive }) =>
              isActive ? "text-main_color" : "text-gray-500"
            }
          >
            <BiSolidBell size={19} />
          </NavLink>
          <NavLink
            to="/rendez-vous"
            className={({ isActive }) =>
              isActive ? "text-main_color" : "text-gray-500"
            }
          >
            <FaCalendarAlt size={18} />
          </NavLink>
        </div>
        <div className="flex gap-2 items-center">
          <img
            alt=""
            src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"
            className="w-8 h-8 rounded-[100%]"
          />
          <p className="font-bold text-gray-500">John</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
