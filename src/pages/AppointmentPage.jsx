import Footer from "../components/Footer";

const AppointmentPage = () => {
  return (
    <div className="flex justify-center  gap-x-10 pt-5 px-4 bg-white_color">
      <div className="w-[70%] flex flex-col gap-10">
        <div className="flex justify-center p-4 bg-white">
          <div className="w-full p-4 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-lg"></div>
        </div>

        <div className="flex justify-center p-4 bg-white">
          <div className="w-full p-4 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-lg">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentPage;
