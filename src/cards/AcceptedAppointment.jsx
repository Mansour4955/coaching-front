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
  const [showCancelAppointment, setShowCancelAppointment] = useState(false);
  const [theMessage, setTheMessage] = useState("");
  const [theMessageError, setTheMessageError] = useState("");

  const currentDate = new Date();
  const targetDateUTC = new Date(date);
  const targetDate = new Date(
    targetDateUTC.getTime() + currentDate.getTimezoneOffset() * 60000
  );
  const differenceInDays = Math.floor(
    (targetDate - currentDate) / (1000 * 60 * 60 * 24)
  );
  const isAheadWithinMaxDifference = differenceInDays >= 1;

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
  const handleCancelAppointment = (e) => {
    e.preventDefault(e);
    if (!theMessage) {
      setTheMessageError("You should write a message!");
    } else {
      axios
        .put(
          `${URL}/api/users/${coachData?._id}?date=${date}&user=${client}&field=appointmentAccepted`
        )
        .then((response) => {
          setLoadingApp(true);
          setTimeout(() => {
            setLoadingApp(false);
          }, 3000);
        })
        .catch((error) => {
          console.log("Error updating user data ", error.response);
        });

      axios
        .put(
          `${URL}/api/users/${client}?date=${date}&user=${coachData?._id}&field=appointmentAcceptedFromCoach`
        )
        .then((response) => {
          setLoadingApp(true);
          setTimeout(() => {
            setLoadingApp(false);
          }, 3000);
        })
        .catch((error) => {
          console.log("Error updating user data ", error.response);
        });

      axios
        .put(`${URL}/api/users/${client}`, {
          clientNotifications: [
            {
              message: theMessage,
              user: coachData?._id,
              date,
              action: "cancel",
            },
          ],
        })
        .then((response) => {
          setLoadingApp(true);
          setTimeout(() => {
            setLoadingApp(false);
          }, 3000);
        })
        .catch((error) => {
          console.log("Error updating user data ", error.response);
        });
      setShowCancelAppointment(false);
    }
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
      className={`${style} relative p-4 flex flex-col gap-3 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-lg`}
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
      <div className="flex items-center w-full justify-between">
        <button
          onClick={handleSendMsgToAnAcceptedClient}
          className=" w-fit px-2 py-[2px] duration-150 flex items-center justify-center bg-white active:bg-white text-main_color active:text-main_color hover:text-white hover:bg-main_color rounded-xl border border-main_color font-semibold"
        >
          Send message
        </button>
        {isAheadWithinMaxDifference && (
          <button
            onClick={() => setShowCancelAppointment(true)}
            className=" w-fit px-2 py-[2px] duration-150 flex items-center justify-center bg-white active:bg-white text-main_color active:text-main_color hover:text-white hover:bg-main_color rounded-xl border border-main_color font-semibold"
          >
            Cancel
          </button>
        )}
      </div>
      {showCancelAppointment && (
        <div className="absolute top-0 left-2/4 -translate-x-2/4 p-4 rounded-lg bg-white">
          <div className=" shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px]  rounded-lg w-[300px] relative p-4">
            <div className=" rounded-lg p-2 flex items-center justify-center flex-col z-20 bg-white">
              <p className="font-semibold text-lg text-main_color">Warning</p>
              <p className="text-gray-600 font-medium">
                Are you sure you want to cancel this appointment!
              </p>
              <div className="flex flex-col gap-1 items-center w-full mt-1">
                <input
                  type="text"
                  className="caret-main_color flex-1 border text-gray-500 font-medium border-main_color w-full rounded-xl px-2 outline-none py-1"
                  placeholder="Write a message"
                  value={theMessage}
                  onChange={(e) => {
                    setTheMessage(e.target.value);
                    setTheMessageError("");
                  }}
                />
                {theMessageError && (
                  <p className="text-red-600 text-sm">{theMessageError}</p>
                )}
              </div>
              <div className="flex justify-center gap-10 mt-2">
                <p
                  onClick={handleCancelAppointment}
                  className="px-2 py-0.5 border border-main_color bg-main_color active:bg-main_color active:text-white hover:bg-white hover:text-main_color text-white duration-100 font-medium cursor-pointer rounded-lg"
                >
                  Delete
                </p>
                <p
                  onClick={() => setShowCancelAppointment(false)}
                  className="px-2 py-0.5 border border-gray-600 bg-gray-600 active:bg-gray-600 active:text-white hover:bg-white hover:text-gray-600 text-white duration-100 font-medium cursor-pointer rounded-lg"
                >
                  Cancel
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AcceptedAppointment;
