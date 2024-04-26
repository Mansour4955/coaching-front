import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const AppointmentCalendar = ({
  setAppointmentDate,
  appointmentDate,
  setDateError,
}) => {
  return (
    <div>
      <h2>Choose Appointment Date and Time</h2>
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
      />
    </div>
  );
};

export default AppointmentCalendar;

// import React, { useState, useEffect } from 'react';

// const AppointmentCalendar = () => {
//   const [currentWeek, setCurrentWeek] = useState([]);
//   const [nextWeek, setNextWeek] = useState([]);
//   const [selectedHoursCurrentWeek, setSelectedHoursCurrentWeek] = useState(Array(7).fill([]));
//   const [selectedHoursNextWeek, setSelectedHoursNextWeek] = useState(Array(7).fill([]));

//   useEffect(() => {
//     updateWeeks();
//   }, []);

//   const updateWeeks = () => {
//     const today = new Date();
//     const currentMonday = new Date(today);
//     currentMonday.setDate(today.getDate() + ((1 - today.getDay()) % 7)); // Get Monday of this week

//     const nextMonday = new Date(currentMonday);
//     nextMonday.setDate(currentMonday.getDate() + 7); // Get Monday of next week

//     const current = generateWeek(currentMonday);
//     setCurrentWeek(current);

//     const next = generateWeek(nextMonday);
//     setNextWeek(next);
//   };

//   const generateWeek = (startDate) => {
//     const days = [];
//     for (let i = 0; i < 7; i++) {
//       const date = new Date(startDate);
//       date.setDate(startDate.getDate() + i);
//       const hours = [];
//       for (let j = 9; j <= 23; j++) {
//         hours.push(`${j < 10 ? '0' : ''}${j}:00`);
//       }
//       days.push({ date: date.toDateString(), hours });
//     }
//     return days;
//   };

//   const handleHourSelection = (dayIndex, hour, weekType) => {
//     if (weekType === 'current') {
//       const updatedWeek = [...selectedHoursCurrentWeek];
//       if (!updatedWeek[dayIndex]) {
//         updatedWeek[dayIndex] = [];
//       }
//       if (!updatedWeek[dayIndex].includes(hour)) {
//         updatedWeek[dayIndex].push(hour);
//         setSelectedHoursCurrentWeek(updatedWeek);
//       }
//     } else if (weekType === 'next') {
//       const updatedWeek = [...selectedHoursNextWeek];
//       if (!updatedWeek[dayIndex]) {
//         updatedWeek[dayIndex] = [];
//       }
//       if (!updatedWeek[dayIndex].includes(hour)) {
//         updatedWeek[dayIndex].push(hour);
//         setSelectedHoursNextWeek(updatedWeek);
//       }
//     }
//   };

//   const handleSubmitAvailability = () => {
//     console.log("Selected Hours for Current Week:", selectedHoursCurrentWeek);
//     console.log("Selected Hours for Next Week:", selectedHoursNextWeek);
//     alert('Availability set successfully!');
//     setSelectedHoursCurrentWeek(Array(7).fill([]));
//     setSelectedHoursNextWeek(Array(7).fill([]));
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-2xl font-bold mb-4">Set Your Availability</h1>
//       <div className="border-b-2 border-gray-300">
//         <div className="flex flex-col md:flex-row gap-8">
//           <div className="w-full md:w-1/2 pb-4">
//             <h2 className="text-lg font-semibold mb-2">Current Week</h2>
//             <div className="grid grid-cols-2 gap-4">
//               {currentWeek.map((day, dayIndex) => (
//                 <div key={dayIndex}>
//                   <div className="font-semibold mb-2">{day.date}</div>
//                   {day.hours.map((hour, hourIndex) => (
//                     <div
//                       key={hourIndex}
//                       className={`py-2 px-4 border rounded cursor-pointer ${
//                         selectedHoursCurrentWeek[dayIndex] &&
//                         selectedHoursCurrentWeek[dayIndex].includes(hour)
//                           ? 'bg-gray-300'
//                           : ''
//                       }`}
//                       onClick={() => handleHourSelection(dayIndex, hour, 'current')}
//                     >
//                       {hour}
//                     </div>
//                   ))}
//                 </div>
//               ))}
//             </div>
//           </div>
//           <div className="w-full md:w-1/2 pb-4">
//             <h2 className="text-lg font-semibold mb-2">Next Week</h2>
//             <div className="grid grid-cols-2 gap-4">
//               {nextWeek.map((day, dayIndex) => (
//                 <div key={dayIndex}>
//                   <div className="font-semibold mb-2">{day.date}</div>
//                   {day.hours.map((hour, hourIndex) => (
//                     <div
//                       key={hourIndex}
//                       className={`py-2 px-4 border rounded cursor-pointer ${
//                         selectedHoursNextWeek[dayIndex] &&
//                         selectedHoursNextWeek[dayIndex].includes(hour)
//                           ? 'bg-gray-300'
//                           : ''
//                       }`}
//                       onClick={() => handleHourSelection(dayIndex, hour, 'next')}
//                     >
//                       {hour}
//                     </div>
//                   ))}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//       <button
//         className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//         onClick={handleSubmitAvailability}
//       >
//         Set Availability
//       </button>
//     </div>
//   );
// };

// export default AppointmentCalendar;
