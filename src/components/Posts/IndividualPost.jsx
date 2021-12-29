import React from "react";
import "./Posts.css";
import { useState, useEffect } from "react";
import { Avatar, Collapse } from "@material-ui/core";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ChatOutlinedIcon from "@material-ui/icons/ChatOutlined";
import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";
import SendOutlinedIcon from "@material-ui/icons/SendOutlined";
import InputOption from "../Home/InputOption";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { selectUser } from "../redux/UserContext/UserSlice";
import { useSelector } from "react-redux";
import { color } from "@mui/system";
import CommentComponent from "./commentComponent";
import { Link } from "react-router-dom";

function IndividualPost({ post }) {
  const user = useSelector(selectUser);

  const [isLiked, setIsliked] = useState(post.liked);
  const [likeCount, setLikeCount] = useState(post.like_count);
  const [individualPost, setindividualPost] = useState(post);

  const [time, setTime] = useState(new Date(post.created_at));
  const [timeString, setTimeString] = useState("");

  const [showComments, setShowComments] = useState(false);

  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  const ToggleComment = async () => {
    setShowComments(!showComments);
  };


  const getTimeForPost = (f) => {

    // console.log(new Date(f).getTime());
    let diff = (new Date().getTime() - new Date(f).getTime()) / 60000;
    console.log(diff)
    if (diff < 1) {
      return "Just now";
    } else if (diff >= 1 && diff <= 60) {
      return `${Math.floor(diff)} mins ago`;
    } else if (diff > 60 && diff <= 1440) {
      let h = diff / 60;

      if (h <= 1) {
        return `${Math.floor(h)} hour ago`;
      }

      return `${Math.floor(diff / 60)} hours ago`;
    } else if (diff > 1440 && diff <= 10080) {
      diff = diff / 60;
      diff = diff / 24;

      if (Math.floor(diff) < 2) return `${Math.floor(diff)} day ago`

      return `${Math.floor(diff)} days ago`;
    } else if (diff > 10080) {

      return new Date(f).toLocaleString();
    }
  };

  useEffect(() => {
    let j = getTimeForPost(time);

    setTimeString(j);
  }, []);

  const HandleLike = async () => {
    setIsliked(!isLiked);

    if (!isLiked) {
      setLikeCount(likeCount + 1);
    } else {
      setLikeCount(likeCount - 1);
    }

    let data = { userId: user.id, postId: post.id, isliked: !isLiked };
    console.log(data);

    let re = await axios.post(
      `http://localhost:8080/api/activity/create`,
      data,
      {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("token")).token
          }`,
        },
      }
    );

    console.log(re);
  };

  console.log(individualPost.userData.profile_image);
  // console.log("INDIVIDUAL POSSTTT", individualPost);

  return (
    <div>
      {individualPost && (
        <div key={individualPost.id}>
          <div className="post">
            <div className="post__header">
              <Avatar
                src={
                  individualPost.userData.profile_image
                  ? individualPost.userData.profile_image
                  : "/images/avatar.png"
                }

                style={{marginRight: "10px"}}
              ></Avatar>


                <Link to={`/post/${individualPost.id}`}>
                <span style={{fontWeight: "500"}} >{individualPost.title}</span>
                </Link>
              <div className="post__info" style={{float: "right"}}>
              
                <p>{timeString + " ⏳"}</p>
              </div>
            </div>

            <div className="post__body">
              <div style={{ marginLeft: "20px" }}>
                {isReadMore
                  ? individualPost.description.slice(0, 150)
                  : individualPost.description}

                {individualPost.description.length > 150 && (
                  <span
                    onClick={toggleReadMore}
                    style={{ color: "rgb(3, 136, 252)", cursor: "pointer" }}
                  >
                    {isReadMore ? "...read more" : " show less"}
                  </span>
                )}
                <p style={{color: "rgb(3, 146, 255)"}}>{individualPost.hashtags.map((el) => `${el} `)}</p>
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <img
                  src={individualPost.image}
                  alt=""
                  style={{ maxHeight: "400px", maxWidth: "600px" }}
                />
              </div>
            </div>
            <div className="post__buttons">
              <span
                onClick={HandleLike}
                style={{ color: isLiked === true ? "blue" : "gray" }}
              >
                <InputOption
                  className="PostIcons"
                  Icon={ThumbUpIcon}
                  title={`Like  ${likeCount}`}
                  color={isLiked === true ? "blue" : "gray"}
                />
              </span>

              <span onClick={ToggleComment}>
                <InputOption
                  className="PostIcons"
                  Icon={ChatOutlinedIcon}
                  title="Comment"
                  color="gray"
                />
              </span>
              <InputOption
                className="PostIcons"
                Icon={ShareOutlinedIcon}
                title="Share"
                color="gray"
              />
              <InputOption
                className="PostIcons"
                Icon={SendOutlinedIcon}
                title="Send"
                color="gray"
              />
            </div>
          </div>
          <Collapse in={showComments}>
            <CommentComponent parentId={individualPost.id} />
          </Collapse>
        </div>
      )}
    </div>
  );
}

export default IndividualPost;
