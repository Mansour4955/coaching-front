import { useEffect, useState } from "react";

const StarRating = ({ onRate, counter }) => {
  const [rating, setRating] = useState(0);

  const handleStarClick = (value) => {
    setRating(value);
    onRate(value);
  };
  useEffect(() => {
    setRating(0);
  }, [counter]);
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((value) => (
        <span
          key={value}
          className={`cursor-pointer text-xl ${
            value <= rating ? "text-yellow-500" : "text-gray-300"
          }`}
          onClick={() => handleStarClick(value)}
        >
          &#9733;
        </span>
      ))}
    </div>
  );
};

export default StarRating;
