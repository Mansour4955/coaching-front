import React from "react";

const CancelAppointment = ({
  profileImage,
  name,
  profession,
  date,
  id,
}) => {
  return (
    <div className="flex gap-2 p-2 max-sm:flex-col max-sm:items-center border-b border-b-gray-100">
      <img
        alt=""
        src={profileImage}
        className="w-[60px] h-[60px] min-w-[60px] min-h-[60px] rounded-full"
      />
      <div className="flex items-center  w-full max-sm:flex-col">
        <div className="flex flex-col gap-1 max-sm:items-center">
          <p className="font-semibold flex items-center gap-2">
            {name}
            <span className="font-medium text-main_color text-sm">
              ({profession})
            </span>
          </p>
          <p className="text-base font-semibold text-gray-500">
            has accepted the appointment which was on {date}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CancelAppointment;
