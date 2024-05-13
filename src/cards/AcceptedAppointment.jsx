import axios from "axios";
import React, { useEffect, useState } from "react";
import { URL } from "../data";
import moment from "moment";
import useGetImages from "../hooks/useGetImages";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLocalStorage } from "../hooks/useLocalStorege";
import { changeChat } from "../redux/changeChatConversation";

const AcceptedAppointment = ({
  client,
  date,
  id,
  style,
  loadingApp,
  setLoadingApp,
}) => {
  const { getItem } = useLocalStorage("Authorization");
  const { getItem: getCoachData } = useLocalStorage("userData");
  const coachData = getCoachData();
  const token = getItem();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [theClient, setTheClient] = useState(null);
  const handleSendMsgToAnAcceptedClient = (e) => {
    e.preventDefault(e);
    axios
      .post(
        `${URL}/api/chats`,
        {
          users: [client, coachData?._id],
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
      });
  };
  useEffect(() => {
    axios
      .get(`${URL}/api/users/${client}`)
      .then((response) => {
        setTheClient(response.data);
        setLoadingApp(true);
        setTimeout(() => {
          setLoadingApp(false);
        }, 3000);
      })
      .catch((error) => {
        console.log("Error fetching client data ", error.response);
      });
  }, [loadingApp]);
  const imageOfClient = useGetImages(theClient?.profileImage);
  return (
    <div
      className={`${style} p-4 flex flex-col gap-3 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-lg`}
    >
      <div className="flex flex-col gap-2 items-center">
        <img
          alt=""
          src={imageOfClient[theClient?.profileImage]}
          className="w-[80px] h-[80px] min-w-[80px] min-h-[80px] rounded-full"
        />
        <p className="font-semibold">{theClient?.username}</p>
      </div>
      <div className="flex flex-col gap-1">
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

export default AcceptedAppointment;
