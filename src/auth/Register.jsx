import React, { useEffect, useState } from "react";
import { courses, cities, methods } from "../data";
import { IoIosSend } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { URL } from "../data";
const Register = () => {
  const navigate = useNavigate();
  // Set data
  const [showCoachInputs, setShowCoachInputs] = useState(false);
  const [price, setPrice] = useState(); //
  const [about, setAbout] = useState(""); //
  const [description, setDescription] = useState(""); //
  const [role, setRole] = useState(""); //
  const [course, setCourse] = useState(""); //
  const [city, setCity] = useState(""); //
  const [method, setMethod] = useState(""); //
  const [profession, setProfession] = useState(""); //
  const [username, setUsername] = useState(""); //
  const [email, setEmail] = useState(""); //
  const [password, setPassword] = useState(); //
  const [cPassword, setCPassword] = useState(); //
  const [training, setTraining] = useState("");
  const [fillTheTrinings, setFillTheTrinings] = useState([]);
  const [experience, setExperience] = useState("");
  const [fillTheExperiences, setFillTheExperiences] = useState([]);
  const [softSkill, setSoftSkill] = useState("");
  const [fillTheSoftSkills, setFillTheSoftSkills] = useState([]);
  // Set errors
  const [errorPrice, setErrorPrice] = useState("");
  const [errorAbout, setErrorAbout] = useState("");
  const [errorDescription, setErrorDescription] = useState("");
  const [errorRole, setErrorRole] = useState("");
  const [errorCourse, setErrorCourse] = useState("");
  const [errorCity, setErrorCity] = useState("");
  const [errorMethod, setErrorMethod] = useState("");
  const [errorProfession, setErrorProfession] = useState("");
  const [errorUsername, setErrorUsername] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorCPassword, setErrorCPassword] = useState("");
  const [errorTraining, setErrorTraining] = useState("");
  const [errorExperience, setErrorExperience] = useState("");
  const [errorSoftSkill, setErrorSoftSkill] = useState("");

  // hide and show coach inputs
  useEffect(() => {
    if (role === "coach") {
      setShowCoachInputs(true);
    } else {
      setShowCoachInputs(false);
    }
  }, [role]);
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
    // console.log("clicked");
    if (role === "coach") {
      if (
        fillTheTrinings.length >= 1 &&
        fillTheExperiences.length >= 1 &&
        fillTheSoftSkills.length >= 1 &&
        price &&
        price >= 0 &&
        about &&
        about.length >= 10 &&
        description &&
        description.length >= 10 &&
        role &&
        role === "coach" &&
        course &&
        course.trim() !== "" &&
        city &&
        city.trim() !== "" &&
        method &&
        method.trim() !== "" &&
        profession &&
        profession.trim() !== "" &&
        username &&
        username.length >= 3 &&
        email &&
        email.length >= 8 &&
        password &&
        password.length >= 8 &&
        cPassword &&
        cPassword === password
      ) {
        axios
          .post(`${URL}/api/auth/register`, {
            username,
            email,
            password,
            role,
            profession,
            course,
            city,
            method,
            price,
            education: description,
            about,
            trainings: fillTheTrinings,
            softSkills: fillTheSoftSkills,
            experiences: fillTheExperiences,
          })
          .then((response) => {
            navigate("/login");
          })
          .catch((error) => {
            console.error("Error registering user:", error);
          });
        ///////////////////////////////
        // setTraining("");
        // setPrice();
        // setAbout("");
        // setDescription("");
        // setCourse("");
        // setCity("");
        // setMethod("");
        // setProfession("");
        // setUsername("");
        // setEmail("");
        // setPassword("");
        // setCPassword("");
        // setFillTheTrinings([]);
        // setExperience("");
        // setFillTheExperiences([]);
        // setSoftSkill("");
        // setFillTheSoftSkills([]);
        // setRole("");
        // setShowCoachInputs(false);
      } else {
        //training
        if (fillTheTrinings.length < 1) {
          setErrorTraining("You have to add one training at least");
        }
        //experience
        if (fillTheExperiences.length < 1) {
          setErrorExperience("You have to add one experience at least");
        }
        //skills
        if (fillTheSoftSkills.length < 1) {
          setErrorSoftSkill("You have to add one soft skill at least");
        }
        //price
        if (!price) {
          setErrorPrice("Price is required");
        } else if (price < 0) {
          setErrorPrice("Price must be 0 or bigger");
        }
        //about
        if (!about) {
          setErrorAbout("About is required");
        } else if (about.length < 10) {
          setErrorAbout("About must be at least 10 characters");
        }
        //description
        if (!description) {
          setErrorDescription("Description is required");
        } else if (description.length < 10) {
          setErrorDescription("Description must be at least 10 characters");
        }
        //role
        if (!role) {
          setErrorRole("Role is required");
        }
        //course
        if (!course) {
          setErrorCourse("Course is required");
        }
        //city
        if (!city) {
          setErrorCity("City is required");
        }
        //method
        if (!method) {
          setErrorMethod("Method is required");
        }
        //profession
        if (!profession || profession.trim() === "") {
          setErrorProfession("Profession is required");
        }
        //username
        if (!username) {
          setErrorUsername("Username is required");
        } else if (username.length < 3) {
          setErrorUsername("Username must be at least 3 characters");
        }
        //email
        if (!email) {
          setErrorEmail("Email is required");
        } else if (email.length < 8) {
          setErrorEmail("Email must be at least 8 characters");
        }
        //password
        if (!password) {
          setErrorPassword("Password is required");
        } else if (password.length < 8) {
          setErrorPassword("Password must be at least 8 characters");
        }
        //cPassword
        if (!cPassword) {
          setErrorCPassword("Confirm password is required");
        } else if (cPassword !== password) {
          setErrorCPassword("Confirm password does not match");
        }
      }
    } else {
      if (
        username &&
        username.length >= 3 &&
        email &&
        email.length >= 8 &&
        password &&
        password.length >= 8 &&
        cPassword &&
        cPassword === password &&
        role &&
        role === "client"
      ) {
        axios
          .post(`${URL}/api/auth/register`, {
            username,
            email,
            password,
            role
          })
          .then((response) => {
            navigate("/login");
          })
          .catch((error) => {
            console.error("Error registering user:", error);
          });
        ///////////////////////////////
        // setUsername("");
        // setEmail("");
        // setPassword("");
        // setCPassword("");
        // setShowCoachInputs(false);
      } else {
        //username
        if (!username) {
          setErrorUsername("Username is required");
        } else if (username.length < 3) {
          setErrorUsername("Username must be at least 3 characters");
        }
        //email
        if (!email) {
          setErrorEmail("Email is required");
        } else if (email.length < 8) {
          setErrorEmail("Email must be at least 8 characters");
        }
        //password
        if (!password) {
          setErrorPassword("Password is required");
        } else if (password.length < 8) {
          setErrorPassword("Password must be at least 8 characters");
        }
        //cPassword
        if (!cPassword) {
          setErrorCPassword("Confirm password is required");
        } else if (cPassword !== password) {
          setErrorCPassword("Confirm password does not match");
        }
        //role
        if (!role) {
          setErrorRole("Role is required");
        }
      }
    }
  };
  return (
    <div className="flex justify-center mb-10  gap-x-10 pt-5 px-4 bg-white_color">
      <div className="w-[70%] flex flex-col gap-10 max-lg:w-[80%] max-md:w-[90%] max-sm:w-[95%]">
        <div className="flex justify-center p-4 bg-white">
          <div className="w-full flex flex-col gap-10 items-center justify-center p-4 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-lg">
            <div className="flex flex-col gap-6">
              <h2 className="text-2xl text-main_color font-semibold">
                Register:
              </h2>
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
                      setErrorUsername("");
                    }}
                    type="text"
                    placeholder="Write username"
                    className="caret-main_color px-2 py-2 flex items-center justify-center rounded-xl outline-none border w-full border-main_color"
                  />
                  {errorUsername && (
                    <p className="text-red-600 text-sm ml-1">{errorUsername}</p>
                  )}
                </label>
                <label className="flex flex-col w-full">
                  <span className="font-semibold ml-1">Your email</span>
                  <input
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setErrorEmail("");
                    }}
                    type="email"
                    placeholder="Write Email"
                    className="caret-main_color px-2 py-2 flex items-center justify-center rounded-xl outline-none border w-full border-main_color"
                  />
                  {errorEmail && (
                    <p className="text-red-600 text-sm ml-1">{errorEmail}</p>
                  )}
                </label>
                <label className="flex flex-col w-full">
                  <span className="font-semibold ml-1">Your password</span>
                  <input
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setErrorPassword("");
                    }}
                    type="password"
                    placeholder="Write password"
                    className="caret-main_color px-2 py-2 flex items-center justify-center rounded-xl outline-none border w-full border-main_color"
                  />
                  {errorPassword && (
                    <p className="text-red-600 text-sm ml-1">{errorPassword}</p>
                  )}
                </label>
                <label className="flex flex-col w-full">
                  <span className="font-semibold ml-1">
                    Your confirm password
                  </span>
                  <input
                    value={cPassword}
                    onChange={(e) => {
                      setCPassword(e.target.value);
                      setErrorCPassword("");
                    }}
                    type="password"
                    placeholder="Write confirm password"
                    className="caret-main_color px-2 py-2 flex items-center justify-center rounded-xl outline-none border w-full border-main_color"
                  />
                  {errorCPassword && (
                    <p className="text-red-600 text-sm ml-1">
                      {errorCPassword}
                    </p>
                  )}
                </label>
                <div className="flex flex-col w-full">
                  <label className="font-semibold ml-1">
                    Are you a coach or a client?
                  </label>
                  <select
                    value={role}
                    onChange={(e) => {
                      setRole(e.target.value);
                      setErrorRole("");
                    }}
                    className="caret-main_color px-2 py-2 flex items-center justify-center rounded-xl outline-none border w-full border-main_color"
                  >
                    <option className="outline-none" disabled selected>
                      Choose a role
                    </option>
                    {["client", "coach"].map((role, index) => (
                      <option className="outline-none" key={index}>
                        {role}
                      </option>
                    ))}
                  </select>
                  {errorRole && (
                    <p className="text-red-600 text-sm ml-1">{errorRole}</p>
                  )}
                </div>
                {showCoachInputs && (
                  <div className="flex flex-col gap-2">
                    <label className="flex flex-col  w-full">
                      <span className="font-semibold ml-1">
                        Your profession
                      </span>
                      <input
                        value={profession}
                        onChange={(e) => {
                          setProfession(e.target.value);
                          setErrorProfession("");
                        }}
                        type="text"
                        placeholder="Write your profession"
                        className="caret-main_color px-2 py-2 flex items-center justify-center rounded-xl outline-none border w-full border-main_color"
                      />
                      {errorProfession && (
                        <p className="text-red-600 text-sm ml-1">
                          {errorProfession}
                        </p>
                      )}
                    </label>
                    <div className="flex flex-col w-full">
                      <label className="font-semibold ml-1">Your course</label>
                      <select
                        value={course}
                        onChange={(e) => {
                          setCourse(e.target.value);
                          setErrorCourse("");
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
                      {errorCourse && (
                        <p className="text-red-600 text-sm ml-1">
                          {errorCourse}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col w-full">
                      <label className="font-semibold ml-1">Your city</label>
                      <select
                        value={city}
                        onChange={(e) => {
                          setCity(e.target.value);
                          setErrorCity("");
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
                      {errorCity && (
                        <p className="text-red-600 text-sm ml-1">{errorCity}</p>
                      )}
                    </div>
                    <div className="flex flex-col w-full">
                      <label className="font-semibold ml-1">Your method</label>
                      <select
                        value={method}
                        onChange={(e) => {
                          setMethod(e.target.value);
                          setErrorMethod("");
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
                      {errorMethod && (
                        <p className="text-red-600 text-sm ml-1">
                          {errorMethod}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col w-full">
                      <label className="font-semibold ml-1">
                        Your price per hour
                      </label>
                      <input
                        value={price}
                        onChange={(e) => {
                          setPrice(e.target.value);
                          setErrorPrice("");
                        }}
                        type="number"
                        placeholder="Your price per hour"
                        className="caret-main_color px-2 py-2 flex items-center justify-center rounded-xl outline-none border w-full border-main_color"
                      />
                      {errorPrice && (
                        <p className="text-red-600 text-sm ml-1">
                          {errorPrice}
                        </p>
                      )}
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
                          setErrorDescription("");
                        }}
                        placeholder="Description about your diplomas in this course"
                        className="caret-main_color px-2 py-2 flex items-center justify-center rounded-xl outline-none border w-full border-main_color"
                      />
                      {errorDescription && (
                        <p className="text-red-600 text-sm ml-1">
                          {errorDescription}
                        </p>
                      )}
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
                          setErrorAbout("");
                        }}
                        placeholder="Tell us about you"
                        className="caret-main_color px-2 py-2 flex items-center justify-center rounded-xl outline-none border w-full border-main_color"
                      />
                      {errorAbout && (
                        <p className="text-red-600 text-sm ml-1">
                          {errorAbout}
                        </p>
                      )}
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
                              setErrorTraining("");
                            }}
                          />
                          <div
                            onClick={fillTrainingArray}
                            className="flex items-center justify-center rounded-r-xl border border-main_color border-l-0 px-2 py-1 text-main_color font-bold cursor-pointer hover:bg-white_color duration-300"
                          >
                            <IoIosSend size={20} />
                          </div>
                        </div>
                        {errorTraining && (
                          <p className="text-red-600 text-sm ml-1">
                            {errorTraining}
                          </p>
                        )}
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
                              setErrorSoftSkill("");
                            }}
                          />
                          <div
                            onClick={fillSoftSkillsArray}
                            className="flex items-center justify-center rounded-r-xl border border-main_color border-l-0 px-2 py-1 text-main_color font-bold cursor-pointer hover:bg-white_color duration-300"
                          >
                            <IoIosSend size={20} />
                          </div>
                        </div>
                        {errorSoftSkill && (
                          <p className="text-red-600 text-sm ml-1">
                            {errorSoftSkill}
                          </p>
                        )}
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
                              setErrorExperience("");
                            }}
                          />
                          <div
                            onClick={fillExperienceArray}
                            className="flex items-center justify-center rounded-r-xl border border-main_color border-l-0 px-2 py-1 text-main_color font-bold cursor-pointer hover:bg-white_color duration-300"
                          >
                            <IoIosSend size={20} />
                          </div>
                        </div>
                        {errorExperience && (
                          <p className="text-red-600 text-sm ml-1">
                            {errorExperience}
                          </p>
                        )}
                      </label>
                      <ul className="flex flex-col gap-1 text-sm text-gray-700 font-medium list-disc ml-4 capitalize">
                        {fillTheExperiences.length > 0 &&
                          fillTheExperiences.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                      </ul>
                    </div>
                  </div>
                )}
                <p className="text-sm ml-1 text-gray-700">
                  if you are registered already {""}
                  <Link
                    to="/login"
                    className="font-semibold cursor-pointer text-main_color underline-offset-2 underline"
                  >
                    click here
                  </Link>{" "}
                  to login
                </p>
                <button
                  type="submit"
                  className="px-2 py-2 bg-main_color text-white font-medium rounded-lg text-sm capitalize cursor-pointer w-[100px] flex items-center justify-center hover:text-main_color hover:bg-white duration-200 border hover:border-main_color active:bg-main_color active:text-white max-md:text-xs  max-md:w-[90px]"
                >
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
