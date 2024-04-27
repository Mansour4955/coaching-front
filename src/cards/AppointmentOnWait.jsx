import React from "react";

const AppointmentOnWait = ({
  profileImage,
  name,
  profession,
  education,
  date,
  id,
}) => {

  const handleRefuseAppointment = (e) => {
    e.preventDefault();
    console.log("Sorry I canceled my appointment! ", id);
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
          <p className=" text-base font-semibold text-gray-700">
            {date} 
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
