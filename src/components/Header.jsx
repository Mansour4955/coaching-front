import React, { useState } from "react";
import { MdHome } from "react-icons/md";
import { HiMiniChatBubbleLeftRight } from "react-icons/hi2";
import { FaCalendarAlt, FaChalkboardTeacher } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  IoFilterCircleOutline,
  IoFilterCircle,
  IoNotifications,
  IoSearchOutline,
} from "react-icons/io5";
import { courses, cities, methods } from "../data";
const Header = () => {
  const navigate = useNavigate();
  const isLoggedIn = true;
  const [showFilter, setShowFilter] = useState(false);
  const [selectedcourse, setSelectedcourse] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("");
  const [filterByName, setFilterByName] = useState("");
  const [maxPrice, setMaxPrice] = useState(1000);
  const handleFilter = (e) => {
    e.preventDefault();
    navigate("/coachCards");
    setShowFilter(false);
    console.log(selectedcourse);
    console.log(selectedCity);
    console.log(selectedMethod);
    console.log(filterByName);
    console.log(maxPrice);
  };
  const handleFilterBySearch = (e) => {
    e.preventDefault();
    navigate("/coachCards");
    setShowFilter(false);
    console.log(filterByName);
  };
  return (
    <div className="fixed right-0 left-0 top-0 z-50 bg-white px-4 py-3 shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)] flex justify-between items-center">
      <div className="flex gap-2 items-center">
        <Link to="/">
          <img
            alt="logo"
            src="https://images.pexels.com/photos/3689532/pexels-photo-3689532.jpeg"
            className="w-[30px] h-[30px] rounded-full"
          />
        </Link>
        <div className="flex gap-2">
          <div className="flex max-md:hidden">
            <input
              type="text"
              className="caret-main_color border text-gray-500 font-medium  border-r-0 border-main_color rounded-l-xl px-2 outline-none py-1"
              placeholder="Search"
              value={filterByName}
              onChange={(e) => setFilterByName(e.target.value)}
            />
            <div
              onClick={handleFilterBySearch}
              className="flex items-center justify-center rounded-r-xl border border-main_color border-l-0 px-2 py-1 text-main_color font-bold cursor-pointer hover:bg-white_color duration-300"
            >
              <IoSearchOutline size={20} />
            </div>
          </div>
          <div className="flex relative">
            <p
              className="flex items-center duration-150 cursor-pointer text-main_color"
              onClick={() => setShowFilter(!showFilter)}
            >
              {!showFilter ? (
                <IoFilterCircleOutline size={24} />
              ) : (
                <IoFilterCircle size={24} />
              )}
            </p>
            {showFilter && (
              <div className=" absolute top-[100%] max-md:left-0 max-md:-translate-x-0 left-2/4 -translate-x-2/4 z-40 bg-white rounded-lg p-4">
                <div className="flex flex-col gap-2 p-4 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-lg">
                  <div className="flex flex-col">
                    <label className="text-main_color text-xs ml-1">
                      Filter by course
                    </label>
                    <select
                      onChange={(e) => setSelectedcourse(e.target.value)}
                      className="outline-none"
                    >
                      <option className="outline-none" selected disabled>
                        Choose a course
                      </option>
                      {courses.map((course) => (
                        <option className="outline-none" key={course.id}>
                          {course.course}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col">
                    <label className="text-main_color text-xs ml-1">
                      Filter by city
                    </label>
                    <select
                      onChange={(e) => setSelectedCity(e.target.value)}
                      className="outline-none"
                    >
                      <option className="outline-none" selected disabled>
                        Choose a city
                      </option>
                      {cities.map((city) => (
                        <option className="outline-none" key={city.id}>
                          {city.city}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col">
                    <label className="text-main_color text-xs ml-1">
                      Filter by method
                    </label>
                    <select
                      onChange={(e) => setSelectedMethod(e.target.value)}
                      className="outline-none"
                    >
                      <option className="outline-none" selected disabled>
                        Choose a method
                      </option>
                      {methods.map((method) => (
                        <option className="outline-none" key={method.id}>
                          {method.meetingType}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col">
                    <label className="text-main_color text-xs ml-1">
                      Filter by max price
                    </label>
                    <input
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      type="number"
                      placeholder="Max price"
                      className="rounded-md outline-none border border-main_color px-1 caret-main_color"
                    />
                  </div>
                  <button
                    onClick={handleFilter}
                    className="flex items-center justify-center px-2 border border-main_color rounded-xl font-semibold text-main_color duration-300 hover:bg-main_color hover:text-white"
                  >
                    Filter
                  </button>
                </div>
              </div>
            )}
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
            to="/coachCards"
            className={({ isActive }) =>
              isActive ? "text-main_color" : "text-gray-500"
            }
          >
            <FaChalkboardTeacher size={19} />
          </NavLink>

          {isLoggedIn && (
            <div className="flex gap-5 items-center">
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
                <IoNotifications size={19} />
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
          )}
        </div>
        {isLoggedIn ? (
          <Link to="/myprofile" className="flex gap-2 items-center">
            <img
              alt=""
              src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"
              className="w-8 h-8 rounded-[100%]"
            />
            <p className="font-bold text-gray-500">John</p>
          </Link>
        ) : (
          <div className="flex items-center gap-2">
            <Link
              to="/register"
              className="px-2 py-[2px] duration-150 flex items-center justify-center hover:bg-white active:bg-main_color hover:text-main_color active:text-white text-white bg-main_color rounded-xl border border-main_color font-semibold"
            >
              Register
            </Link>
            <Link
              to="/login"
              className="px-2 py-[2px] duration-150 flex items-center justify-center hover:bg-white active:bg-main_color hover:text-main_color active:text-white text-white bg-main_color rounded-xl border border-main_color font-semibold"
            >
              Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
