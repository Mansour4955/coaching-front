import axios from "axios";
import React, { useEffect, useState } from "react";
import { URL } from "../data";
import useGetImages from "../hooks/useGetImages";
import moment from "moment";
import { useLocalStorage } from "../hooks/useLocalStorege";

const AppointmentOrders = ({
  client,
  date,
  id,
  message,
  loadingApp,
  setLoadingApp,
}) => {
  const { getItem } = useLocalStorage("userData");
  const coachData = getItem();
  const [theClient, setTheClient] = useState(null);
  const handleAcceptAppointment = (e) => {
    e.preventDefault();
    axios
      .put(`${URL}/api/users/${client}`, {
        clientNotifications: [
          {
            user: coachData?._id,
            date,
            action: "accept",
          },
        ],
      })
      .then((response) => {})
      .catch((error) => {
        console.log("Error fetching updating client ", error.response);
      });

    axios
      .put(`${URL}/api/users/${coachData?._id}`, {
        appointmentAccepted: [
          {
            user: client,
            date,
          },
        ],
      })
      .then((response) => {})
      .catch((error) => {
        console.log("Error fetching updating coach ", error.response);
      });

    axios
      .put(`${URL}/api/users/${client}`, {
        appointmentAcceptedFromCoach: [
          {
            user: coachData?._id,
            date,
          },
        ],
      })
      .then((response) => {})
      .catch((error) => {
        console.log("Error fetching updating coach ", error.response);
      });
    axios
      .put(
        `${URL}/api/users/${coachData?._id}?user=${client}&date=${date}&message=${message}&field=appointmentOrders`
      )
      .then((response) => {})
      .catch((error) => {
        console.log("Error fetching updating coach ", error.response);
      });

    axios
      .put(
        `${URL}/api/users/${client}?user=${coachData?._id}&date=${date}&field=appointmentOnWait`
      )
      .then((response) => {})
      .catch((error) => {
        console.log("Error fetching updating coach ", error.response);
      });
  };
  const handleRefuseAppointment = (e) => {
    e.preventDefault();
    axios
      .put(`${URL}/api/users/${client}`, {
        clientNotifications: [
          {
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
        console.log("Error fetching updating client ", error.response);
      });

    axios
      .put(
        `${URL}/api/users/${coachData?._id}?user=${client}&date=${date}&message=${message}&field=appointmentOrders`
      )
      .then((response) => {
        setLoadingApp(true);
        setTimeout(() => {
          setLoadingApp(false);
        }, 3000);
      })
      .catch((error) => {
        console.log("Error fetching updating coach ", error.response);
      });

    axios
      .put(
        `${URL}/api/users/${client}?user=${coachData?._id}&date=${date}&field=appointmentOnWait`
      )
      .then((response) => {
        setLoadingApp(true);
        setTimeout(() => {
          setLoadingApp(false);
        }, 3000);
      })
      .catch((error) => {
        console.log("Error fetching updating coach ", error.response);
      });
  };
  useEffect(() => {
    axios
      .get(`${URL}/api/users/${client}`)
      .then((response) => {
        setTheClient(response.data);
      })
      .catch((error) => {
        console.log("Error fetching client data ", error.response);
      });
  }, [loadingApp]);
  const profileImage = useGetImages(theClient?.profileImage);
  return (
    <div className="flex gap-2 p-2 max-sm:flex-col max-sm:items-center border-t border-t-gray-100">
      <img
        alt=""
        src={profileImage[theClient?.profileImage]}
        className="w-[80px] h-[80px] min-w-[80px] min-h-[80px] rounded-full"
      />
      <div className="flex justify-between items-center  w-full max-sm:flex-col">
        <div className="flex flex-col gap-1 max-sm:items-center">
          <p className="font-semibold">{theClient?.username}</p>
          {/* <p className="font-medium text-sm">{profession}</p>
          <p className="text-gray-500 text-sm overflow-hidden line-clamp-2">
            {education}
          </p> */}
          <p className="font-semibold text-main_color text-sm flex overflow-hidden line-clamp-2 gap-2">
            Message:
            <span className="text-gray-500 text-sm text-center">{message}</span>
          </p>
          <p className="text-base font-semibold text-gray-700">
            {moment(date).fromNow()}
          </p>
        </div>
        <div className="flex gap-2 max-sm:gap-6 max-sm:mt-3">
          <button
            onClick={handleRefuseAppointment}
            className="px-2 py-[2px] duration-150 flex items-center justify-center bg-white active:bg-white text-gray-500 active:text-gray-500 hover:text-white hover:bg-gray-500  rounded-xl border border-gratext-gray-500 font-semibold"
          >
            Refuse
          </button>
          <button
            onClick={handleAcceptAppointment}
            className="px-2 py-[2px] duration-150 flex items-center justify-center bg-white active:bg-white text-main_color active:text-main_color hover:text-white hover:bg-main_color rounded-xl border border-main_color font-semibold"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentOrders;
