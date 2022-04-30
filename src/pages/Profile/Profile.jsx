import React, { useContext } from "react";
import Header from "../../components/Header/Header";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import { userAuthContext } from "../../components/context/userAuthContext";
import VerifiedIcon from "@mui/icons-material/Verified";

const iconStyle = {
  color: "#1D9BF0",
  fontSize: "clamp(1.2rem, 2.5vw, 1.3rem)",
};

const Profile = () => {
  const { user, logOutHandler } = useContext(userAuthContext);

  return (
    <main className="main">
      <Header logOutHandler={logOutHandler} user={user} />
      <Container sx={{ pt: 12 }}>
        <section className="user-profile">
          {user?.photoURL ? (
            <Avatar
              sx={{
                width: 80,
                height: 80,
                mb: 1,
              }}
              src={user.photoURL}
            ></Avatar>
          ) : (
            <Avatar
              sx={{
                width: 80,
                height: 80,
                mb: 1,
              }}
            ></Avatar>
          )}

          <span>
            {user?.displayName ? (
              <h3>
                {user.displayName.split(" ")[1]}
                {user?.emailVerified && <VerifiedIcon style={iconStyle} />}
              </h3>
            ) : (
              <h3>User</h3>
            )}
          </span>

          <span>{user?.email && <h4>{user.email}</h4>}</span>

          <span>
            {user?.phoneNumber ? (
              <h4>{user.phoneNumber}</h4>
            ) : (
              <h4>~No phone number~</h4>
            )}
          </span>
        </section>

        <section className="user-posts">
          <h2>Your posts</h2>
        </section>
      </Container>
    </main>
  );
};

export default Profile;
