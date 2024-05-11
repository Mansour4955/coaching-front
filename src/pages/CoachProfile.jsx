import { useEffect, useState } from "react";
import PublishedPost from "../cards/PublishedPost";
import { URL, coachCardInfo, postInfo } from "../data";
import { MdOutlineStarPurple500, MdOutlineStarOutline } from "react-icons/md";
import { useParams } from "react-router-dom";
import StarRating from "../StarRating";
import Appointment from "../popups/Appointment";
import axios from "axios";
import useGetImages from "../hooks/useGetImages";
import { useLocalStorage } from "../hooks/useLocalStorege";
const CoachProfile = () => {
  const { getItem } = useLocalStorage("Authorization");
  const { getItem: getReviewer } = useLocalStorage("userData");

  const reviewer = getReviewer();
  const isLoggedIn = getItem() ? true : false;
  const [showAppointment, setShowAppointment] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [totalStars, setTotalStars] = useState(0);
  const [numberOfReviewers, setNumberOfReviewers] = useState(0);
  const [averageStars, setAverageStars] = useState(0);
  const [resultStars, setResultStars] = useState(0);
  const [errorReviewText, setErrorReviewText] = useState("");
  const [errorRating, setErrorRating] = useState("");
  const [showStars, setShowStars] = useState(false);
  const [counter, setCounter] = useState(0);
  const [user, setUser] = useState(null);
  const { coachProfileId } = useParams();

  useEffect(() => {
    axios
      .get(`${URL}/api/users/${coachProfileId}`)
      .then((response) => {
        setTotalStars(0);
        response?.data?.reviews.forEach((review) => {
          setTotalStars((prev) => (prev += parseInt(review.stars)));
        });
        setNumberOfReviewers(response?.data?.reviews.length);
        setUser(response.data);
        // console.log("numberOfReviewers ", numberOfReviewers);
        // console.log("totalStars ", totalStars);
      })
      .catch((error) => {
        console.log("Error fetching user data ", error.response);
      });
  }, []);
  const handleFollow = () => {
    console.log("Follow");
  };
  const handleReviewData = (e) => {
    e.preventDefault();
    // console.log(reviewText);
    // console.log(rating);
    if (rating && reviewText) {
      axios
        .put(`${URL}/api/users/${coachProfileId}`, {
          reviews: [
            {
              name: reviewer?.username,
              stars: rating.toString(),
              description: reviewText,
            },
          ],
        })
        .then((response) => {
          // totalStars = 0;
          setTotalStars(0);
          response?.data?.reviews.forEach((review) => {
            setTotalStars((prev) => (prev += parseInt(review.stars)));
          });
          setNumberOfReviewers(response?.data?.reviews.length);
          setUser(response.data);
        })
        .catch((error) => {
          console.log("Error updating reviews ", error.response);
        });
      setCounter(counter + 1);
      setReviewText("");
    } else {
      if (!rating) {
        setErrorRating("You must rate");
      }
      if (!reviewText) {
        setErrorReviewText("You must let a review");
      }
    }
  };
  // useEffect(() => {
  //   do {
  //     setTimeout(() => {
  //       setAverageStars(totalStars / numberOfReviewers);
  //       setResultStars(Math.round(totalStars / numberOfReviewers));
  //       console.log(resultStars);
  //     }, 500);
  //   } while (1 > 2);
  // }, [totalStars, numberOfReviewers]);
  useEffect(() => {
    setAverageStars(totalStars / numberOfReviewers);
    setResultStars(Math.round(totalStars / numberOfReviewers)); // Calculate directly here
    // setTimeout(() => {
    // }, 1000);
    return () => {
      console.log("numberOfReviewers ", numberOfReviewers);
      console.log("totalStars ", totalStars);
      setShowStars(true);
    };
  }, [totalStars, numberOfReviewers]);
  const imageOfUser = useGetImages(user?.profileImage);
  const handleSendMessage = () => {
    console.log("Send Message ", user?._id);
  };
  return (
    <div className="bg-white_color pt-5 flex justify-center mb-10">
      <div className="w-[60%] max-sm:w-[95%] max-md:w-[90%] max-lg:w-[80%] max-xl:w-[70%]  flex-col flex ">
        <div className="flex flex-col gap-10 relative">
          <div className="bg-white p-4">
            <div className="bg-white flex flex-col gap-6 p-4 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-lg">
              <div className="flex flex-col gap-3">
                <img
                  className="w-[160px] h-[160px] rounded-full mx-auto max-md:w-[140px] max-md:h-[140px]"
                  alt={imageOfUser[user?.profileImage]}
                  src={imageOfUser[user?.profileImage]}
                />
                <div className=" flex flex-col gap-3 ">
                  <div className="mx-auto flex flex-col justify-center items-center">
                    <div className="flex flex-col gap-2 items-center justify-center">
                      <p className="font-semibold text-lg max-md:text-base">
                        {user?.username}{" "}
                        <span className="text-main_color font-medium text-sm max-md:text-xs">
                          {user?.profession}
                        </span>
                      </p>
                      {showStars && (
                        <div>
                          {user?.reviews && user?.reviews?.length > 0 && (
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
                          )}
                        </div>
                      )}
                      {isLoggedIn && (
                        <div className="flex gap-10 max-lg:gap-5">
                          <p
                            onClick={handleFollow}
                            className="px-2 py-1 bg-main_color text-white font-medium rounded-lg text-sm capitalize cursor-pointer w-[100px] flex items-center justify-center hover:text-main_color hover:bg-white duration-200 border hover:border-main_color active:bg-main_color active:text-white max-md:text-xs  max-md:w-[90px]"
                          >
                            Follow
                          </p>
                          <p
                            onClick={() => setShowAppointment(!showAppointment)}
                            className="px-2 py-1 bg-main_color text-white font-medium rounded-lg text-sm capitalize cursor-pointer w-[100px] flex items-center justify-center hover:text-main_color hover:bg-white duration-200 border hover:border-main_color active:bg-main_color active:text-white max-md:text-xs  max-md:w-[90px]"
                          >
                            Appointment
                          </p>
                          <p
                            onClick={handleSendMessage}
                            className="px-2 py-1 bg-main_color text-white font-medium rounded-lg text-sm capitalize cursor-pointer w-[100px] flex items-center justify-center hover:text-main_color hover:bg-white duration-200 border hover:border-main_color active:bg-main_color active:text-white max-md:text-xs  max-md:w-[90px]"
                          >
                            Message
                          </p>
                        </div>
                      )}
                      {showAppointment && (
                        <div>
                          <Appointment
                            setShowAppointment={setShowAppointment}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="font-medium">
                    {user?.city}{" "}
                    <span className="text-main_color font-medium text-sm">
                      ({user?.method})
                    </span>
                  </p>
                  <p className="font-medium">
                    {user?.course}{" "}
                    <span className="text-sm text-gray-500">
                      {user?.education}
                    </span>
                  </p>
                  <p className="text-gray-600 font-semibold">
                    {user?.price}MAD/h
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <h3 className="font-semibold text-lg">About Me:</h3>
                  <p className=" text-sm text-gray-700 font-medium">
                    {user?.about}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-semibold text-lg">Training:</h3>
                  <ul className="flex flex-col gap-1 text-sm text-gray-700 font-medium list-disc ml-4 capitalize">
                    {user?.trainings &&
                      user?.trainings.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                  </ul>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-semibold text-lg ">Soft skills:</h3>
                  <div className="flex gap-2 flex-wrap">
                    {user?.softSkills &&
                      user?.softSkills.map((item, index) => (
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
                    {user?.experiences &&
                      user?.experiences.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                  </ul>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-semibold ">Reviews:</h3>
                  <div className="flex flex-col gap-2">
                    {user?.reviews &&
                      user?.reviews.length > 0 &&
                      user?.reviews.map((review, index) => (
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
                        <StarRating
                          setErrorRating={setErrorRating}
                          onRate={setRating}
                          counter={counter}
                        />
                      </div>
                      {errorRating && (
                        <p className="text-red-600 text-sm">{errorRating}</p>
                      )}
                      <textarea
                        value={reviewText}
                        onChange={(e) => {
                          setReviewText(e.target.value);
                          setErrorReviewText("");
                        }}
                        className="w-full outline-none border border-main_color rounded-lg px-2 py-1 caret-main_color"
                        rows="2"
                        placeholder="Write something"
                      />
                      {errorReviewText && (
                        <p className="text-red-600 text-sm">
                          {errorReviewText}
                        </p>
                      )}
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
              {user?.posts.length > 0 ? (
                user?.posts.map((post) => (
                  // <PublishedPost
                  //   key={card.id}
                  //   full_name={card.full_name}
                  //   description={card.description}
                  //   profilePhoto={card.profilePhoto}
                  //   id={card.id}
                  //   postPhoto={card.postPhoto}
                  //   date_of_publish={card.date_of_publish}
                  //   name={card.theComments.name}
                  //   date={card.theComments.date}
                  //   likes={card.theComments.likes}
                  //   comments={card.theComments.comments}
                  // />

                  <PublishedPost
                    // theValueAgain={theValueAgain}
                    // setTheValueAgain={setTheValueAgain}
                    key={post._id}
                    id={post._id}
                    domaine={post.domaine}
                    full_name={post.user?.username}
                    description={post.description}
                    profilePhoto={post.user?.profileImage}
                    postPhoto={post.postImage}
                    date_of_publish={post.createdAt}
                    likes={post.likes}
                    comments={post.comments}
                    idofuserofpost={coachProfileId}
                  />
                ))
              ) : (
                <span className="text-main_color font-semibold">
                  This coach has no posts yet
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoachProfile;
