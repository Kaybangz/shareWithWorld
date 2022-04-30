import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { styled } from "@mui/material/styles";
import { lightBlue } from "@mui/material/colors";
import CameraIcon from "@mui/icons-material/Camera";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import TextField from "@mui/material/TextField";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "95%",
  maxWidth: 500,
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 20,
  p: 4,
};

const modalBtnStyle = {
  backgroundColor: "#159191",
  color: "white",
  height: "43px",
  width: "fit-content",
};

const iconStyle = {
  fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
};

const InputTextField = styled(TextField)({
  fontFamily: "Manrope",
  "& label.Mui-focused": {
    color: lightBlue[800],
    fontFamily: "Manrope",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: lightBlue[800],
    fontFamily: "Manrope",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: lightBlue[600],
      fontFamily: "Manrope",
    },
    "&:hover fieldset": {
      borderColor: lightBlue[800],
      fontFamily: "Manrope",
    },
    "&.Mui-focused fieldset": {
      borderColor: lightBlue[800],
      fontFamily: "Manrope",
    },
  },
});

const UploadButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(lightBlue[500]),
  color: "white",
  fontSize: "clamp(.9rem, 1.5vw, 1rem)",
  height: "3rem",
  fontWeight: "600",
  fontFamily: "Manrope",
  backgroundColor: lightBlue[500],
  "&:hover": {
    backgroundColor: lightBlue[700],
  },
}));

const ModalButton = ({ caption, setCaption, image, setImage, createPost }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //   useEffect(() => {
  //     console.log(caption);
  //   }, [caption]);

  return (
    <div>
      <Button style={modalBtnStyle} onClick={handleOpen} size="medium">
        <p
          style={{
            fontFamily: "Manrope",
            color: "white",
            fontWeight: "700",
            marginRight: ".1rem",
          }}
        >
          Share
        </p>
        <CameraAltOutlinedIcon style={iconStyle} />{" "}
      </Button>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <InputTextField
            sx={{ fontFamily: "Manrope" }}
            fullWidth
            id="outlined-basic"
            type="file"
            variant="outlined"
            label="Upload Image"
            focused
            value={image}
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
          />
          <InputTextField
            fullWidth
            label="Enter Image Caption"
            id="fullWidth"
            sx={{ mt: 3, mb: 3, h: 4, fontFamily: "Manrope" }}
            value={caption}
            onChange={(e) => {
              setCaption(e.target.value);
            }}
          />
          <UploadButton onClick={createPost} fullWidth>
            Upload
          </UploadButton>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalButton;
