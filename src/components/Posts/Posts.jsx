import React from "react";
import "./Posts.css";
import { useState, useEffect } from "react";
import { Avatar } from "@material-ui/core";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ChatOutlinedIcon from "@material-ui/icons/ChatOutlined";
import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";
import SendOutlinedIcon from "@material-ui/icons/SendOutlined";
import InputOption from "../Home/InputOption";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import IndividualPost from "./IndividualPost";

export default function Posts({ posts, setPosts }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  var last = false;
  var page = 0;
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    fetchPosts();

    window.addEventListener("scroll", handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchPosts = () => {
    setIsLoading(true);

    fetch(`http://localhost:8080/api/post/getallposts?pageNo=${page}`, {
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
        console.log(data.content);

        setIsFirstLoad(false);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
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
        <h3
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress disableShrink />
        </h3>
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
