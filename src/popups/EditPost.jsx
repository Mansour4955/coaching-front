import React, { useState } from "react";
import { URL } from "../data";
import axios from "axios";
import { useLocalStorage } from "../hooks/useLocalStorege";

const EditPost = ({
  setShowEditPost,
  id,
  setTheValueAgain,
  theValueAgain,
  description,
}) => {
  const { getItem } = useLocalStorage("Authorization");
  const [updatedDesc, setUpdatedDesc] = useState(description);
  const [errorDesc, setErrorDesc] = useState("");
  const handleCancelEdit = () => {
    setShowEditPost(false);
  };
  const handleEditPost = () => {
    if (!updatedDesc || updatedDesc.trim() === "") {
      setErrorDesc("Description should not be empty!");
    } else if (updatedDesc) {
      const token = getItem();
      axios
        .put(
          `${URL}/api/posts/${id}`,
          {
            description: updatedDesc,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          setTheValueAgain(true);
          setTimeout(() => {
            setTheValueAgain(false);
          }, 3000);
        })
        .catch((error) => {
          console.log("error updating post ", error.response);
        });
    }
  };
  return (
    <div className=" shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px]  rounded-lg w-[300px] relative">
      <div className=" rounded-lg p-2 flex items-center justify-center flex-col z-20 bg-white">
        <p className="font-semibold text-lg text-main_color">Warning</p>
        <p className="text-gray-600 font-medium">
          Are you sure you want to edit this post's description!
        </p>
        <input
        className="w-full caret-main_color px-2 rounded-lg border-main_color border outline-none mt-1"
          type="text"
          placeholder="Updated description"
          value={updatedDesc}
          onChange={(e) => {
            setUpdatedDesc(e.target.value);
            setErrorDesc("");
          }}
        />
        {errorDesc && <p className="text-red-600 text-sm">{errorDesc}</p>}
        <div className="flex justify-center gap-10 mt-2">
          <p
            onClick={handleEditPost}
            className="px-2 py-0.5 border border-green-600 bg-green-600 active:bg-green-600 active:text-white hover:bg-white hover:text-green-600 text-white duration-100 font-medium cursor-pointer rounded-lg"
          >
            Update
          </p>
          <p
            onClick={handleCancelEdit}
            className="px-2 py-0.5 border border-gray-600 bg-gray-600 active:bg-gray-600 active:text-white hover:bg-white hover:text-gray-600 text-white duration-100 font-medium cursor-pointer rounded-lg"
          >
            Cancel
          </p>
        </div>
      </div>
    </div>
  );
};

export default EditPost;
