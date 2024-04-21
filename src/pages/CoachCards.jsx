import React, { useState } from "react";
import Footer from "../components/Footer";
import { coachCardInfo } from "../data";
import CoachSingleCard from "../cards/CoachSingleCard";
import { IoFilterCircleOutline, IoFilterCircle } from "react-icons/io5";
import { models, cities, methods } from "../data";
import { IoSearchOutline } from "react-icons/io5";
const CoachCards = () => {
  const [showAllCards, setShowAllCards] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("");
  const [filterByName, setFilterByName] = useState("");
  const [maxPrice, setMaxPrice] = useState(1000);
  const handleFilter = (e) => {
    e.preventDefault();
    setShowFilter(false);
    console.log(selectedModel);
    console.log(selectedCity);
    console.log(selectedMethod);
    console.log(filterByName);
    console.log(maxPrice);
  };
  const handleFilterBySearch = (e) => {
    e.preventDefault();
    setShowFilter(false);
    console.log(filterByName);
  };
  return (
    <div className="flex justify-center  gap-x-10 pt-5 px-4 bg-white_color">
      <div className="w-[70%] flex flex-col gap-10">
       <div>
       <div className="flex justify-center p-4 bg-white">
          <div className="flex  gap-2">
            <div className="flex">
              <input
                type="text"
                className="caret-main_color border text-gray-500 font-medium  border-r-0 border-main_color rounded-l-xl px-2 outline-none py-1"
                placeholder="Search"
                value={filterByName}
                onChange={(e) => setFilterByName(e.target.value)}
              />
              <div
                onClick={handleFilterBySearch}
                className="flex items-center justify-center rounded-r-xl border border-main_color border-l-0 px-2 py-1 text-main_color font-bold cursor-pointer hover:bg-white_color duration-300"
              >
                <IoSearchOutline size={20} />
              </div>
            </div>
            <div className="flex relative">
              <p
                className="flex items-center duration-150 cursor-pointer text-main_color"
                onClick={() => setShowFilter(!showFilter)}
              >
                {!showFilter ? (
                  <IoFilterCircleOutline size={24} />
                ) : (
                  <IoFilterCircle size={24} />
                )}
              </p>
              {showFilter && (
                <div className=" absolute top-[100%] max-md:right-0 max-md:left-auto max-md:-translate-x-0 left-2/4 -translate-x-2/4 z-40 bg-white rounded-lg p-4">
                  <div className="flex flex-col gap-2 p-4 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-lg">
                    <div className="flex flex-col">
                      <label className="text-main_color text-xs ml-1">
                        Filter by model
                      </label>
                      <select
                        onChange={(e) => setSelectedModel(e.target.value)}
                        className="outline-none"
                      >
                        {models.map((model) => (
                          <option className="outline-none" key={model.id}>
                            {model.model}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex flex-col">
                      <label className="text-main_color text-xs ml-1">
                        Filter by city
                      </label>
                      <select
                        onChange={(e) => setSelectedCity(e.target.value)}
                        className="outline-none"
                      >
                        {cities.map((city) => (
                          <option className="outline-none" key={city.id}>
                            {city.city}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex flex-col">
                      <label className="text-main_color text-xs ml-1">
                        Filter by method
                      </label>
                      <select
                        onChange={(e) => setSelectedMethod(e.target.value)}
                        className="outline-none"
                      >
                        {methods.map((method) => (
                          <option className="outline-none" key={method.id}>
                            {method.meetingType}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex flex-col">
                      <label className="text-main_color text-xs ml-1">
                        Filter by max price
                      </label>
                      <input
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        type="number"
                        placeholder="Max price"
                        className="rounded-md outline-none border border-main_color px-1 caret-main_color"
                      />
                    </div>
                    <button
                      onClick={handleFilter}
                      className="flex items-center justify-center px-2 border border-main_color rounded-xl font-semibold text-main_color duration-300 hover:bg-main_color hover:text-white"
                    >
                      Filter
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className=" justify-items-center bg-white p-4 grid grid-cols-3 gap-5 max-xl:grid-cols-2 max-lg:grid-cols-1 ">
          {showAllCards
            ? coachCardInfo.map((card) => (
                <CoachSingleCard
                  id={card.id}
                  name={card.name}
                  city={card.city}
                  method={card.method}
                  profession={card.profession}
                  course={card.course}
                  diplomas={card.diplomas}
                  price={card.price}
                  imageUrl={card.imageUrl}
                />
              ))
            : coachCardInfo
                .slice(0, 6)
                .map((card) => (
                  <CoachSingleCard
                    id={card.id}
                    name={card.name}
                    city={card.city}
                    method={card.method}
                    profession={card.profession}
                    course={card.course}
                    diplomas={card.diplomas}
                    price={card.price}
                    imageUrl={card.imageUrl}
                  />
                ))}
          <button
            onClick={() => setShowAllCards(!showAllCards)}
            className="flex items-center justify-center px-4 border border-main_color rounded-xl font-semibold hover:text-main_color duration-300 hover:bg-white bg-main_color max-lg:col-span-1 text-white col-span-3 max-xl:col-span-2"
          >
            {showAllCards ? "See less" : "See more"}
          </button>
        </div>
       </div>
        <div className="flex justify-center p-4 bg-white">
          <div className="w-full p-4 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-lg">
           <Footer/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoachCards;
