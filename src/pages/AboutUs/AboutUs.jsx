import React, {useContext} from 'react';
import Header from '../../components/Header/Header';
import Container from "@mui/material/Container";
import { userAuthContext } from '../../components/context/userAuthContext';
import Logo from '../../components/Header/Logo/Logo';

const AboutUs = () => {

  const {user, logOutHandler} = useContext(userAuthContext);

  return (
    <main className="main">
      <Header logOutHandler={logOutHandler} user={user} />
      <Container sx={{ pt: 13 }}>
        <h2>
          Share with world is a social app for sharing just images.
          Built using tools like React, Firebase, Material UI, Styled Components and React Router V6. Built by kaybangz &copy;
        </h2>
      </Container>
    </main>
  )
}

export default AboutUs