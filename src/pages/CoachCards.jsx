import React, { useState } from "react";
import Footer from "../components/Footer";
import { coachCardInfo } from "../data";
import CoachSingleCard from "../cards/CoachSingleCard";

const CoachCards = () => {
  const [showAllCards, setShowAllCards] = useState(false);
  return (
    <div className="flex gap-x-10 pt-5 px-4 bg-white_color">
      <div className="w-[80%] justify-items-center bg-white p-4 grid grid-cols-3 gap-5 max-xl:grid-cols-2 max-sm:grid-cols-1 max-lg:w-[100%]">
        {showAllCards
          ? coachCardInfo
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
          className="flex items-center justify-center px-4 border border-main_color rounded-xl font-semibold hover:text-main_color duration-300 hover:bg-white bg-main_color max-sm:col-span-1 text-white col-span-3 max-xl:col-span-2"
        >
          {showAllCards ? "See less" : "See more"}
        </button>
      </div>
      <div className="w-[20%] p-4 bg-white h-fit max-lg:hidden">
        <div className="shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-lg w-full">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default CoachCards;
