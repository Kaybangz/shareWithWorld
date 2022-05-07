import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import { userAuthContext } from "../../components/context/userAuthContext";
import VerifiedIcon from "@mui/icons-material/Verified";
import { collection, orderBy, query, onSnapshot } from "firebase/firestore";
import { db } from "../../Firebase/FbConfig";

const iconStyle = {
  color: "#1D9BF0",
  fontSize: "clamp(1.2rem, 2.5vw, 1.3rem)",
};

const Profile = () => {
  const { user } = useContext(userAuthContext);

  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const postRef = collection(db, "userPost");

    const q = query(postRef, orderBy("timeStamp", "desc"));

    onSnapshot(q, (snapshot) => {
      const posts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setUserPosts(posts);
    });
  }, []);

  return (
    <main className="main">
      <Header user={user} />
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

        <section className="posts-heading">
          <h2>My posts</h2>
        </section>

        <div className="post-container">
          {userPosts
            .filter((post) => post.poster.id === user.uid)
            .map((userPost) => {
              return (
                <section className="post-wrapper" key={userPost.id}>
                  <h1>{userPost.caption}</h1>
                  <img
                    src={userPost.poster.imageURL}
                    alt={userPost.poster.name}
                    width="100%"
                    loading="lazy"
                  />
                </section>
              );
            })}
        </div>
      </Container>
    </main>
  );
};

export default Profile;
