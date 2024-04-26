import { useState } from "react";
import { appointmentOrders, appointmentOnWait } from "../data";
import AppointmentOrders from "../cards/AppointmentOrders";
import AcceptedAppointment from "../cards/AcceptedAppointment";
import AppointmentOnWait from "../cards/AppointmentOnWait";
import AcceptedAppointmentFromCoach from "../cards/AcceptedAppointmentFromCoach";
const AppointmentPage = () => {
  const appointmentClientContent = false;
  const [showAllAppointmentOrders, setShowAllAppointmentOrders] =
    useState(false);
  const [showAllAppointmentsOnWait, setShowAllAppointmentsOnWait] =
    useState(false);
  return (
    <div className="flex justify-center mb-10 gap-x-10 pt-5 px-4 bg-white_color">
      <div className="w-[70%] max-xl:w-[80%] max-lg:w-[90%] max-md:w-[95%] flex flex-col gap-6 min-h-[70vh]">
        <div className="flex justify-center p-4 bg-white">
          <div className="w-full p-4 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-lg">
            {!appointmentClientContent ? (
              <div className="flex flex-col">
                <div className="w-full flex justify-between items-center p-2">
                  <h3 className="font-semibold">Appintments</h3>

                  {appointmentOrders.length > 3 ? (
                    !showAllAppointmentOrders ? (
                      <p
                        onClick={() => setShowAllAppointmentOrders(true)}
                        className="font-medium cursor-pointer"
                      >
                        See all <span>{appointmentOrders.length}</span>
                      </p>
                    ) : (
                      <p
                        onClick={() => setShowAllAppointmentOrders(false)}
                        className="font-medium cursor-pointer"
                      >
                        See only <span>3</span>
                      </p>
                    )
                  ) : (
                    <p className="font-medium">
                      You have only <span>{appointmentOrders.length}</span>
                    </p>
                  )}
                </div>
                <div className="w-full flex flex-col">
                  {showAllAppointmentOrders
                    ? appointmentOrders.map((order, index) => (
                        <AppointmentOrders
                          date={order.date}
                          hour={order.hour}
                          id={index}
                          key={index}
                          profileImage={order.profileImage}
                          profession={order.profession}
                          name={order.name}
                          education={order.education}
                          message={order.message}
                        />
                      ))
                    : appointmentOrders
                        .slice(0, 3)
                        .map((order, index) => (
                          <AppointmentOrders
                            date={order.date}
                            hour={order.hour}
                            id={index}
                            key={index}
                            profileImage={order.profileImage}
                            profession={order.profession}
                            name={order.name}
                            education={order.education}
                            message={order.message}
                          />
                        ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col">
                <div className="w-full flex justify-between items-center p-2">
                  <h3 className="font-semibold">Your appintments on wait</h3>

                  {appointmentOnWait.length > 3 ? (
                    !showAllAppointmentsOnWait ? (
                      <p
                        onClick={() => setShowAllAppointmentsOnWait(true)}
                        className="font-medium cursor-pointer"
                      >
                        See all <span>{appointmentOnWait.length}</span>
                      </p>
                    ) : (
                      <p
                        onClick={() => setShowAllAppointmentsOnWait(false)}
                        className="font-medium cursor-pointer"
                      >
                        See only <span>3</span>
                      </p>
                    )
                  ) : (
                    <p className="font-medium">
                      You have only <span>{appointmentOnWait.length}</span>
                    </p>
                  )}
                </div>
                <div className="w-full flex flex-col">
                  {showAllAppointmentsOnWait
                    ? appointmentOnWait.map((order, index) => (
                        <AppointmentOnWait
                          date={order.date}
                          hour={order.hour}
                          id={index}
                          key={index}
                          profileImage={order.profileImage}
                          profession={order.profession}
                          name={order.name}
                          education={order.education}
                        />
                      ))
                    : appointmentOnWait
                        .slice(0, 3)
                        .map((order, index) => (
                          <AppointmentOnWait
                            date={order.date}
                            hour={order.hour}
                            id={index}
                            key={index}
                            profileImage={order.profileImage}
                            profession={order.profession}
                            name={order.name}
                            education={order.education}
                          />
                        ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-center p-4 bg-white">
          <div className="w-full p-4 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-lg">
            {!appointmentClientContent ? (
              <>
                <div className="flex items-center justify-between pb-4 font-semibold">
                  <div>The appointments that you accepted</div>
                  <p>{appointmentOrders.length}</p>
                </div>
                <div>
                  {" "}
                  {appointmentOrders.length > 0 ? (
                    <div className="grid grid-cols-3 max-md:grid-cols-1 max-xl:grid-cols-2 gap-4 ">
                      {appointmentOrders.map((acceptedOrder, index) => (
                        <AcceptedAppointment
                          style="col-span-1"
                          key={index}
                          id={index}
                          profileImage={acceptedOrder.profileImage}
                          profession={acceptedOrder.profession}
                          name={acceptedOrder.name}
                          education={acceptedOrder.education}
                          date={acceptedOrder.date}
                          hour={acceptedOrder.hour}
                        />
                      ))}
                    </div>
                  ) : (
                    <div>0</div>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center justify-between pb-4 font-semibold">
                  <div>The appointments you have been accepted in</div>
                  <p>{appointmentOnWait.length}</p>
                </div>
                <div>
                  {" "}
                  {appointmentOnWait.length > 0 ? (
                    <div className="grid grid-cols-3 max-md:grid-cols-1 max-xl:grid-cols-2 gap-4 ">
                      {appointmentOnWait.map((acceptedOrder, index) => (
                        <AcceptedAppointmentFromCoach
                          style="col-span-1"
                          key={index}
                          id={index}
                          profileImage={acceptedOrder.profileImage}
                          profession={acceptedOrder.profession}
                          name={acceptedOrder.name}
                          education={acceptedOrder.education}
                          date={acceptedOrder.date}
                          hour={acceptedOrder.hour}
                        />
                      ))}
                    </div>
                  ) : (
                    <div>0</div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentPage;
