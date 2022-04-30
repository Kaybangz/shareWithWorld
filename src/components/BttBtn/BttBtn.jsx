import React, {useState} from "react";
import Button from "@mui/material/Button";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";

const modalBtnStyle = {
  backgroundColor: "#159191",
  color: "white",
  height: "60px",
  width: "20px",
  borderRadius: "50%",
};

const iconStyle = {
  fontSize: "clamp(2rem, 2.5vw, 2.2rem)",
};

const BttBtn = () => {

    const [visibility, setVisibility] = useState(false);

  const toggleVisibility = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300){
      setVisibility(true)
    } 
    else if (scrolled <= 300){
      setVisibility(false)
    }
  };


  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };


  
  window.addEventListener('scroll', toggleVisibility);

  return (
    <div style={{display: visibility ? 'block' : 'none'}}>
      <Button
        style={modalBtnStyle}
        onClick={scrollToTop}
        sx={{ position: "fixed", bottom: 15, right: 15 }}
        size="large"
        className=""
      >
        <ArrowUpwardOutlinedIcon style={iconStyle} />{" "}
      </Button>
    </div>
  );
};

export default BttBtn;
