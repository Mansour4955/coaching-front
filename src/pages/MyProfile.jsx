import PublishedPost from "../cards/PublishedPost";
import { MdOutlineStarPurple500, MdOutlineStarOutline } from "react-icons/md";
import { useLocalStorage } from "../hooks/useLocalStorege";
import { useEffect, useState } from "react";
import axios from "axios";
import { MdEdit } from "react-icons/md";
import useGetImages from "../hooks/useGetImages";
import { courses, cities, methods, URL } from "../data";
import { IoIosSend } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
const MyProfile = () => {
  const [user, setUser] = useState(null);
  const { getItem, setItem } = useLocalStorage("userData");
  const { getItem: getToken } = useLocalStorage("Authorization");
  const token = getToken();
  const userId = getItem();
  const [imageProfile, setImageProfilet] = useState(null);
  // const [errorImageProfile, setErrorImageProfile] = useState("");
  const [showImagePopup, setShowImagePopup] = useState(false);
  /////////////////////

  const navigate = useNavigate();
  // Set data
  // const [showCoachInputs, setShowCoachInputs] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState();
  const [price, setPrice] = useState(); //
  const [about, setAbout] = useState(""); //
  const [description, setDescription] = useState(""); //
  const [role, setRole] = useState(""); //
  const [course, setCourse] = useState(""); //
  const [city, setCity] = useState(""); //
  const [method, setMethod] = useState(""); //
  const [profession, setProfession] = useState(""); //
  const [training, setTraining] = useState("");
  const [fillTheTrinings, setFillTheTrinings] = useState([]);
  const [experience, setExperience] = useState("");
  const [fillTheExperiences, setFillTheExperiences] = useState([]);
  const [softSkill, setSoftSkill] = useState("");
  const [fillTheSoftSkills, setFillTheSoftSkills] = useState([]);
  const [count, setCount] = useState(0);
  const [showModificationCoach, setShowModificationCoach] = useState(false);
  const [showModificationClient, setShowModificationClient] = useState(false);
  // Set errors
  // const [errorPrice, setErrorPrice] = useState("");
  // const [errorAbout, setErrorAbout] = useState("");
  // const [errorDescription, setErrorDescription] = useState("");
  // const [errorRole, setErrorRole] = useState("");
  // const [errorCourse, setErrorCourse] = useState("");
  // const [errorCity, setErrorCity] = useState("");
  // const [errorMethod, setErrorMethod] = useState("");
  // const [errorProfession, setErrorProfession] = useState("");
  // const [errorUsername, setErrorUsername] = useState("");
  // const [errorEmail, setErrorEmail] = useState("");
  // const [errorPassword, setErrorPassword] = useState("");
  // const [errorCPassword, setErrorCPassword] = useState("");
  // const [errorTraining, setErrorTraining] = useState("");
  // const [errorExperience, setErrorExperience] = useState("");
  // const [errorSoftSkill, setErrorSoftSkill] = useState("");

  // hide and show coach inputs
  // useEffect(() => {
  //   if (role === "coach") {
  //     setShowCoachInputs(true);
  //   } else {
  //     setShowCoachInputs(false);
  //   }
  // }, [role]);
  const fillTrainingArray = () => {
    if (training.trim()) {
      setFillTheTrinings((prevTrainings) => [...prevTrainings, training]);
      setTraining("");
    }
  };
  const fillExperienceArray = () => {
    if (experience.trim()) {
      setFillTheExperiences((prevExperiences) => [
        ...prevExperiences,
        experience,
      ]);
      setExperience("");
    }
  };
  const fillSoftSkillsArray = () => {
    if (softSkill.trim()) {
      setFillTheSoftSkills((prevSoftSkills) => [...prevSoftSkills, softSkill]);
      setSoftSkill("");
    }
  };
  const handleSubmitForm = (e) => {
    e.preventDefault();

    // Prepare data to send to the backend, excluding empty fields
    const requestData = {
      // Include fields with values
      ...(username && { username }),
      ...(password && { password }),
      ...(profession && { profession }),
      ...(course && { course }),
      ...(city && { city }),
      ...(method && { method }),
      ...(price && { price }),
      ...(description && { education: description }),
      ...(about && { about }),
      ...(fillTheTrinings.length > 0 && { trainings: fillTheTrinings }),
      ...(fillTheSoftSkills.length > 0 && { softSkills: fillTheSoftSkills }),
      ...(fillTheExperiences.length > 0 && { experiences: fillTheExperiences }),
    };

    // Check if there are any non-empty fields to send
    if (Object.keys(requestData).length > 0) {
      // Send the request to the backend
      axios
        .put(`${URL}/api/users/${userId?._id}`, requestData)
        .then((response) => {
          setItem(response.data);
          setUser(response.data);
          setCount((prev) => prev + 1);
          setShowModificationCoach(false);
          setShowModificationClient(false);
        })
        .catch((error) => {
          console.error("Error registering user:", error);
        });
    } else {
      console.error("All fields are empty. Request not sent.");
    }
  };

  //////////////////////////

  // const { getItem } = useLocalStorage("userData");
  // useEffect(() => {
  //   setUser(getItem());
  // }, []);
  useEffect(() => {
    if (imageProfile) {
      setShowImagePopup(true);
    }
  }, [imageProfile]);
  const handleUpdateImageProfile = () => {
    if (imageProfile) {
      const imageData = new FormData();
      imageData.append("image", imageProfile);
      axios
        .post(`${URL}/api/users/profile/profile-photo-upload`, imageData, {
          headers: { Authorization: token },
        })
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.log("Error update image profile ", error.response);
        });
      setShowImagePopup(false);
    }
  };
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
  }, [count]);
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
  console.log("user user ", user);
  return (
    <div className="bg-white_color pt-5 flex justify-center mb-10 relative">
      <div className="w-[60%] max-sm:w-[95%] max-md:w-[90%] max-lg:w-[80%] max-xl:w-[70%]  flex-col flex min-h-[60vh]">
        {user?.role === "coach" ? (
          <div className="flex flex-col gap-10 relative">
            <div className="bg-white p-4">
              <div className="bg-white flex flex-col gap-6 p-4 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-lg">
                <div className="flex flex-col gap-3">
                  <div className="flex justify-center flex-col items-center">
                    <div className="relative w-fit">
                      <img
                        className="w-[160px] h-[160px] rounded-full mx-auto max-md:w-[140px] max-md:h-[140px]"
                        alt="profileImage"
                        src={imageOfUser[user?.profileImage]}
                      />
                      <div className="absolute flex flex-col gap-2 right-0 top-[80%]">
                        <label
                          className=" text-main_color cursor-pointer"
                          htmlFor="image"
                        >
                          <MdEdit size={20} />
                        </label>
                        <input
                          onChange={(e) => {
                            setImageProfilet(e.target.files[0]);
                            setShowImagePopup(true);
                          }}
                          type="file"
                          className="hidden"
                          id="image"
                        />
                      </div>
                    </div>
                    {showImagePopup && (
                      <div className=" rounded-lg p-2 flex items-center justify-center flex-col z-20 bg-white">
                        <p className="text-gray-600 font-medium">
                          Are you sure you want to update your profile image!
                        </p>
                        <div className="flex justify-center gap-10 mt-2">
                          <p
                            onClick={handleUpdateImageProfile}
                            className="px-2 py-0.5 border border-main_color bg-main_color active:bg-main_color active:text-white hover:bg-white hover:text-main_color text-white duration-100 font-medium cursor-pointer rounded-lg"
                          >
                            update
                          </p>
                          <p
                            onClick={() => setShowImagePopup(false)}
                            className="px-2 py-0.5 border border-gray-600 bg-gray-600 active:bg-gray-600 active:text-white hover:bg-white hover:text-gray-600 text-white duration-100 font-medium cursor-pointer rounded-lg"
                          >
                            Cancel
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className=" flex flex-col gap-3 ">
                    <div className="mx-auto flex flex-col justify-center items-center">
                      <div className="flex flex-col gap-2 items-center justify-center">
                        <div className="w-full flex flex-col items-center gap-3">
                          <p className="font-semibold text-lg max-md:text-base">
                            {user?.username}{" "}
                            {user?.role === "coach" && (
                              <span className="text-main_color font-medium text-sm max-md:text-xs">
                                {user?.profession}
                              </span>
                            )}
                          </p>
                          <span
                            className="text-main_color cursor-pointer flex items-center justify-center w-full"
                            onClick={() => setShowModificationCoach(true)}
                          >
                            <MdEdit size={20} />
                          </span>
                        </div>
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
                        count={count}
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
            {showModificationCoach && (
              <div className="bg-white absolute top-[5%] left-2/4 -translate-x-2/4 p-4 z-20 shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px]  rounded-lg">
                <form
                  onSubmit={handleSubmitForm}
                  className="flex flex-col gap-2 w-[500px] max-md:w-[450px] max-sm:w-[350px]"
                >
                  <label className="flex flex-col  w-full">
                    <span className="font-semibold ml-1">Your username</span>
                    <input
                      value={username}
                      onChange={(e) => {
                        setUsername(e.target.value);
                      }}
                      type="text"
                      placeholder="Write username"
                      className="caret-main_color px-2 py-2 flex items-center justify-center rounded-xl outline-none border w-full border-main_color"
                    />
                  </label>

                  <label className="flex flex-col w-full">
                    <span className="font-semibold ml-1">Your password</span>
                    <input
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      type="password"
                      placeholder="Write password"
                      className="caret-main_color px-2 py-2 flex items-center justify-center rounded-xl outline-none border w-full border-main_color"
                    />
                  </label>

                  <div className="flex flex-col gap-2">
                    <label className="flex flex-col  w-full">
                      <span className="font-semibold ml-1">
                        Your profession
                      </span>
                      <input
                        value={profession}
                        onChange={(e) => {
                          setProfession(e.target.value);
                        }}
                        type="text"
                        placeholder="Write your profession"
                        className="caret-main_color px-2 py-2 flex items-center justify-center rounded-xl outline-none border w-full border-main_color"
                      />
                    </label>
                    <div className="flex flex-col w-full">
                      <label className="font-semibold ml-1">Your course</label>
                      <select
                        value={course}
                        onChange={(e) => {
                          setCourse(e.target.value);
                        }}
                        className="caret-main_color px-2 py-2 flex items-center justify-center rounded-xl outline-none border w-full border-main_color"
                      >
                        <option className="outline-none" disabled selected>
                          Choose a course
                        </option>
                        {courses.map((course) => (
                          <option className="outline-none" key={course.id}>
                            {course.course}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex flex-col w-full">
                      <label className="font-semibold ml-1">Your city</label>
                      <select
                        value={city}
                        onChange={(e) => {
                          setCity(e.target.value);
                        }}
                        className="caret-main_color px-2 py-2 flex items-center justify-center rounded-xl outline-none border w-full border-main_color"
                      >
                        <option className="outline-none" disabled selected>
                          Choose a city
                        </option>
                        {cities.map((city) => (
                          <option className="outline-none" key={city.id}>
                            {city.city}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex flex-col w-full">
                      <label className="font-semibold ml-1">Your method</label>
                      <select
                        value={method}
                        onChange={(e) => {
                          setMethod(e.target.value);
                        }}
                        className="caret-main_color px-2 py-2 flex items-center justify-center rounded-xl outline-none border w-full border-main_color"
                      >
                        <option className="outline-none" disabled selected>
                          Choose a method
                        </option>
                        {methods.map((method) => (
                          <option className="outline-none" key={method.id}>
                            {method.meetingType}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex flex-col w-full">
                      <label className="font-semibold ml-1">
                        Your price per hour
                      </label>
                      <input
                        value={price}
                        onChange={(e) => {
                          setPrice(e.target.value);
                        }}
                        type="number"
                        placeholder="Your price per hour"
                        className="caret-main_color px-2 py-2 flex items-center justify-center rounded-xl outline-none border w-full border-main_color"
                      />
                    </div>
                    <div className="flex flex-col w-full">
                      <label className="font-semibold ml-1">
                        Description about your diplomas
                      </label>
                      <textarea
                        rows={2}
                        value={description}
                        onChange={(e) => {
                          setDescription(e.target.value);
                        }}
                        placeholder="Description about your diplomas in this course"
                        className="caret-main_color px-2 py-2 flex items-center justify-center rounded-xl outline-none border w-full border-main_color"
                      />
                    </div>
                    <div className="flex flex-col w-full">
                      <label className="font-semibold ml-1">
                        Tell us about you
                      </label>
                      <textarea
                        rows={2}
                        value={about}
                        onChange={(e) => {
                          setAbout(e.target.value);
                        }}
                        placeholder="Tell us about you"
                        className="caret-main_color px-2 py-2 flex items-center justify-center rounded-xl outline-none border w-full border-main_color"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="flex flex-col  w-full">
                        <span className="font-semibold ml-1">
                          Your trainings
                        </span>
                        <div className="flex w-full">
                          <input
                            type="text"
                            className="caret-main_color px-2 py-2 flex items-center justify-center rounded-l-xl outline-none border w-full border-main_color border-r-0"
                            placeholder="Write trainings"
                            value={training}
                            onChange={(e) => {
                              setTraining(e.target.value);
                            }}
                          />
                          <div
                            onClick={fillTrainingArray}
                            className="flex items-center justify-center rounded-r-xl border border-main_color border-l-0 px-2 py-1 text-main_color font-bold cursor-pointer hover:bg-white_color duration-300"
                          >
                            <IoIosSend size={20} />
                          </div>
                        </div>
                      </label>
                      <ul className="flex flex-col gap-1 text-sm text-gray-700 font-medium list-disc ml-4 capitalize">
                        {fillTheTrinings.length > 0 &&
                          fillTheTrinings.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                      </ul>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="flex flex-col  w-full">
                        <span className="font-semibold ml-1">
                          Your soft skills
                        </span>
                        <div className="flex w-full">
                          <input
                            type="text"
                            className="caret-main_color px-2 py-2 flex items-center justify-center rounded-l-xl outline-none border w-full border-main_color border-r-0"
                            placeholder="Write soft skills"
                            value={softSkill}
                            onChange={(e) => {
                              setSoftSkill(e.target.value);
                            }}
                          />
                          <div
                            onClick={fillSoftSkillsArray}
                            className="flex items-center justify-center rounded-r-xl border border-main_color border-l-0 px-2 py-1 text-main_color font-bold cursor-pointer hover:bg-white_color duration-300"
                          >
                            <IoIosSend size={20} />
                          </div>
                        </div>
                      </label>
                      <div className="flex gap-2 flex-wrap">
                        {fillTheSoftSkills.length > 0 &&
                          fillTheSoftSkills.map((item, index) => (
                            <span
                              className="px-2 py-1 bg-main_color text-white font-medium rounded-lg text-sm capitalize max-md:text-xs"
                              key={index}
                            >
                              {item}
                            </span>
                          ))}
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="flex flex-col  w-full">
                        <span className="font-semibold ml-1">
                          Your experiences
                        </span>
                        <div className="flex w-full">
                          <input
                            type="text"
                            className="caret-main_color px-2 py-2 flex items-center justify-center rounded-l-xl outline-none border w-full border-main_color border-r-0"
                            placeholder="Write experiences"
                            value={experience}
                            onChange={(e) => {
                              setExperience(e.target.value);
                            }}
                          />
                          <div
                            onClick={fillExperienceArray}
                            className="flex items-center justify-center rounded-r-xl border border-main_color border-l-0 px-2 py-1 text-main_color font-bold cursor-pointer hover:bg-white_color duration-300"
                          >
                            <IoIosSend size={20} />
                          </div>
                        </div>
                      </label>
                      <ul className="flex flex-col gap-1 text-sm text-gray-700 font-medium list-disc ml-4 capitalize">
                        {fillTheExperiences.length > 0 &&
                          fillTheExperiences.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-2">
                    <button
                      type="submit"
                      className="px-2 py-2 bg-main_color text-white font-medium rounded-lg text-sm capitalize cursor-pointer w-[100px] flex items-center justify-center hover:text-main_color hover:bg-white duration-200 border hover:border-main_color active:bg-main_color active:text-white max-md:text-xs  max-md:w-[90px]"
                    >
                      Save
                    </button>
                    <p
                      onClick={() => setShowModificationCoach(false)}
                      className="px-2 py-0.5 border border-gray-600 bg-gray-600 active:bg-gray-600 active:text-white hover:bg-white hover:text-gray-600 text-white duration-100 font-medium cursor-pointer rounded-lg flex items-center justify-center"
                    >
                      Cancel
                    </p>
                  </div>
                </form>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-10 relative">
            <div className="bg-white p-4">
              <div className="bg-white flex flex-col gap-6 p-4 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-lg">
                <div className="flex flex-col gap-3">
                  <div className="flex justify-center flex-col items-center">
                    <div className="relative w-fit">
                      <img
                        className="w-[160px] h-[160px] rounded-full mx-auto max-md:w-[140px] max-md:h-[140px]"
                        alt="profileImage"
                        src={imageOfUser[user?.profileImage]}
                      />
                      <div className="absolute flex flex-col gap-2 right-0 top-[80%]">
                        <label
                          className=" text-main_color cursor-pointer"
                          htmlFor="image"
                        >
                          <MdEdit size={20} />
                        </label>
                        <input
                          onChange={(e) => {
                            setImageProfilet(e.target.files[0]);
                            setShowImagePopup(true);
                          }}
                          type="file"
                          className="hidden"
                          id="image"
                        />
                      </div>
                    </div>
                    {showImagePopup && (
                      <div className=" rounded-lg p-2 flex items-center justify-center flex-col z-20 bg-white">
                        <p className="text-gray-600 font-medium">
                          Are you sure you want to update your profile image!
                        </p>
                        <div className="flex justify-center gap-10 mt-2">
                          <p
                            onClick={handleUpdateImageProfile}
                            className="px-2 py-0.5 border border-main_color bg-main_color active:bg-main_color active:text-white hover:bg-white hover:text-main_color text-white duration-100 font-medium cursor-pointer rounded-lg"
                          >
                            update
                          </p>
                          <p
                            onClick={() => setShowImagePopup(false)}
                            className="px-2 py-0.5 border border-gray-600 bg-gray-600 active:bg-gray-600 active:text-white hover:bg-white hover:text-gray-600 text-white duration-100 font-medium cursor-pointer rounded-lg"
                          >
                            Cancel
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className=" flex flex-col gap-3 ">
                    <div className="mx-auto flex flex-col justify-center items-center">
                      <div className="flex flex-col gap-2 items-center justify-center">
                        <div className="w-full flex flex-col items-center gap-3">
                          <p className="font-semibold text-lg max-md:text-base">
                            {user?.username}
                          </p>
                          <span
                            className="text-main_color cursor-pointer flex items-center justify-center w-full"
                            onClick={() => setShowModificationClient(true)}
                          >
                            <MdEdit size={20} />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {showModificationClient && (
              <div className="bg-white absolute top-[5%] left-2/4 -translate-x-2/4 p-4 z-20 shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px]  rounded-lg">
                <form
                  onSubmit={handleSubmitForm}
                  className="flex flex-col gap-2 w-[500px] max-md:w-[450px] max-sm:w-[350px]"
                >
                  <label className="flex flex-col  w-full">
                    <span className="font-semibold ml-1">Your username</span>
                    <input
                      value={username}
                      onChange={(e) => {
                        setUsername(e.target.value);
                      }}
                      type="text"
                      placeholder="Write username"
                      className="caret-main_color px-2 py-2 flex items-center justify-center rounded-xl outline-none border w-full border-main_color"
                    />
                  </label>
                  <label className="flex flex-col w-full">
                    <span className="font-semibold ml-1">Your password</span>
                    <input
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      type="password"
                      placeholder="Write password"
                      className="caret-main_color px-2 py-2 flex items-center justify-center rounded-xl outline-none border w-full border-main_color"
                    />
                  </label>
                  <div className="flex gap-2 mt-2">
                    <button
                      type="submit"
                      className="px-2 py-2 bg-main_color text-white font-medium rounded-lg text-sm capitalize cursor-pointer w-[100px] flex items-center justify-center hover:text-main_color hover:bg-white duration-200 border hover:border-main_color active:bg-main_color active:text-white max-md:text-xs  max-md:w-[90px]"
                    >
                      Save
                    </button>
                    <p
                      onClick={() => setShowModificationClient(false)}
                      className="px-2 py-0.5 border border-gray-600 bg-gray-600 active:bg-gray-600 active:text-white hover:bg-white hover:text-gray-600 text-white duration-100 font-medium cursor-pointer rounded-lg flex items-center justify-center"
                    >
                      Cancel
                    </p>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
