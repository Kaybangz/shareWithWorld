import React from "react";
import Input from "@mui/material/Input";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import { lightBlue } from "@mui/material/colors";

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(lightBlue[500]),
  color: "white",
  fontSize: "clamp(.7rem, 1.5vw, 1rem)",
  fontWeight: "600",
  fontFamily: "Manrope",
  backgroundColor: lightBlue[500],
  "&:hover": {
    backgroundColor: lightBlue[700],
  },
}));

const ariaLabel = { "aria-label": "description" };

const CommentBox = () => {
  return (
    <>
      <span>
        <Input
          placeholder="leave a comment..."
          inputProps={ariaLabel}
          sx={{ mr: 1, width: "69%", fontFamily: "Manrope" }}
        />
        <ColorButton>comment</ColorButton>
      </span>
    </>
  );
};

export default CommentBox;
