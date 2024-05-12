import { useEffect, useMemo, useState } from "react";
import { appointmentOrders, appointmentOnWait, URL } from "../data";
import AppointmentOrders from "../cards/AppointmentOrders";
import AcceptedAppointment from "../cards/AcceptedAppointment";
import AppointmentOnWait from "../cards/AppointmentOnWait";
import AcceptedAppointmentFromCoach from "../cards/AcceptedAppointmentFromCoach";
import { useLocalStorage } from "../hooks/useLocalStorege";
import axios from "axios";
const AppointmentPage = () => {
  const { getItem } = useLocalStorage("userData");
  const user = getItem();

  const appointmentClientContent = user?.role === "client" ? true : false;
  const [showAllAppointmentOrders, setShowAllAppointmentOrders] =
    useState(false);
  const [showAllAppointmentsOnWait, setShowAllAppointmentsOnWait] =
    useState(false);
  const [theUser, setTheUser] = useState(null);
  useEffect(() => {
    axios
      .get(`${URL}/api/users/${user?._id}`)
      .then((response) => {
        setTheUser(response.data);
      })
      .catch((error) => {
        console.log("Error fetching user data ", error.response);
      });
  }, []);
  return (
    <div className="flex justify-center mb-10 gap-x-10 pt-5 px-4 bg-white_color">
      <div className="w-[70%] max-xl:w-[80%] max-lg:w-[90%] max-md:w-[95%] flex flex-col gap-6 min-h-[70vh]">
        <div className="flex justify-center p-4 bg-white">
          <div className="w-full p-4 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-lg">
            {!appointmentClientContent ? (
              <div className="flex flex-col">
                <div className="w-full flex justify-between items-center p-2">
                  <h3 className="font-semibold">Appintments</h3>

                  {theUser?.appointmentOrders.length > 3 ? (
                    !showAllAppointmentOrders ? (
                      <p
                        onClick={() => setShowAllAppointmentOrders(true)}
                        className="font-medium cursor-pointer"
                      >
                        See all <span>{theUser?.appointmentOrders.length}</span>
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
                      You have only{" "}
                      <span>{theUser?.appointmentOrders.length}</span>
                    </p>
                  )}
                </div>
                <div className="w-full flex flex-col">
                  {showAllAppointmentOrders
                    ? theUser?.appointmentOrders.reverse().map((order, index) => (
                        <AppointmentOrders
                          id={index}
                          key={index}
                          date={order?.date}
                          message={order?.message}
                          client={order?.user}
                        />
                      ))
                    : theUser?.appointmentOrders
                        .slice(0, 3).reverse()
                        .map((order, index) => (
                          <AppointmentOrders
                            id={index}
                            key={index}
                            date={order?.date}
                            message={order?.message}
                            client={order?.user}
                          />
                        ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col">
                <div className="w-full flex justify-between items-center p-2">
                  <h3 className="font-semibold">Your appintments on wait</h3>

                  {theUser?.appointmentOnWait.length > 3 ? (
                    !showAllAppointmentsOnWait ? (
                      <p
                        onClick={() => setShowAllAppointmentsOnWait(true)}
                        className="font-medium cursor-pointer"
                      >
                        See all <span>{theUser?.appointmentOnWait.length}</span>
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
                      You have only{" "}
                      <span>{theUser?.appointmentOnWait.length}</span>
                    </p>
                  )}
                </div>
                <div className="w-full flex flex-col">
                  {showAllAppointmentsOnWait
                    ? theUser?.appointmentOnWait.reverse().map((order, index) => (
                        <AppointmentOnWait
                          key={index}
                          date={order?.date}
                          id={index}
                          coach={order?.user}
                        />
                      ))
                    : theUser?.appointmentOnWait
                        .slice(0, 3).reverse()
                        .map((order, index) => (
                          <AppointmentOnWait
                            key={index}
                            date={order?.date}
                            id={index}
                            coach={order?.user}
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
                  <p>{theUser?.appointmentAccepted.length}</p>
                </div>
                <div>
                  {" "}
                  {theUser?.appointmentAccepted.length > 0 ? (
                    <div className="grid grid-cols-3 max-md:grid-cols-1 max-xl:grid-cols-2 gap-4 ">
                      {theUser?.appointmentAccepted.reverse().map((acceptedOrder, index) => (
                        <AcceptedAppointment
                          style="col-span-1"
                          key={index}
                          id={index}
                          date={acceptedOrder?.date}
                          client={acceptedOrder?.user}
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
                  <p>{theUser?.appointmentAcceptedFromCoach.length}</p>
                </div>
                <div>
                  {" "}
                  {theUser?.appointmentAcceptedFromCoach.length > 0 ? (
                    <div className="grid grid-cols-3 max-md:grid-cols-1 max-xl:grid-cols-2 gap-4 ">
                      {theUser?.appointmentAcceptedFromCoach.reverse().map((acceptedOrder, index) => (
                        <AcceptedAppointmentFromCoach
                          style="col-span-1"
                          key={index}
                          id={index}
                          date={acceptedOrder?.date}
                          coach={acceptedOrder?.user}
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
