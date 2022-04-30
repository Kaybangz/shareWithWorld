import React from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const LikeBtn = () => {
  return (
    <>
      <span className="like-icon">
        <FavoriteBorderIcon
          sx={{
            fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
            cursor: "pointer",
            color: "rgb(83, 81, 81)",
          }}
        />
        <p>0</p>
      </span>
    </>
  );
};

export default LikeBtn;
