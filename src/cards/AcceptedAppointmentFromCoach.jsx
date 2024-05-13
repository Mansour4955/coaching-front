import axios from "axios";
import React, { useEffect, useState } from "react";
import { URL } from "../data";
import useGetImages from "../hooks/useGetImages";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeChat } from "../redux/changeChatConversation";
import { useLocalStorage } from "../hooks/useLocalStorege";

const AcceptedAppointmentFromCoach = ({
  coach,
  style,
  date,
  id,
  loadingApp,
  setLoadingApp,
}) => {
  const [theCoach, setTheCoach] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { getItem } = useLocalStorage("Authorization");
  const token = getItem();
  const { getItem: getClientData } = useLocalStorage("userData");
  const clientData = getClientData();
  const handleSendMsgToAnAcceptedClient = (e) => {
    e.preventDefault(e);

    axios
      .post(
        `${URL}/api/chats`,
        {
          users: [coach, clientData?._id],
        },
        {
          headers: { Authorization: token },
        }
      )
      .then((response) => {
        dispatch(changeChat(response.data));
        navigate("/chat");
        setLoadingApp(true);
        setTimeout(() => {
          setLoadingApp(false);
        }, 3000);
      })
      .catch((error) => {
        console.log("Error creating chat ", error.response.data.status);
        navigate("/chat");
        setLoadingApp(true);
        setTimeout(() => {
          setLoadingApp(false);
        }, 3000);
      });
  };
  useEffect(() => {
    axios
      .get(`${URL}/api/users/${coach}`)
      .then((response) => {
        setTheCoach(response.data);
      })
      .catch((error) => {
        console.log("Error fetching coach data ", error.response);
      });
  }, [loadingApp]);
  const imageOfCoach = useGetImages(theCoach?.profileImage);
  return (
    <div
      className={`${style} p-4 flex flex-col gap-3 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-lg`}
    >
      <div className="flex flex-col gap-2 items-center">
        <img
          alt=""
          src={imageOfCoach[theCoach?.profileImage]}
          className="w-[80px] h-[80px] min-w-[80px] min-h-[80px] rounded-full"
        />
        <p className="font-semibold">{theCoach?.username}</p>
      </div>
      <div className="flex flex-col gap-1">
        <p className="font-medium overflow-hidden line-clamp-1">
          {theCoach?.profession}{" "}
          <span className="text-sm font-normal text-gray-500 ">
            {theCoach?.education}
          </span>
        </p>
        <p className="text-gray-700 text-base font-semibold flex items-center justify-between">
          {moment(date).fromNow()}
        </p>
      </div>
      <button
        onClick={handleSendMsgToAnAcceptedClient}
        className=" w-fit px-2 py-[2px] duration-150 flex items-center justify-center bg-white active:bg-white text-main_color active:text-main_color hover:text-white hover:bg-main_color rounded-xl border border-main_color font-semibold"
      >
        Send message
      </button>
    </div>
  );
};

export default AcceptedAppointmentFromCoach;
