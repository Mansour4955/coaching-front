import CancelAppointment from "../notifications/CancelAppointment";
import { coachNotification, clientNotification, URL } from "../data";
import FollowNotification from "../notifications/FollowNotification";
import AcceptAppointment from "../notifications/AcceptAppointment";
import { useLocalStorage } from "../hooks/useLocalStorege";
import axios from "axios";
import { useEffect, useState } from "react";
const NotificationPage = () => {
  const [theUser, setTheUser] = useState(null);
  const { getItem } = useLocalStorage("userData");
  const theAccountOwner = getItem();
  const isCoach = theAccountOwner?.role === "coach" ? true : false;
  useEffect(() => {
    axios
      .get(`${URL}/api/users/${theAccountOwner?._id}`)
      .then((response) => {
        setTheUser(response.data);
      })
      .catch((error) => {
        console.log("Error fetching client data ", error.response);
      });
  }, []);
  return (
    <div className="flex justify-center mb-10  gap-x-10 pt-5 px-4 bg-white_color ">
      <div className="w-[70%] flex flex-col gap-10 max-lg:w-[80%] max-md:w-[90%] max-sm:w-[95%]">
        <div className="flex justify-center p-4 bg-white">
          <div className="min-h-[60vh] w-full flex flex-col p-4 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-lg">
            {isCoach
              ? theUser?.coachNotifications.length > 0 &&
                [...theUser?.coachNotifications]
                  .reverse()
                  .map((notification, index) =>
                    notification.action === "cancel" ? (
                      <CancelAppointment
                        key={index}
                        id={index}
                        date={notification?.date}
                        user={notification?.user}
                        message={notification?.message}
                      />
                    ) : notification.action === "follow" ? (
                      <FollowNotification
                        key={index}
                        id={index}
                        client={notification?.user}
                      />
                    ) : (
                      ""
                    )
                  )
              : theUser?.clientNotifications.length > 0 &&
                [...theUser?.clientNotifications]
                  .reverse()
                  .map((notification, index) =>
                    notification.action === "cancel" ? (
                      <CancelAppointment
                        key={index}
                        id={index}
                        date={notification?.date}
                        user={notification?.user}
                        message={notification?.message}
                      />
                    ) : notification.action === "accept" ? (
                      <AcceptAppointment
                        key={index}
                        date={notification?.date}
                        id={index}
                        coach={notification?.user}
                      />
                    ) : (
                      ""
                    )
                  )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationPage;
