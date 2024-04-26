import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-white  px-4 pt-4 pb-8 items-center justify-center w-full flex flex-col gap-5">
      <p className="text-base font-semibold text-main_color text-center">
        In our website you will find services which gonna benefit you a lot
      </p>
      <div className="flex gap-3 flex-wrap font-semibold justify-center">
        <Link className="border-b border-b-transparent hover:border-b-main_color duration-150 hover:text-main_color" to="/">Home</Link>
        <Link className="border-b border-b-transparent hover:border-b-main_color duration-150 hover:text-main_color" to="/chat">Chat</Link>
        <Link className="border-b border-b-transparent hover:border-b-main_color duration-150 hover:text-main_color" to="/coachCards">Coach Cards</Link>
        <Link className="border-b border-b-transparent hover:border-b-main_color duration-150 hover:text-main_color" to="/myprofile">my Profile</Link>
        <Link className="border-b border-b-transparent hover:border-b-main_color duration-150 hover:text-main_color" to="/rendez-vous">Appointment</Link>
      </div>
      <p className="font-semibold"><span className="text-main_color ">© 2024</span> All rights reserved</p>
    </div>
  );
};

export default Footer;
