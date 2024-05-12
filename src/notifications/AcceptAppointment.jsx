import React, { useEffect, useState } from "react";
import { URL } from "../data";
import axios from "axios";
import moment from "moment";

const CancelAppointment = ({ date, id, coach }) => {
  const [theUser, setTheUser] = useState(null);
  useEffect(() => {
    axios
      .get(`${URL}/api/users/${coach}`)
      .then((response) => {
        setTheUser(response.data);
      })
      .catch((error) => {
        console.log("Error fetching coach data ", error.response);
      });
  }, []);
  const imageOfUser = useGetImages(theUser?.profileImage);
  return (
    <div className="flex gap-2 p-2 max-sm:flex-col max-sm:items-center border-b border-b-gray-100">
      <img
        alt=""
        src={imageOfUser[theUser?.profileImage]}
        className="w-[60px] h-[60px] min-w-[60px] min-h-[60px] rounded-full"
      />
      <div className="flex items-center  w-full max-sm:flex-col">
        <div className="flex flex-col gap-1 max-sm:items-center">
          <p className="font-semibold flex items-center gap-2">
            {theUser?.username}
            <span className="font-medium text-main_color text-sm">
              ({theUser?.profession})
            </span>
          </p>
          <p className="text-base font-semibold text-green-500">
            has accepted the appointment which was {moment(date).fromNow()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CancelAppointment;
