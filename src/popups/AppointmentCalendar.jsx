import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AppointmentCalendar = ({
  setAppointmentDate,
  appointmentDate,
  setDateError,
  availableTimes,
}) => {
  const [bookedTimes, setBookedTimes] = useState([]);

  const fetchBookedTimes = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(["10:00 AM", "1:00 PM"]);
      }, 1000);
    });
  };

  useState(() => {
    fetchBookedTimes().then((times) => {
      setBookedTimes(times);
    });
  }, []);

  const isTimeAvailable = (time) => {
    return availableTimes.includes(time);
  };

  const isTimeBooked = (time) => {
    return bookedTimes.includes(time);
  };

  const handleTimeClick = (time) => {
    if (isTimeAvailable(time)) {
      setAppointmentDate(time);
      setDateError("");
    }
  };

  const filterAvailableTimes = (time) => {
    const isAvailable = isTimeAvailable(time);
    const isBooked = isTimeBooked(time);

    let className = "text-black";

    if (!isAvailable) {
      className = "text-gray-500 cursor-not-allowed";
    } else if (isBooked) {
      className = "text-main_color cursor-not-allowed";
    }

    return (
      <div className="time-slot">
        <button
          className={`time-button ${className}`}
          disabled={!isAvailable || isBooked}
          onClick={() => handleTimeClick(time)}
        >
          {time}
        </button>
      </div>
    );
  };

  return (
    <div className="w-full flex justify-center">
      <div className="max-w-[400px]">
        <DatePicker
          selected={appointmentDate}
          onChange={(date) => {
            setAppointmentDate(date);
            setDateError("");
          }}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          dateFormat="MMMM d, yyyy h:mm aa"
          minDate={new Date()}
          inline
          renderTime={filterAvailableTimes} // Customize appearance and behavior of time slots
        />
      </div>
    </div>
  );
};

export default AppointmentCalendar;
