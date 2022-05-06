import React, { useContext } from "react";
import Header from "../../components/Header/Header";
import Container from "@mui/material/Container";
import { userAuthContext } from "../../components/context/userAuthContext";

const AboutUs = () => {
  const { user } = useContext(userAuthContext);

  return (
    <main className="main">
      <Header user={user} />
      <Container sx={{ pt: 13 }}>
        <h2>Share with world is a social app for sharing your beautiful images with the world.</h2>
        <h2>
          Built using React, Firebase, Material UI, Styled Components and React
          Router V6.
        </h2>
        <h2> Built by kaybangz &copy;</h2>
      </Container>
    </main>
  );
};

export default AboutUs;
