import React from "react";
import { logOut } from "../redux/authSlice";
import { useDispatch } from "react-redux";
import { useLocalStorage } from "../hooks/useLocalStorege";
import { useNavigate } from "react-router-dom";
const LoggedOutUser = () => {
  const navigate = useNavigate();
  const { removeItem } = useLocalStorage("Authorization");
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logOut());
    removeItem();
    navigate("/");
  };
  return (
    <div className="p-4 bg-white rounded-lg z-[29] min-w-[200px]">
      <div className=" rounded-lg flex items-center justify-center flex-col z-20 bg-white p-4 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
        <p className="font-semibold text-lg text-main_color max-lg:text-base">
          Warning
        </p>
        <p className="text-gray-600 font-medium text-center max-lg:text-sm">
          Are you sure you want to logout!
        </p>
        <div className="flex justify-center gap-10 mt-2">
          <p
            onClick={handleLogout}
            className="max-lg:text-sm px-2 py-0.5 border border-main_color bg-main_color active:bg-main_color active:text-white hover:bg-white hover:text-main_color text-white duration-100 font-medium cursor-pointer rounded-lg"
          >
            Logout
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoggedOutUser;
