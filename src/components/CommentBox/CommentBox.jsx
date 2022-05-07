import React, { useState, useEffect, useContext } from "react";
import Input from "@mui/material/Input";
import { styled } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import DeleteOutlineSharpIcon from "@mui/icons-material/DeleteOutlineSharp";
import VerifiedIcon from "@mui/icons-material/Verified";
import { Button } from "@mui/material";
import { lightBlue } from "@mui/material/colors";
import {
  arrayRemove,
  arrayUnion,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../Firebase/FbConfig";
import Header from "../Header/Header";
import { userAuthContext } from "../context/userAuthContext";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

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
  fontSize: "clamp(.9rem, 2.5vw, 1.3rem)",
};

const deleteIconStyle = {
  color: "#2476ad",
  fontSize: "clamp(1.2rem, 2.5vw, 1.3rem)",
  cursor: "pointer",
};

const ariaLabel = { "aria-label": "description" };

const CommentBox = () => {
  // GETTING USER FROM USERAUTHCONTEXT
  const { user } = useContext(userAuthContext);

  // GETTING ID FROM REACT ROUTER USEPARAMS HOOK
  const { id } = useParams();

  // EMPTY ARRAY FOR THE COMMENTS
  const [comments, setComments] = useState([]);

  // STATE FOR CONTROLLING THE COMMENT INPUT
  const [comment, setComment] = useState("");

  // STATE FOR MANAGING USERPOST FROM FIREBASE DATABASE
  const [post, setPost] = useState(null);

  const commentRef = doc(db, "userPost", id);

  // GETTING USERPOST FROM DATABASE
  useEffect(() => {
    const dRef = doc(db, "userPost", id);
    onSnapshot(dRef, (snapshot) => {
      setPost({ ...snapshot.data(), id: snapshot.id });
      setComments(snapshot.data().comments.reverse());
    });
  }, []);

  // FUNCTION FOR POSTING COMMENT
  const postComment = () => {
    if (comment) {
      updateDoc(commentRef, {
        comments: arrayUnion({
          userId: user.uid,
          userImage: user.photoURL,
          userName: user.displayName,
          userEmail: user.email,
          userVerified: user.emailVerified,
          comment: comment,
          commentID: uuidv4(),
        }),
      }).then(() => {
        setComment("");
      });
    }
  };

  // FUNCTION FOR DELETING COMMENT
  const deleteComment = (comment) => {
    updateDoc(commentRef, {
      comments: arrayRemove(comment),
    })
      .then(() => {
        toast("Comment deleted", { type: "success" });
      })
      .catch((err) => {
        toast("Could not delete comment", { type: "error" });
      });
  };

  return (
    <>
      <main className="main">
        <Header user={user} />
        <Container sx={{ pt: 13 }}>
          {post && (
            <section>
              <div className="top-side">
                <div className="image-text">
                  <span>
                    {post.poster.thumbNail ? (
                      <Avatar
                        sx={{
                          maxWidth: 70,
                          maxHeight: 70,
                          width: 40,
                          height: 40,
                          mb: 1,
                        }}
                        src={post.poster.thumbNail}
                      ></Avatar>
                    ) : (
                      <Avatar
                        sx={{
                          maxWidth: 70,
                          maxHeight: 70,
                          width: 40,
                          height: 40,
                          mb: 1,
                        }}
                      ></Avatar>
                    )}
                  </span>
                  <div className="top-side-text">
                    <span className="name-email">
                      {post.poster.name ? (
                        <h3>
                          {post.poster.name.split(" ")[1]}{" "}
                          {post.poster.verified && (
                            <VerifiedIcon style={iconStyle} />
                          )}
                        </h3>
                      ) : (
                        <h3>User</h3>
                      )}

                      <h4>{post.poster.email}</h4>
                    </span>
                  </div>
                </div>
              </div>

              <div className="commentPage-bottom-side">
                <span className="caption">
                  <h1>{post.caption}</h1>
                </span>
                <img
                  src={post.poster.imageURL}
                  alt=""
                  width="100%"
                  height="100%"
                />

                <section className="time-stamp">
                  <p>
                    Posted on {post.timeStamp.toDate().toDateString()} at{" "}
                    {post.timeStamp.toDate().toLocaleTimeString()}
                  </p>
                </section>
              </div>

              <span>
                <Input
                  placeholder="leave a comment..."
                  inputProps={ariaLabel}
                  sx={{
                    mr: 1,
                    width: "74%",
                    fontFamily: "Manrope",
                    mt: 3,
                    mb: 5,
                  }}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <ColorButton onClick={postComment}>comment</ColorButton>
              </span>

              {/* COMMENT SECTION STARTS HERE */}
              {comments !== null &&
                comments.map(
                  ({
                    commentID,
                    userId,
                    comment,
                    userName,
                    userImage,
                    userVerified,
                    userEmail,
                  }) => {
                    return (
                      <section key={commentID} className="comment-container">
                        <div className="comment-top-side">
                          <article>
                            <span>
                              {userImage ? (
                                <Avatar
                                  sx={{
                                    maxWidth: 70,
                                    maxHeight: 70,
                                    width: 30,
                                    height: 30,
                                    mb: 1,
                                    mr: 1,
                                  }}
                                  src={userImage}
                                ></Avatar>
                              ) : (
                                <Avatar
                                  sx={{
                                    maxWidth: 70,
                                    maxHeight: 70,
                                    width: 30,
                                    height: 30,
                                    mb: 1,
                                    mr: 1,
                                  }}
                                ></Avatar>
                              )}
                            </span>
                            <div className="comment-top-side-text">
                              {userName ? (
                                <h1>
                                  {userName}
                                  {userVerified && (
                                    <VerifiedIcon style={iconStyle} />
                                  )}
                                </h1>
                              ) : (
                                <h1>{userEmail}</h1>
                              )}
                            </div>
                          </article>

                          <span>
                            {userId === user.uid && (
                              <DeleteOutlineSharpIcon
                                onClick={() =>
                                  deleteComment({
                                    commentID,
                                    userId,
                                    comment,
                                    userName,
                                    userImage,
                                    userVerified,
                                    userEmail,
                                  })
                                }
                                style={deleteIconStyle}
                              />
                            )}
                          </span>
                        </div>
                        <h2>{comment}</h2>
                        {post.poster.id !== user.uid && (
                          <p>
                            Replying to{" "}
                            {post.poster.name
                              ? post.poster.name
                              : post.poster.email}
                            's post
                          </p>
                        )}
                      </section>
                    );
                  }
                )}
            </section>
          )}
        </Container>
      </main>
    </>
  );
};

export default CommentBox;
