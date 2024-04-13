import React from "react";
import { coachStatic, coachCard } from "../data";
import CoachStatisticsCard from "../cards/CoachStatisticsCard";
import CoachCard from "../cards/CoachCard";
const Home = () => {
  return (
    <div className="flex gap-x-10 pt-5 px-4 bg-white_color">
      <div className="w-[20%] flex flex-col rounded-lg p-4 bg-white gap-y-3">
        {coachStatic.map((card) => (
          <CoachStatisticsCard
            key={card.id}
            full_name={card.full_name}
            email={card.email}
            company={card.company}
            description={card.description}
            followers={card.followers}
            following={card.following}
            profilePhoto={card.profilePhoto}
            id={card.id}
          />
        ))}
      </div>
      <div className="w-[60%]">section two</div>
      <div className="w-[20%] flex flex-col rounded-lg p-4 bg-white gap-y-3">
        {coachCard.map((card) => (
          <CoachCard
            key={card.id}
            full_name={card.full_name}
            description={card.description}
            profilePhoto={card.profilePhoto}
            id={card.id}
            domaine={card.domaine}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
