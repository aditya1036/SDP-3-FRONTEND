import React from "react";
import "./Posts.css";
import { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import IndividualPost from "./IndividualPost";
import { Skeleton } from "@mui/material";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/UserContext/UserSlice";

export default function Posts({ posts, setPosts }) {

  const user = useSelector(selectUser)
  const [isLoading, setIsLoading] = useState(true);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  var last = false;
  var page = 0;
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    fetchPosts();

    window.addEventListener("scroll", handleScroll);
  }, []);

  const fetchPosts = () => {
    setIsLoading(true);

    fetch(`https://secure-stream-79742.herokuapp.com/api/post/getallposts?pageNo=${page}`, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("token")).token
        }`,
      },
    })
      .then((data) => data.json())
      .then((data) => {
        
        setPosts((posts) => [...posts, ...data.content]);
        last = data.last;
        setIsFirstLoad(false);
        
        // dispatch(updateImage())

        setIsLoading(false);
      })
      .catch((e) => {
        // console.log(e);
      });
  };

  const handleScroll = () => {
    if (
      Math.ceil(window.innerHeight + window.scrollY) >=
      document.documentElement.offsetHeight
    ) {
      if (last) {
        return;
      }
      page = page + 1;
      fetchPosts();
    }
  };

  return (
    <>
      {isFirstLoad ? (
        <div>
          <SkeletonPosts />
          <SkeletonPosts />
          <SkeletonPosts />
       
      </div>
      ) : (
        <>
          {posts.length ? (
            <>
              {posts.map((post) => (
                <IndividualPost key={post.id} post={post} />
              ))}
            </>
          ) : null}
        </>
      )}
      {last && (
        <div>
          <div>
            Loading . . . <CircularProgress disableShrink />
          </div>
        </div>
      )}
    </>
  );
}


const SkeletonPosts = () => {
  return  <div className="post">
  <div className="post__header">
  <Skeleton variant="circular" width={40} height={40} animation="pulse" style={{marginRight: "1rem"}}/>
      <Skeleton animation="wave" width={"10vh"} />
    <div className="post__info" style={{float: "right"}}>
    
    <Skeleton animation="wave"  width={"10vh"} />
    </div>
  </div>

  <div className="post__body">
  <Skeleton animation="wave" width={"70vh"} />
  <Skeleton animation="wave" width={"70vh"} />
  <Skeleton animation="wave" width={"70vh"} style={{marginBottom : "1rem"}}/>
  <Skeleton animation="wave" variant="rectangular" height={"50vh"} width={"85vh"}/>

  </div>

  <div style={{display: "flex", justifyContent:"center", alignItems: "center"}}>
    
  <Skeleton animation="wave" width={"70vh"} height={"10vh"}/>
  </div>
</div>
}