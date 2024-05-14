import React, { useState } from "react";
import useGetImages from "../hooks/useGetImages";
import { useLocalStorage } from "../hooks/useLocalStorege";
import axios from "axios";
import { URL } from "../data";

const CoachCard = ({
  full_name,
  description,
  profilePhoto,
  domaine,
  id: coachProfileId,
}) => {
  const [catchError, setCatchError] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const { getItem } = useLocalStorage("userData");
  const reviewer = getItem();
  const handleFollow = () => {
    console.log("Follow");
    axios
      .put(`${URL}/api/users/${coachProfileId}`, {
        follow: [reviewer?._id],
      })
      .then((response) => {})
      .catch((error) => {
        setCatchError(error);
        console.log("Error following coach ", error.response);
      });
    axios
      .put(`${URL}/api/users/${reviewer?._id}`, {
        following: [coachProfileId],
      })
      .then((response) => {})
      .catch((error) => {
        setCatchError(error);
        console.log("Error following coach ", error.response);
      });

    if (!catchError) {
      axios
        .put(`${URL}/api/users/${coachProfileId}`, {
          coachNotifications: [
            {
              user: reviewer?._id,
              date: new Date().toISOString(),
              action: "follow",
            },
          ],
        })
        .then((response) => {})
        .catch((error) => {
          console.log("Error following coach ", error.response);
        });
    } else {
      console.log("can not put them in coach notifications");
    }
  };

  const hide = "overflow-hidden line-clamp-1";
  const imageOfCoach = useGetImages(profilePhoto);
  return (
    <div className="bg-white w-full flex p-2 gap-2 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-lg">
      <img
        className="w-[50px] h-[50px] min-w-[50px] min-h-[50px] rounded-full"
        alt={profilePhoto}
        src={imageOfCoach[profilePhoto]}
      />
      <div className="px-2 w-full">
        <p className="font-bold text-base">{full_name}</p>
        <p className="font-semibold text-sm">{domaine}</p>
        <div className="w-full">
          <p className={`text-gray-500  ${!showMore ? hide : ""}`}>
            {description}
          </p>
          <div className="flex w-full items-center justify-between mt-1">
            <button
              onClick={() => setShowMore(!showMore)}
              className="text-main_color text-sm"
            >
              {showMore ? "See less" : "See more"}
            </button>
            <button
              onClick={handleFollow}
              className="flex items-center justify-center px-2 border border-main_color rounded-xl font-semibold text-main_color duration-300 hover:bg-main_color hover:text-white"
            >
              <span className="text-xl">+</span> Follow
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoachCard;
