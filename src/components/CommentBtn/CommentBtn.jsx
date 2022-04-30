import React from "react";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";

const CommentBtn = ({ toggleComment, setToggleComment }) => {
  return (
    <>
      <span
        className="comment-icon"
        onClick={() => setToggleComment(!toggleComment)}
      >
        <ModeCommentOutlinedIcon
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

export default CommentBtn;
