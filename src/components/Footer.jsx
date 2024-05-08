import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorege";
const Footer = () => {
  const { getItem } = useLocalStorage("Authorization");
  const { getItem: getUserData } = useLocalStorage("userData");
  // const { user } = useSelector((state) => state.auth);
  const token = getItem();
  const isLoggedIn = token ? true : false;
  const user = getUserData();
  return (
    <div className="bg-white  px-4 pt-4 pb-8 items-center justify-center w-full flex flex-col gap-5">
      <p className="text-base font-semibold text-main_color text-center">
        In our website you will find services which gonna benefit you a lot
      </p>
      <div className="flex gap-3 flex-wrap font-semibold justify-center">
        <Link
          className="border-b border-b-transparent hover:border-b-main_color duration-150 hover:text-main_color"
          to="/"
        >
          Home
        </Link>
        <Link
          className="border-b border-b-transparent hover:border-b-main_color duration-150 hover:text-main_color"
          to="/coachCards"
        >
          Coach Cards
        </Link>
        {isLoggedIn && (
          <div className="flex gap-3 justify-center font-semibold flex-wrap">
            <Link
              className="border-b border-b-transparent hover:border-b-main_color duration-150 hover:text-main_color"
              to="/chat"
            >
              Chat
            </Link>
            <Link
              className="border-b border-b-transparent hover:border-b-main_color duration-150 hover:text-main_color"
              to="/notification"
            >
              Notification
            </Link>
            {user.role === "coach" && (
              <Link
                className="border-b border-b-transparent hover:border-b-main_color duration-150 hover:text-main_color"
                to="/myprofile"
              >
                my Profile
              </Link>
            )}
            <Link
              className="border-b border-b-transparent hover:border-b-main_color duration-150 hover:text-main_color"
              to="/rendez-vous"
            >
              Appointment
            </Link>
          </div>
        )}
      </div>
      <p className="font-semibold">
        <span className="text-main_color ">© 2024</span> All rights reserved
      </p>
    </div>
  );
};

export default Footer;
