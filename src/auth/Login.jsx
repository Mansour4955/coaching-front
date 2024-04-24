import React, { useEffect, useState } from "react";
import { courses, cities, methods } from "../data";
import { IoIosSend } from "react-icons/io";
import { Link } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState(""); //
  const [password, setPassword] = useState(); //

  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const handleSubmitForm = (e) => {
    e.preventDefault();
    console.log("clicked");
    if (email && email.length >= 8 && password && password.length >= 8) {
      console.log("login");
      setEmail("");
      setPassword("");
    } else {
      //email
      if (!email) {
        setErrorEmail("Email is required");
      } else if (email.length < 8) {
        setErrorEmail("Invalid email");
      }
      //password
      if (!password) {
        setErrorPassword("Password is required");
      } else if (password.length < 8) {
        setErrorPassword("Invalid password");
      }
    }
  };
  return (
    <div className="flex justify-center mb-10  gap-x-10 pt-5 px-4 bg-white_color ">
      <div className="w-[70%] flex flex-col gap-10 max-lg:w-[80%] max-md:w-[90%] max-sm:w-[95%]">
        <div className="flex justify-center p-4 bg-white">
          <div className="min-h-[70vh] w-full flex flex-col gap-10 items-center justify-center p-4 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-lg">
            <div className="flex flex-col gap-6">
              <h2 className="text-2xl text-main_color font-semibold">Login:</h2>
              <form
                onSubmit={handleSubmitForm}
                className="flex flex-col gap-2 w-[500px] max-md:w-[450px] max-sm:w-[350px]"
              >
                <label className="flex flex-col w-full">
                  <span className="font-semibold ml-1">Your email</span>
                  <input
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setErrorEmail("");
                    }}
                    type="email"
                    placeholder="Write Email"
                    className="caret-main_color px-2 py-2 flex items-center justify-center rounded-xl outline-none border w-full border-main_color"
                  />
                  {errorEmail && (
                    <p className="text-red-600 text-sm ml-1">{errorEmail}</p>
                  )}
                </label>
                <label className="flex flex-col w-full">
                  <span className="font-semibold ml-1">Your password</span>
                  <input
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setErrorPassword("");
                    }}
                    type="password"
                    placeholder="Write password"
                    className="caret-main_color px-2 py-2 flex items-center justify-center rounded-xl outline-none border w-full border-main_color"
                  />
                  {errorPassword && (
                    <p className="text-red-600 text-sm ml-1">{errorPassword}</p>
                  )}
                </label>

                <p className="text-sm ml-1 text-gray-700">
                  if you are not registered yet {""}
                  <Link
                    to="/register"
                    className="font-semibold cursor-pointer text-main_color underline-offset-2 underline"
                  >
                    click here
                  </Link>{" "}
                  to register
                </p>
                <button
                  type="submit"
                  className="px-2 py-2 bg-main_color text-white font-medium rounded-lg text-sm capitalize cursor-pointer w-[100px] flex items-center justify-center hover:text-main_color hover:bg-white duration-200 border hover:border-main_color active:bg-main_color active:text-white max-md:text-xs  max-md:w-[90px]"
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
