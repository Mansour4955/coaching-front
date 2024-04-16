import PublishedPost from "../cards/PublishedPost";
import Footer from "../components/Footer";
import { coachCardInfo, postInfo } from "../data";
import { useParams } from "react-router-dom";

const CoachProfile = () => {
  const { coachProfileId } = useParams();
  const coachProfileInfo = coachCardInfo.find(
    (coachInfo) => coachInfo.id === parseInt(coachProfileId)
  );
  const coachProfilePosts = postInfo.filter(
    (coachPosts) => coachPosts.id === parseInt(coachProfileId)
  );
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
      <div className="w-[60%]  flex-col flex ">
        <div className="flex flex-col gap-6">
          <div className="bg-white p-4">
            <div className="bg-white p-4 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-lg">
              <div className="flex flex-col gap-3">
                <img
                  className="w-[200px] h-[200px] rounded-full mx-auto"
                  alt={imageUrl}
                  src={imageUrl}
                />
                <div className="mt-3 flex flex-col gap-3">
                  <p className="font-semibold text-lg">
                    {name}{" "}
                    <span className="text-main_color font-medium text-sm">
                      {profession}
                    </span>
                  </p>
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
