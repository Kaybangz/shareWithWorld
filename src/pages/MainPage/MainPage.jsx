import React, { useContext, useState } from "react";
import { userAuthContext } from "../../components/context/userAuthContext";
import Container from "@mui/material/Container";
import Header from "../../components/Header/Header";
import ModalButton from "../../components/Modal/Modal";
import BttBtn from "../../components/BttBtn/BttBtn";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../../Firebase/FbConfig";
import UserPosts from "../UserPosts/UserPosts";
import { ToastContainer, toast } from "react-toastify";
import "../../App.css";

const MainPage = () => {
  const { user } = useContext(userAuthContext);

  // STATES FOR CONTROLLING THE CAPTION AND IMAGE FILE INPUT
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);

  //MANAGING THE ERROR MESSAGE
  const [error, setError] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  //STATE FOR FILE PROGRESS
  const [fileProgress, setFileProgress] = useState(0);

  const createPost = async () => {
    //CHECK IF FILE INPUT FOR IMAGE IS EMPTY
    if (image === null) {
      setError(true);
      setErrMsg("Please select an image");
      return;
    }

    //REF FOR STORING IMAGE IN FIREBASE STORAGE
    const storageRef = ref(storage, `/images/${Date.now()}${image.name}`);

    const uploadedImage = uploadBytesResumable(storageRef, image);

    uploadedImage.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        setFileProgress(progress);
      },
      (err) => {
        setErrMsg(err);
      },
      () => {
        setCaption("");
        setImage(null);

        getDownloadURL(uploadedImage.snapshot.ref).then((url) => {
          // STORING USER INFORMATION AND POST IN FIREBASE FIRESTORE
          const postRef = collection(db, "userPost");
          addDoc(postRef, {
            caption: caption,
            poster: {
              name: user.displayName,
              id: user.uid,
              email: user.email,
              verified: user.emailVerified,
              thumbNail: user.photoURL,
              imageURL: url,
            },
            likes: [],
            comments: [],
            timeStamp: Timestamp.now().toDate(),
          })
            .then(() => {
              toast("Post uploaded successfully", { type: "success" });
              setFileProgress(0);
            })
            .catch(() => {
              toast("There was a problem uploading the post", {
                type: "error",
              });
            });
        });
      }
    );

    setCaption("");
    setImage("");

    setTimeout(() => setError(false), 3000);
  };

  return (
    <main className="main">
      <ToastContainer />
      <Header user={user} />
      <Container sx={{ pt: 13 }}  maxWidth="md">
        <section className="welcome__user">
          <div className="avatar__name">
            {user?.displayName ? (
              <h1>Welcome {user.displayName.split(" ")[1]},</h1>
            ) : (
              <h1>Welcome {user.email},</h1>
            )}
          </div>

          <h2>Ready to start sharing with the world?</h2>

          <ModalButton
            caption={caption}
            setCaption={setCaption}
            image={image}
            setImage={setImage}
            createPost={createPost}
            error={error}
            errMsg={errMsg}
            fileProgress={fileProgress}
          />
        </section>
        <UserPosts image={image} />
      </Container>
      <BttBtn />
    </main>
  );
};

export default MainPage;
