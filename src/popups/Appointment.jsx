import React, { useState } from "react";
import AppointmentCalendar from "./AppointmentCalendar";

const Appointment = ({ setShowAppointment }) => {
  const [appointmentMessage, setAppointmentMessage] = useState("");
  const [appointmentDate, setAppointmentDate] = useState();
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);

  const [dateError, setDateError] = useState(false);
  const [msgError, setMsgError] = useState(false);

  const handleSendAppointment = (e) => {
    e.preventDefault();
    console.log(appointmentMessage);
    console.log(appointmentDate);
    if (
      appointmentDate &&
      appointmentMessage &&
      appointmentDate !== null &&
      appointmentDate !== "" &&
      appointmentMessage !== null &&
      appointmentMessage !== ""
    ) {
      setShowSuccessMsg(true);

      setTimeout(() => {
        setShowAppointment(false);
      }, 2000);
    } else if (!appointmentDate) {
      setDateError(true);
    } else if (!appointmentMessage) {
      setMsgError(true);
    }
  };
  return (
    <div className="absolute -translate-x-2/4 top-[100px] left-2/4 z-20 shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px]  rounded-lg w-[70%]">
      {!showSuccessMsg ? (
        <div className=" rounded-lg p-2 flex items-center justify-center gap-4 flex-col  bg-white">
          <h3 className="font-semibold text-main_color text-xl">
            Take an appointment
          </h3>
          <div className="w-full">
            <div className="flex  flex-col  gap-1 ">
              <h5 className="font-medium text-lg flex-1">
                Choose date of an appointment:
              </h5>
              {/* <input
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
                type="date"
                className="caret-main_color flex-1 cursor-pointer outline-none px-2 py-1 border border-main_color rounded-lg text-gray-600"
              /> */}
              <AppointmentCalendar/>
            </div>
            {dateError && (
              <p className="text-red-600 text-sm px-2">
                Date should not be Empty!
              </p>
            )}
          </div>
          <div className="w-full">
            <div className="flex flex-col gap-1">
              <h5 className="font-medium text-lg flex-1">Write description:</h5>
              <textarea rows={3}
                type="text"
                className="caret-main_color flex-1 cursor-pointer outline-none px-2 py-1 border border-main_color rounded-lg text-gray-600"
                placeholder="Write a description"
                value={appointmentMessage}
                onChange={(e) => setAppointmentMessage(e.target.value)}
              />
            </div>
            {msgError && (
              <p className="text-red-600 text-sm px-2">
                Description should not be Empty!
              </p>
            )}
          </div>
          <div className="w-full flex gap-2">
            <button
              onClick={handleSendAppointment}
              className="border border-main_color bg-white hover:bg-main_color hover:text-white font-semibold text-main_color active:bg-white active:text-main_color duration-150 rounded-lg px-2 py-1"
            >
              Confirm
            </button>
            <button
              onClick={() => setShowAppointment(false)}
              className="border border-main_color bg-white hover:bg-main_color hover:text-white font-semibold text-main_color active:bg-white active:text-main_color duration-150 rounded-lg px-2 py-1"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className=" rounded-lg px-2 py-6 flex items-center justify-center gap-4 flex-col  bg-white">
         

          <h5 className="font-medium text-lg items-center flex-1 text-green-600">
            Your appointment has been recieved successfully
          </h5>
        </div>
      )}
    </div>
  );
};

export default Appointment;
