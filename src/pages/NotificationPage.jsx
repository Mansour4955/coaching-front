import CancelAppointment from "../notifications/CancelAppointment";
import { coachNotification,clientNotification } from "../data";
import FollowNotification from "../notifications/FollowNotification";
import AcceptAppointment from "../notifications/AcceptAppointment";
const NotificationPage = () => {
  const isCoach = false;
  return (
    <div className="flex justify-center mb-10  gap-x-10 pt-5 px-4 bg-white_color ">
      <div className="w-[70%] flex flex-col gap-10 max-lg:w-[80%] max-md:w-[90%] max-sm:w-[95%]">
        <div className="flex justify-center p-4 bg-white">
          <div className="min-h-[60vh] w-full flex flex-col p-4 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-lg">
            {isCoach ? (
              coachNotification.length > 0 &&
              coachNotification.map((notification, index) =>
                notification.action === "cancel" ? (
                  <CancelAppointment
                    key={index}
                    profileImage={notification.profileImage}
                    name={notification.name}
                    profession={notification.profession}
                    date={notification.date}
                    id={index}
                  />
                ) : (
                  <FollowNotification
                    key={index}
                    profileImage={notification.profileImage}
                    name={notification.name}
                    profession={notification.profession}
                    id={index}
                  />
                )
              )
            ) : (
                clientNotification.length > 0 &&
                clientNotification.map((notification, index) =>
                  notification.action === "cancel" ? (
                    <CancelAppointment
                      key={index}
                      profileImage={notification.profileImage}
                      name={notification.name}
                      profession={notification.profession}
                      date={notification.date}
                      id={index}
                    />
                  ) : (
                    <AcceptAppointment
                    key={index}
                    profileImage={notification.profileImage}
                    name={notification.name}
                    profession={notification.profession}
                    date={notification.date}
                    id={index}
                    />
                  )
                )
            )}

            {/* <CancelAppointment
              profileImage={appointmentOrders[0].profileImage}
              name={appointmentOrders[0].name}
              profession={appointmentOrders[0].profession}
              date={appointmentOrders[0].date}
              id={appointmentOrders[0].id}
            />
             <FollowNotification
              profileImage={appointmentOrders[0].profileImage}
              name={appointmentOrders[0].name}
              profession={appointmentOrders[0].profession}
              id={appointmentOrders[0].id}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationPage;
