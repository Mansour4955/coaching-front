import { useState } from "react";
import PublishedPost from "../cards/PublishedPost";
import Footer from "../components/Footer";
import { coachCardInfo, postInfo } from "../data";
import { MdOutlineStarPurple500, MdOutlineStarOutline } from "react-icons/md";
import { useParams } from "react-router-dom";
import StarRating from "../StarRating";
import Appointment from "../popups/Appointment";
const CoachProfile = () => {
  const [reviewText, setReviewText] = useState("");
  const [showAppointment, setShowAppointment] = useState(false);
  const [rating, setRating] = useState(0);
  const [counter, setCounter] = useState(0);
  const { coachProfileId } = useParams();
  const coachProfileInfo = coachCardInfo.find(
    (coachInfo) => coachInfo.id === parseInt(coachProfileId)
  );
  const coachProfilePosts = postInfo.filter(
    (coachPosts) => coachPosts.id === parseInt(coachProfileId)
  );
  let numberOfReviewers = coachProfileInfo.reviews.length;
  let totalStars = 0;
  coachProfileInfo.reviews.forEach((review) => {
    totalStars += review.stars;
  });
  const averageStars = totalStars / numberOfReviewers;
  const resultStars = Math.round(averageStars);
  const handleFollow = () => {
    console.log("Follow");
  };

  const handleReviewData = (e) => {
    e.preventDefault();
    console.log(reviewText);
    console.log(rating);  
    setCounter(counter + 1)
    setReviewText("");
  };
  const {
    id,
    name,
    city,
    method,
    profession,
    course,
    diplomas,
    price,
    imageUrl,
  } = coachProfileInfo;

  return (
    <div className="bg-white_color pt-5 flex justify-center">
      <div className="w-[60%] max-sm:w-[95%] max-md:w-[90%] max-lg:w-[80%] max-xl:w-[70%]  flex-col flex ">
        <div className="flex flex-col gap-10 relative">
          <div className="bg-white p-4">
            <div className="bg-white flex flex-col gap-6 p-4 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-lg">
              <div className="flex flex-col gap-3">
                <img
                  className="w-[160px] h-[160px] rounded-full mx-auto max-md:w-[140px] max-md:h-[140px]"
                  alt={imageUrl}
                  src={imageUrl}
                />
                <div className=" flex flex-col gap-3 ">
                  <div className="mx-auto flex flex-col justify-center items-center">
                    <div className="flex flex-col gap-2 items-center justify-center">
                      <p className="font-semibold text-lg max-md:text-base">
                        {name}{" "}
                        <span className="text-main_color font-medium text-sm max-md:text-xs">
                          {profession}
                        </span>
                      </p>
                      <div className="text-yellow-500 flex items-center gap-[2px] text-xl max-md:text-lg">
                        {Array.from({ length: resultStars }).map(
                          (star, index) => (
                            <p
                              key={index}
                              className="flex gap-[2px] items-center"
                            >
                              <span>
                                <MdOutlineStarPurple500 />
                              </span>
                            </p>
                          )
                        )}
                        {5 - resultStars > 0 &&
                          Array.from({ length: 5 - resultStars }).map(
                            (addedStar, index) => (
                              <span
                                className="flex items-center gap-0.5"
                                key={index}
                              >
                                <p>
                                  <MdOutlineStarOutline />
                                </p>
                              </span>
                            )
                          )}
                      </div>
                      <div className="flex gap-10">
                        <p
                          onClick={handleFollow}
                          className="px-2 py-1 bg-main_color text-white font-medium rounded-lg text-sm capitalize cursor-pointer w-[100px] flex items-center justify-center hover:text-main_color hover:bg-white duration-200 border hover:border-main_color active:bg-main_color active:text-white max-md:text-xs  max-md:w-[90px]"
                        >
                          Follow
                        </p>
                        <p
                          onClick={()=>setShowAppointment(!showAppointment)}
                          className="px-2 py-1 bg-main_color text-white font-medium rounded-lg text-sm capitalize cursor-pointer w-[100px] flex items-center justify-center hover:text-main_color hover:bg-white duration-200 border hover:border-main_color active:bg-main_color active:text-white max-md:text-xs  max-md:w-[90px]"
                        >
                          Appointment
                        </p>
                      </div>
                      {showAppointment && <div>
                        <Appointment setShowAppointment={setShowAppointment}/>
                        </div>}
                        
                    </div>
                  </div>
                  <p className="font-medium">
                    {city}{" "}
                    <span className="text-main_color font-medium text-sm">
                      ({method})
                    </span>
                  </p>
                  <p className="font-medium">
                    {course}{" "}
                    <span className="text-sm text-gray-500">{diplomas}</span>
                  </p>
                  <p className="text-gray-600 font-semibold">{price}MAD/h</p>
                </div>
              </div>
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <h3 className="font-semibold text-lg">About Me:</h3>
                  <p className=" text-sm text-gray-700 font-medium">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Adipisci dicta, iste soluta et vitae suscipit provident ea
                    neque, illum similique possimus. Natus facilis accusantium
                    architecto vel cum sunt quod aspernatur!
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-semibold text-lg">Training:</h3>
                  <ul className="flex flex-col gap-1 text-sm text-gray-700 font-medium list-disc ml-4 capitalize">
                    {coachProfileInfo.triningItems.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-semibold text-lg ">Soft skills:</h3>
                  <div className="flex gap-2 flex-wrap">
                    {coachProfileInfo.softSkillsItems.map((item, index) => (
                      <span
                        className="px-2 py-1 bg-main_color text-white font-medium rounded-lg text-sm capitalize max-md:text-xs"
                        key={index}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-semibold text-lg">Experience:</h3>
                  <ul className="flex flex-col gap-1 text-sm text-gray-700 font-medium list-disc ml-4 capitalize">
                    {coachProfileInfo.experienceItems.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-semibold ">Reviews:</h3>
                  <div className="flex flex-col gap-2">
                    {coachProfileInfo.reviews.length > 0 &&
                      coachProfileInfo.reviews.map((review, index) => (
                        <div key={index} className="flex flex-col gap-1">
                          <div className="flex gap-2">
                            <h3 className="font-semibold text-sm capitalize">
                              {review.name}
                            </h3>
                            <p className="text-yellow-500 flex items-center gap-[2px]">
                              {Array.from({ length: review.stars }).map(
                                (star, index) => (
                                  <p
                                    key={index}
                                    className="flex gap-[2px] items-center"
                                  >
                                    <span>
                                      <MdOutlineStarPurple500 />
                                    </span>
                                  </p>
                                )
                              )}
                              {5 - review.stars > 0 &&
                                Array.from({ length: 5 - review.stars }).map(
                                  (addedStar, index) => (
                                    <span
                                      className="flex items-center gap-0.5"
                                      key={index}
                                    >
                                      <p>
                                        <MdOutlineStarOutline />
                                      </p>
                                    </span>
                                  )
                                )}
                            </p>
                          </div>
                          {review?.description && (
                            <p className="text-sm text-gray-700">
                              {review.description}
                            </p>
                          )}
                        </div>
                      ))}
                  </div>
                  <div className="">
                    <p className="text-main_color font-semibold text-lg max-md:text-base">
                      Let a review:
                    </p>
                    <div className="flex flex-col gap-1 items-start">
                      <div class="">
                      <StarRating onRate={setRating} counter={counter}/>
                      </div>
                      <textarea
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        className="w-full outline-none border border-main_color rounded-lg px-2 py-1 caret-main_color"
                        rows="2"
                        placeholder="Write something"
                      />
                      <button
                        onClick={handleReviewData}
                        className="border bg-main_color hover:bg-white hover:text-main_color font-semibold text-white active:bg-main_color active:text-white duration-150 rounded-lg px-2 py-1"
                      >
                        Send
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 bg-white">
            <div className="flex flex-col items-center gap-2">
              {coachProfilePosts.map((card) => (
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
        </div>
      </div>
    </div>
  );
};

export default CoachProfile;
