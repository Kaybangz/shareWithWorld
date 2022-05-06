import React, { useState, useContext } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import Alert from "@mui/material/Alert";
import { lightBlue } from "@mui/material/colors";
import Logo from "../Header/Logo/Logo";
import { Link, useNavigate } from "react-router-dom";
import { userAuthContext } from "../context/userAuthContext";

// INPUT STYLING
const InputTextField = styled(TextField)({
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

// BUTTON STYLING
const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(lightBlue[500]),
  color: "white",
  fontSize: "clamp(.8rem, 1.5vw, 1rem)",
  fontWeight: "600",
  fontFamily: "Manrope",
  backgroundColor: lightBlue[500],
  "&:hover": {
    backgroundColor: lightBlue[700],
  },
}));

const SignUpForm = () => {
  //FOR REDIRECTING THE USER TO LOGIN PAGE IF PAGE IF EMAIL AND PASSWORD IS SUCCESSFULLY CREATED
  const navigate = useNavigate();

  //MANAGING THE STATE OF THE EMAIL
  const [email, setEmail] = useState("");
  //MANAGING THE STATE OF THE PASSWORD
  const [password, setPassword] = useState("");

  //MANAGING THE ERROR MESSAGE
  const [error, setError] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  //GETTING THE VALUES FROM THE USERAUTHCONTEXT
  const { signUp } = useContext(userAuthContext);

  //FUNCTION FOR HANDLING SIGN UP
  const submitHandler = async () => {
    try {
      await signUp(email, password);
      // IF EMAIL AND PASSWORD IS VALID, REDIRECT USER TO LOGIN PAGE
      navigate("/");
    } catch (err) {
      setError(true);
      setErrMsg(err.message);
    }

    setTimeout(() => setError(false), 3000);
  };

  return (
    <main className="form__container">
      <Container maxWidth="sm">
        <h1>
          Welcome to{" "}
          <span>
            <Logo />
          </span>{" "}
        </h1>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { width: "100%" },
          }}
          noValidate
          autoComplete="off"
        >
          {error && (
            <Alert className="alert" variant="filled" severity="error">
              {errMsg}
            </Alert>
          )}

          {/* TEXTFIELD FOR EMAIL */}
          <InputTextField
            id="outlined-email-input"
            label="Email address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* TEXTFIELD FOR PASSWORD */}
          <InputTextField
            id="outlined-password-input"
            label="Password"
            type="password"
            style={{ marginTop: "1rem" }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <section>
            <ColorButton
              onClick={submitHandler}
              style={{ marginTop: "1rem" }}
              variant="contained"
            >
              Sign Up
            </ColorButton>
          </section>

          <section className="sign_up_link">
            <h3>
              Already have an account? <Link to="/">Log In</Link>
            </h3>
          </section>
        </Box>
      </Container>
    </main>
  );
};

export default SignUpForm;
