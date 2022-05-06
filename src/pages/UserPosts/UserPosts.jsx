import React, { useState, useEffect, useContext } from "react";
import {
  collection,
  deleteDoc,
  doc,
  orderBy,
  query,
  onSnapshot,
} from "firebase/firestore";
import { db, storage } from "../../Firebase/FbConfig";
import { userAuthContext } from "../../components/context/userAuthContext";
import CommentBtn from "../../components/CommentBtn/CommentBtn";
import LikeBtn from "../../components/LikeBtn/LikeBtn";
import DeletePostBtn from "../../components/DeletePost/DeletePostBtn";
import { css } from "@emotion/react";
import Avatar from "@mui/material/Avatar";
import VerifiedIcon from "@mui/icons-material/Verified";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";
import { deleteObject, ref } from "firebase/storage";
import { Link } from "react-router-dom";

const iconStyle = {
  color: "#1D9BF0",
  fontSize: "clamp(1.2rem, 2.5vw, 1.3rem)",
};

const spinnerStyle = css`
  margin-left: 0.2rem;
  border-color: #159191;
`;

const UserPosts = ({ logOutHandler }) => {
  const { user } = useContext(userAuthContext);

  const [postList, setPostList] = useState([]);

  const deletePost = async (id, imageURL) => {
    try {
      const postDoc = doc(db, "userPost", id);
      toast("Post deleted successfully", { type: "success" });
      await deleteDoc(postDoc);
      const storageRef = ref(storage, imageURL);
      await deleteObject(storageRef);
    } catch (err) {
      toast("Something went wrong, couldn't delete post", { type: "error" });
    }
  };

  useEffect(() => {
    const postRef = collection(db, "userPost");

    const q = query(postRef, orderBy("timeStamp", "desc"));

    onSnapshot(q, (snapshot) => {
      const posts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setPostList(posts);
    });
  }, []);

  return (
    <>
      {postList.length === 0 ? (
        <div className="no-post-text">
          <h4>Loading posts</h4>
          <ClipLoader css={spinnerStyle} size={17} />
        </div>
      ) : (
        postList.map((post) => {
          return (
            <div key={post.id}>
              <section className="user__info">
                <div className="top-side">
                  <div className="image-text">
                    <span>
                      {post.poster.thumbNail ? (
                        <Avatar
                          sx={{
                            maxWidth: 70,
                            maxHeight: 70,
                            width: 50,
                            height: 50,
                            mb: 1,
                          }}
                          src={post.poster.thumbNail}
                        ></Avatar>
                      ) : (
                        <Avatar
                          sx={{
                            maxWidth: 70,
                            maxHeight: 70,
                            width: 50,
                            height: 50,
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

                        <h4>@{post.poster.email}</h4>
                      </span>
                    </div>
                  </div>

                  {/* ONLY SHOW THE DELETE BUTTON FOR THE OP */}
                  {post.poster.id === user.uid && (
                    <DeletePostBtn
                      deletePost={() =>
                        deletePost(post.id, post.poster.imageURL)
                      }
                    />
                  )}
                </div>

                {/* POST CAPTION AND IMAGE */}
                <div className="bottom-side">
                  <span className="caption">
                    <h1>{post.caption}</h1>
                  </span>
                  <img
                    src={post.poster.imageURL}
                    alt=""
                    loading="lazy"
                    width="100%"
                  />

                  {/* TIME STAMP, LIKES AND COMMENTS BUTTON */}
                  <section className="time-stamp">
                    <p>
                      Posted on {post.timeStamp.toDate().toDateString()} at{" "}
                      {post.timeStamp.toDate().toLocaleTimeString()}
                    </p>
                  </section>

                  <section className="like-comment-icons">
                    <LikeBtn likes={post.likes} id={post.id} />
                    <Link
                      style={{ textDecoration: "none" }}
                      to={`/commentPage/${post.id}`}
                    >
                      <CommentBtn comments={post.comments} />
                    </Link>
                  </section>
                </div>
              </section>
            </div>
          );
        })
      )}
    </>
  );
};

export default UserPosts;
