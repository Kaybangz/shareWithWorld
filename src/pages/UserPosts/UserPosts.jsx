import React, { useState, useEffect, useContext } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../Firebase/FbConfig";
import { userAuthContext } from "../../components/context/userAuthContext";
import CommentBtn from "../../components/CommentBtn/CommentBtn";
import LikeBtn from "../../components/LikeBtn/LikeBtn";
import CommentBox from "../../components/CommentBox/CommentBox";
import DeletePostBtn from "../../components/DeletePost/DeletePostBtn";
import Avatar from "@mui/material/Avatar";
import VerifiedIcon from "@mui/icons-material/Verified";

const iconStyle = {
  color: "#1D9BF0",
  fontSize: "clamp(1.2rem, 2.5vw, 1.3rem)",
};

const UserPosts = () => {
  const { user } = useContext(userAuthContext);

  const [postList, setPostList] = useState([]);

  const [toggleComment, setToggleComment] = useState(false);

  const postRef = collection(db, "userPost");

  const deletePost = async (id) => {
    const postDoc = doc(db, "userPost", id);
    await deleteDoc(postDoc);
  };

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postRef);
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getPosts();
  }, []);

  return (
    <>
      {postList.map((post) => {
        return (
          <div>
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

                {post.poster.id === user.uid && (
                  <DeletePostBtn deletePost={() => deletePost(post.id)} />
                )}
              </div>

              <div className="bottom-side">
                <span className="caption">
                  <h1>{post.caption}</h1>
                </span>
                <img
                  src="https://media.istockphoto.com/photos/portrait-beautiful-young-woman-with-clean-fresh-skin-picture-id1329622588?k=20&m=1329622588&s=612x612&w=0&h=rTYNojRtwlGG1-8ZK-Sw6iFwXs1r3MVcaKIuUTIhga8="
                  alt=""
                  width="100%"
                  height="50%"
                />

                <section className="time-stamp">
                  <p>Posted on jan 22 2023</p>
                </section>

                <section className="like-comment-icons">
                  <LikeBtn />
                  <CommentBtn
                    toggleComment={toggleComment}
                    setToggleComment={setToggleComment}
                  />
                </section>

                <section className="comment-section">
                  {toggleComment && <CommentBox />}
                </section>
              </div>
            </section>
          </div>
        );
      })}
    </>
  );
};

export default UserPosts;
