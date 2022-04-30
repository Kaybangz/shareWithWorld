import React, { useContext, useEffect, useState } from "react";
import { userAuthContext } from "../../components/context/userAuthContext";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import { lightBlue } from "@mui/material/colors";
// import Avatar from "@mui/material/Avatar";
// import VerifiedIcon from "@mui/icons-material/Verified";
import Container from "@mui/material/Container";
import Header from "../../components/Header/Header";
import ModalButton from "../../components/Modal/Modal";
import BttBtn from "../../components/BttBtn/BttBtn";
// import CommentBtn from "../../components/CommentBtn/CommentBtn";
// import LikeBtn from "../../components/LikeBtn/LikeBtn";
// import CommentBox from "../../components/CommentBox/CommentBox";
// import DeletePostBtn from "../../components/DeletePostBtn/DeletePostBtn";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../Firebase/FbConfig";
import UserPosts from "../UserPosts/UserPosts";

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

const iconStyle = {
  color: "#1D9BF0",
  fontSize: "clamp(1.2rem, 2.5vw, 1.3rem)",
};

const MainPage = () => {
  const { user, logOut } = useContext(userAuthContext);

  const [caption, setCaption] = useState("");
  const [image, setImage] = useState();

  // const [toggleComment, setToggleComment] = useState(false);

  const postRef = collection(db, "userPost");

  const createPost = async () => {
    await addDoc(postRef, {
      caption: caption,
      poster: {
        name: user.displayName,
        id: user.uid,
        email: user.email,
        verified: user.emailVerified,
        thumbNail: user.photoURL,
      },
      timeStamp: new Date()
    });

    setCaption("");
  };

  const logOutHandler = async () => {
    try {
      await logOut();
    } catch (err) {
      console.log(err);
    }
  };

  // useEffect(() => {
  //   const getPosts = async () => {
  //     const data = await getDocs(postRef);
  //     setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  //   };

  //   getPosts();
  // }, []);

  return (
    <main className="main">
      <Header logOutHandler={logOutHandler} user={user} />
      <Container sx={{ pt: 13 }}>
        <section className="welcome__user">
          <div className="avatar__name">
            {/* {user?.photoURL ? (
              <Avatar
                sx={{
                  maxWidth: 70,
                  maxHeight: 70,
                  width: 60,
                  height: 60,
                  mb: 1,
                }}
                src={user.photoURL}
              ></Avatar>
            ) : (
              <Avatar
                sx={{
                  maxWidth: 70,
                  maxHeight: 70,
                  width: 60,
                  height: 60,
                  mb: 1,
                }}
                src={user.photoURL}
              ></Avatar>
            )} */}

            {user?.displayName ? (
              <h1>Welcome, {user.displayName.split(" ")[1]}</h1>
            ) : (
              <h1>Welcome, User</h1>
            )}
          </div>

          <h2>Ready to start sharing with the world?</h2>

          <ModalButton
            caption={caption}
            setCaption={setCaption}
            image={image}
            setImage={setImage}
            createPost={createPost}
          />
        </section>
        <UserPosts />
      </Container>
      <BttBtn />
    </main>
  );
};

export default MainPage;
