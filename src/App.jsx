import React, { Fragment, useState, useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "./Firebase/FbConfig";
import { userAuthContext } from "./components/context/userAuthContext";
import LogInForm from "./components/LogInForm/LogInForm";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import MainPage from "./pages/MainPage/MainPage";
import Profile from "./pages/Profile/Profile";
import AboutUs from "./pages/AboutUs/AboutUs";
import ProtectedRoutes from "./pages/ProtectedRoutes/ProtectedRoutes";
import CommentBox from "./components/CommentBox/CommentBox";

const App = () => {
  const [user, setUser] = useState({});
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  // FUNCTION FOR SIGNUP AUTHENTICATION
  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // FUNCTION FOR LOGIN AUTHENTICATION
  const logIn = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password).then(
      (result) => {
        localStorage.setItem("isAuth", true);
        setIsAuth(true);
      }
    );
  };

  //FUNCTION FOR GOOGLE SIGN IN
  const googleSignIn = async () => {
    const googleAuthProvider = new GoogleAuthProvider();
    return await signInWithPopup(auth, googleAuthProvider).then((result) => {
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
    });
  };

  //FUNCTION FOR LOG OUT
  const logOut = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <userAuthContext.Provider
      value={{ user, signUp, logIn, logOut, googleSignIn }}
    >
      <Fragment>
        <Routes>
          <Route path="/" element={<LogInForm />} />
          <Route path="/signupform" element={<SignUpForm />} />
          <Route
            path="/mainPage"
            element={
              <ProtectedRoutes>
                <MainPage />
              </ProtectedRoutes>
            }
          ></Route>

          <Route
            path="/profile"
            element={
              <ProtectedRoutes>
                <Profile />
              </ProtectedRoutes>
            }
          ></Route>

          <Route
            path="/about-us"
            element={
              <ProtectedRoutes>
                <AboutUs />
              </ProtectedRoutes>
            }
          ></Route>

          <Route
            path="/commentPage/:id"
            element={
              <ProtectedRoutes>
                <CommentBox />
              </ProtectedRoutes>
            }
          ></Route>
        </Routes>
      </Fragment>
    </userAuthContext.Provider>
  );
};

export default App;
