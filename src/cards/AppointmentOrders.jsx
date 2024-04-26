import React from "react";

const AppointmentOrders = ({
  profileImage,
  name,
  profession,
  education,
  date,
  hour,
  id,
  message,
}) => {
  const handleAcceptAppointment = (e) => {
    e.preventDefault();
    console.log("Congratilation your appointment has been accepted! ", id);
  };
  const handleRefuseAppointment = (e) => {
    e.preventDefault();
    console.log("Sorry your appointment has been refused! ", id);
  };
  return (
    <div className="flex gap-2 p-2 max-sm:flex-col max-sm:items-center border-t border-t-gray-100">
      <img
        alt=""
        src={profileImage}
        className="w-[80px] h-[80px] min-w-[80px] min-h-[80px] rounded-full"
      />
      <div className="flex justify-between items-center  w-full max-sm:flex-col">
        <div className="flex flex-col gap-1 max-sm:items-center">
          <p className="font-semibold">{name}</p>
          <p className="font-medium text-sm">{profession}</p>
          <p className="text-gray-500 text-sm overflow-hidden line-clamp-2">
            {education}
          </p>
          <p className="font-semibold text-main_color text-sm flex overflow-hidden line-clamp-2 gap-2">
            Message:
            <span className="text-gray-500 text-sm text-center">{message}</span>
          </p>
          <p className="text-sm text-gray-700">
            {date} <span className="text-base font-semibold">{hour}</span>
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
