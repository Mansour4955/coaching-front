import PublishedPost from "../cards/PublishedPost";
import { MdOutlineStarPurple500, MdOutlineStarOutline } from "react-icons/md";
import { useLocalStorage } from "../hooks/useLocalStorege";
import { useEffect, useState } from "react";
import axios from "axios";
import { URL } from "../data";
import useGetImages from "../hooks/useGetImages";
const MyProfile = () => {
  const [user, setUser] = useState(null);
  const { getItem } = useLocalStorage("userData");
  const userId = getItem();

  // const { getItem } = useLocalStorage("userData");
  // useEffect(() => {
  //   setUser(getItem());
  // }, []);
  useEffect(() => {
    axios
      .get(`${URL}/api/users/${userId._id}`)
      .then((response) => {
        setUser(response.data);
        console.log(response.data.profileImage);
      })
      .catch((error) => {
        console.log("Error fetching user data ", error.response);
      });
  }, []);
  let numberOfReviewers = user?.reviews.length;
  let totalStars = 0;
  user?.reviews.forEach((review) => {
    totalStars += review.stars;
  });
  const averageStars = totalStars / numberOfReviewers;
  const resultStars = Math.round(averageStars);
  const imageOfUser = useGetImages(user?.profileImage);
  console.log(
    "imageOfUser[user?.profileImage] ",
    imageOfUser[user?.profileImage]
  );
  console.log("imageOfUser ", imageOfUser);
  return (
    <div className="bg-white_color pt-5 flex justify-center mb-10">
      <div className="w-[60%] max-sm:w-[95%] max-md:w-[90%] max-lg:w-[80%] max-xl:w-[70%]  flex-col flex min-h-[60vh]">
        {user?.role === "coach" ? (
          <div className="flex flex-col gap-10 relative">
            <div className="bg-white p-4">
              <div className="bg-white flex flex-col gap-6 p-4 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-lg">
                <div className="flex flex-col gap-3">
                  <img
                    className="w-[160px] h-[160px] rounded-full mx-auto max-md:w-[140px] max-md:h-[140px]"
                    alt="profileImage"
                    src={imageOfUser[user?.profileImage]}
                  />
                  <div className=" flex flex-col gap-3 ">
                    <div className="mx-auto flex flex-col justify-center items-center">
                      <div className="flex flex-col gap-2 items-center justify-center">
                        <p className="font-semibold text-lg max-md:text-base">
                          {user?.username}{" "}
                          {user?.role === "coach" && (
                            <span className="text-main_color font-medium text-sm max-md:text-xs">
                              {user?.profession}
                            </span>
                          )}
                        </p>
                        {}
                        {user?.reviews.length > 0 && (
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
                      {user?.trainings?.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="font-semibold text-lg ">Soft skills:</h3>
                    <div className="flex gap-2 flex-wrap">
                      {user?.softSkills?.map((item, index) => (
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
                      {user?.experiences.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  {user?.reviews?.length > 0 && (
                    <div className="flex flex-col gap-2">
                      <h3 className="font-semibold ">Reviews:</h3>
                      <div className="flex flex-col gap-2">
                        {user?.reviews?.length > 0 &&
                          user?.reviews?.map((review, index) => (
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
                                    Array.from({
                                      length: 5 - review.stars,
                                    }).map((addedStar, index) => (
                                      <span
                                        className="flex items-center gap-0.5"
                                        key={index}
                                      >
                                        <p>
                                          <MdOutlineStarOutline />
                                        </p>
                                      </span>
                                    ))}
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
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="p-4 bg-white">
              <div className="flex flex-col items-center gap-2">
                {user?.posts?.length > 0 ? (
                  user?.posts
                    .map((post) => (
                      <PublishedPost
                        key={post._id}
                        id={post._id}
                        domaine={post.domaine}
                        full_name={user.username}
                        description={post.description}
                        profilePhoto={user.profileImage}
                        postPhoto={post.postImage}
                        date_of_publish={post.createdAt}
                        likes={post.likes}
                        comments={post.comments}
                        idofuserofpost={user._id}
                      />
                    ))
                    .reverse()
                ) : (
                  <span className="text-main_color font-semibold">
                    This coach has no posts yet
                  </span>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-10 relative">
            <div className="bg-white p-4">
              <div className="bg-white flex flex-col gap-6 p-4 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-lg">
                <div className="flex flex-col gap-3">
                  <img
                    className="w-[160px] h-[160px] rounded-full mx-auto max-md:w-[140px] max-md:h-[140px]"
                    alt={user?.profileImage}
                    src={user?.profileImage}
                  />
                  <div className=" flex flex-col gap-3 ">
                    <div className="mx-auto flex flex-col justify-center items-center">
                      <div className="flex flex-col gap-2 items-center justify-center">
                        <p className="font-semibold text-lg max-md:text-base">
                          {user?.username}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
