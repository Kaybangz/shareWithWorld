import React, { useContext, useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { userAuthContext } from "../context/userAuthContext";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../Firebase/FbConfig";

const LikeBtn = ({ likes, id }) => {
  const { user } = useContext(userAuthContext);


  const likesRef = doc(db, "userPost", id);

  const handleLikePost = async () => {
    if (likes?.includes(user.uid)) {
      await updateDoc(likesRef, {
        likes: arrayRemove(user.uid),
      })
        .then(() => {
          console.log("unliked");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      await updateDoc(likesRef, {
        likes: arrayUnion(user.uid),
      })
        .then(() => {
          console.log("liked")
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <span className="like-icon">
        {!likes?.includes(user.uid) ? (
          <FavoriteBorderIcon
            sx={{
              fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
              cursor: "pointer",
              color: "#6cd3d3",
            }}
            onClick={handleLikePost}
            className="like-btn"
          />
        ) : (
          <FavoriteIcon
            sx={{
              fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
              cursor: "pointer",
              color: "#6cd3d3",
            }}
            onClick={handleLikePost}
            className="like-btn"
          />
        )}

        <p>{likes.length}</p>
      </span>
    </>
  );
};

export default LikeBtn;
