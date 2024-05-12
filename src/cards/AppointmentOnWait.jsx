import axios from "axios";
import React, { useEffect, useState } from "react";
import { URL } from "../data";
import useGetImages from "../hooks/useGetImages";
import moment from "moment";
import { useLocalStorage } from "../hooks/useLocalStorege";
const AppointmentOnWait = ({ date, id, coach }) => {
  const { getItem } = useLocalStorage("userData");
  const theAccountOwner = getItem();
  const [theCoach, setTheCoach] = useState(null);
  useEffect(() => {
    axios
      .get(`${URL}/api/users/${coach}`)
      .then((response) => {
        setTheCoach(response.data);
      })
      .catch((error) => {
        console.log("Error fetching coach data ", error.response);
      });
  }, []);
  const profileImage = useGetImages(theCoach?.profileImage);
  const handleRefuseAppointment = (e) => {
    e.preventDefault();
    axios
      .put(`${URL}/api/users/${coach}`, {
        coachNotifications: [
          {
            user: theAccountOwner?._id,
            date,
            action: "cancel",
          },
        ],
      })
      .then((response) => {})
      .catch((error) => {
        console.log("Error fetching updating coach ", error.response);
      });

    axios
      .put(
        `${URL}/api/users/${coach}?user=${theAccountOwner?._id}&date=${date}&field=appointmentOrders`
      )
      .then((response) => {})
      .catch((error) => {
        console.log("Error fetching updating coach ", error.response);
      });

    axios
      .put(
        `${URL}/api/users/${theAccountOwner?._id}?user=${coach}&date=${date}&field=appointmentOnWait`
      )
      .then((response) => {})
      .catch((error) => {
        console.log("Error fetching updating coach ", error.response);
      });
  };
  return (
    <div className="flex gap-2 p-2 max-sm:flex-col max-sm:items-center border-t border-t-gray-100">
      <img
        alt=""
        src={profileImage[theCoach?.profileImage]}
        className="w-[80px] h-[80px] min-w-[80px] min-h-[80px] rounded-full"
      />
      <div className="flex justify-between items-center  w-full max-sm:flex-col">
        <div className="flex flex-col gap-1 max-sm:items-center">
          <p className="font-semibold">{theCoach?.username}</p>
          <p className="font-medium text-sm">{theCoach?.profession}</p>
          <p className="text-gray-500 text-sm overflow-hidden line-clamp-2">
            {theCoach?.education}
          </p>
          <p className=" text-base font-semibold text-gray-700">
            {moment(date).fromNow()}
          </p>
        </div>
        <div className="flex gap-2 max-sm:gap-6 max-sm:mt-3">
          <button
            onClick={handleRefuseAppointment}
            className="px-2 py-[2px] duration-150 flex items-center justify-center bg-white active:bg-white text-gray-500 active:text-gray-500 hover:text-white hover:bg-gray-500  rounded-xl border border-gratext-gray-500 font-semibold"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentOnWait;
