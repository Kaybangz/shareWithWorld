import React from "react";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";

const CommentBtn = ({comments}) => {
  return (
    <>
      <span className="comment-icon">
        <ModeCommentOutlinedIcon
          sx={{
            fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
            cursor: "pointer",
            color: "#6cd3d3",
          }}
        />
        <p>{comments.length}</p>
      </span>
    </>
  );
};

export default CommentBtn;
