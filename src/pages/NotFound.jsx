import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <div className="flex justify-center mb-10  gap-x-10 pt-5 px-4 bg-white_color ">
      <div className="w-[70%] flex flex-col gap-10 max-lg:w-[80%] max-md:w-[90%] max-sm:w-[95%]">
        <div className="flex justify-center p-4 bg-white">
          <div className="min-h-[70vh] w-full flex flex-col gap-10 items-center justify-center p-4 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-lg">
            <div className="flex flex-col items-center gap-6">
              <h2 className="text-3xl text-main_color font-semibold mb-10">
                Page not found
              </h2>
              <h2 className="text-xl">
                <Link to="/" className="text-main_color text-xl font-semibold">
                  click here
                </Link>
                {" "} to go back to home page
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
