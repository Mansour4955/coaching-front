import React from "react";

const AcceptedAppointment = ({
  profileImage,
  name,
  profession,
  education,
  style,
  date,
  hour,
  id,
}) => {
  const handleSendMsgToAnAcceptedClient=(e)=>{
    e.preventDefault(e)
    console.log("Sending msg to an accepted client! ",id);
  }
  return (
    <div
      className={`${style} p-4 flex flex-col gap-3 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-lg`}
    >
      <div className="flex flex-col gap-2 items-center">
        <img
          alt=""
          src={profileImage}
          className="w-[80px] h-[80px] min-w-[80px] min-h-[80px] rounded-full"
        />
        <p className="font-semibold">{name}</p>
      </div>
      <div className="flex flex-col gap-1">
        <p className="font-medium overflow-hidden line-clamp-1">
          {profession}{" "}
          <span className="text-sm font-normal text-gray-500 ">
            {education}
          </span>
        </p>
        <p className="text-gray-700 text-sm flex items-center justify-between">
          {date} <span className="text-base font-semibold">{hour}</span>
        </p>
      </div>
      <button onClick={handleSendMsgToAnAcceptedClient} className=" w-fit px-2 py-[2px] duration-150 flex items-center justify-center bg-white active:bg-white text-main_color active:text-main_color hover:text-white hover:bg-main_color rounded-xl border border-main_color font-semibold">
        Send message
      </button>
    </div>
  );
};

export default AcceptedAppointment;
