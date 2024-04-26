import React, { useState } from "react";
import { coachStatic, coachCard, postInfo, people, courses } from "../data";
import CoachStatisticsCard from "../cards/CoachStatisticsCard";
import CoachCard from "../cards/CoachCard";
import PublishedPost from "../cards/PublishedPost";
import { MdPeopleAlt, MdDomainVerification } from "react-icons/md";
import { FaCamera } from "react-icons/fa";
import Footer from "../components/Footer";
const Home = () => {
  const [showMoreCoachCards, setShowMoreCoachCards] = useState(false);
  const [domainPost, setDomainPost] = useState("");
  const [descriptionPost, setDescriptionPost] = useState("");
  const [imagePost, setImagePost] = useState(null);
  const [errorDomainPost, setErrorDomainPost] = useState("");
  const [errorDescriptionPost, setErrorDescriptionPost] = useState("");
  const [errorImagePost, setErrorImagePost] = useState("");

  const handlePublishPost = (e) => {
    e.preventDefault();
    if (
      domainPost &&
      imagePost &&
      descriptionPost &&
      descriptionPost.trim().length >= 3
    ) {
      console.log("Publish post!");
    } else {
      if (!domainPost) {
        setErrorDomainPost("Please choose a domain");
      }
      if (!descriptionPost) {
        setErrorDescriptionPost("Please write a description");
      } else if (descriptionPost.trim().length < 3) {
        setErrorDescriptionPost("Description must be at least 3 characters");
      }
      if (!imagePost) {
        setErrorImagePost("Please choose a photo");
      }
    }
  };
  return (
    <div className="flex mb-10 gap-x-10 pt-5 px-4 bg-white_color">
      <div className="w-[25%]  rounded-lg p-4 bg-white gap-y-3 h-fit max-xl:hidden">
        <CoachStatisticsCard
          key={coachStatic[0].id}
          full_name={coachStatic[0].full_name}
          email={coachStatic[0].email}
          company={coachStatic[0].company}
          description={coachStatic[0].description}
          followers={coachStatic[0].followers}
          following={coachStatic[0].following}
          profilePhoto={coachStatic[0].profilePhoto}
          id={coachStatic[0].id}
        />
      </div>
      <div className="w-[50%] flex flex-col gap-6 max-xl:w-[70%] max-lg:w-[100%]">
        <div className="bg-white p-4 gap-4">
          <div className="flex gap-4">
            <img
              className="w-[50px] h-[50px] rounded-full"
              alt=""
              src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"
            />
            <div className="flex flex-col gap-1 w-full">
              <textarea
                value={descriptionPost}
                onChange={(e) => {
                  setDescriptionPost(e.target.value);
                  setErrorDescriptionPost("");
                }}
                placeholder="What's on your mind"
                rows={3}
                className="outline-none flex-1 mt-2 caret-main_color"
              />
              {errorDescriptionPost && (
                <p className="text-red-500 text-sm">{errorDescriptionPost}</p>
              )}
            </div>
          </div>
          <div className="flex justify-between items-center mt-2">
            <div className="flex flex-col gap-2">
              <div className="flex gap-3 items-center text-gray-500">
                {/* <div className="flex items-center gap-1 cursor-pointer">
                <span>
                  <MdPeopleAlt size={18} />
                </span>
                <select className="text-black outline-none flex flex-col gap-1 justify-center cursor-pointer">
                  <option className="text-main_color font-semibold" disabled selected>
                    Choose a persone
                  </option>
                  {people.map((person) => (
                    <option className="text-gray-500" key={person.id}>
                      {person.full_name}
                    </option>
                  ))}
                </select>
              </div> */}
                <label
                  htmlFor="image"
                  className="flex items-center gap-1 text-black cursor-pointer"
                >
                  <span className="text-gray-500">
                    <FaCamera size={16} />
                  </span>
                  Photo
                  <input
                    onChange={(e) => {
                      setImagePost(e.target.files[0]);
                      setErrorImagePost("");
                    }}
                    type="file"
                    className="hidden"
                    id="image"
                  />
                </label>
                <div className="flex items-center gap-1 cursor-pointer">
                  <span>
                    <MdDomainVerification size={18} />
                  </span>
                  <select
                    value={domainPost}
                    onChange={(e) => {
                      setDomainPost(e.target.value);
                      setErrorDomainPost("");
                    }}
                    className="text-black outline-none flex flex-col gap-1 justify-center cursor-pointer"
                  >
                    <option
                      className="text-main_color font-semibold"
                      disabled
                      selected
                    >
                      Choose a domain
                    </option>
                    {courses.map((course) => (
                      <option className="text-gray-500" key={course.id}>
                        {course.course}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                {errorImagePost && (
                  <p className="text-red-500 text-sm">{errorImagePost}</p>
                )}
                {errorDomainPost && (
                  <p className="text-red-500 text-sm">{errorDomainPost}</p>
                )}
              </div>
            </div>
            <button
              onClick={handlePublishPost}
              className="flex items-center justify-center px-2 border border-main_color rounded-xl font-semibold text-main_color duration-300 hover:bg-main_color hover:text-white"
            >
              Publish
            </button>
          </div>
        </div>

        <div className="flex flex-col p-4 bg-white gap-y-3">
          {postInfo.map((card) => (
            <PublishedPost
              key={card.id}
              full_name={card.full_name}
              description={card.description}
              profilePhoto={card.profilePhoto}
              id={card.id}
              postPhoto={card.postPhoto}
              date_of_publish={card.date_of_publish}
              name={card.theComments.name}
              date={card.theComments.date}
              likes={card.theComments.likes}
              comments={card.theComments.comments}
            />
          ))}
        </div>
      </div>
      <div className="w-[25%] flex flex-col items-center gap-10 max-xl:w-[30%] max-lg:hidden">
        <div className=" flex flex-col rounded-lg p-4 bg-white h-fit">
          <div className="flex flex-col gap-2 items-center">
            {showMoreCoachCards
              ? coachCard.map((card) => (
                  <CoachCard
                    key={card.id}
                    full_name={card.full_name}
                    description={card.description}
                    profilePhoto={card.profilePhoto}
                    id={card.id}
                    domaine={card.domaine}
                  />
                ))
              : coachCard
                  .slice(0, 3)
                  .map((card) => (
                    <CoachCard
                      key={card.id}
                      full_name={card.full_name}
                      description={card.description}
                      profilePhoto={card.profilePhoto}
                      id={card.id}
                      domaine={card.domaine}
                    />
                  ))}
            <button
              className="flex w-full items-center justify-center px-2 border border-main_color rounded-xl font-semibold text-main_color duration-300 hover:bg-main_color hover:text-white"
              onClick={() => setShowMoreCoachCards(!showMoreCoachCards)}
            >
              {showMoreCoachCards ? "Show less" : "Show more"}
            </button>
          </div>
        </div>
        <div className="w-full p-4 h-fit bg-white ">
          <div className="shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-lg w-full">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
