import { Avatar, Card, Collapse, Container } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ChatOutlinedIcon from "@material-ui/icons/ChatOutlined";
import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";
import SendOutlinedIcon from "@material-ui/icons/SendOutlined";
import InputOption from "../Home/InputOption";
import CommentComponent from "./commentComponent";
import { useSelector } from "react-redux";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

import { selectUser } from "../redux/UserContext/UserSlice";
import axios from "axios";
import { Skeleton } from "@mui/material";

function PostDetails() {
  const { id } = useParams();
  const user = useSelector(selectUser);

  const [showComments, setShowComments] = useState(false);
  const [isReadMore, setIsReadMore] = useState(true);
  const [timeString, setTimeString] = useState("");
  const [time, setTime] = useState("");
  const [individualPost, setindividualPost] = useState(null);
  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsliked] = useState(true);
  const [error, setError] = useState(false);

  const getTimeForPost = (f) => {
    let diff = (new Date().getTime() - f.getTime()) / 60000;
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

      if (Math.floor(diff) < 2) return `${Math.floor(diff)} day ago`;

      return `${Math.floor(diff)} days ago`;
    } else if (diff > 10080) {
      return f;
    }
  };

  useEffect(() => {
    let isApiSubscribed = true;
    axios
      .get(`http://localhost:8080/api/post/getpostbyid/${id}`, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("token")).token
          }`,
        },
      })
      .then((res) => {
        if (isApiSubscribed) {
          console.log(res.data.data);
          setLikeCount(res.data.data.like_count);
          setIsliked(res.data.data.liked);
          setindividualPost(res.data.data);

          setTime(new Date(res.data.data.created_at));
          let j = getTimeForPost(new Date(res.data.data.created_at));
          setTimeString(j);
        }
      })
      .catch((e) => {
        setError(true);
      });

    return () => {
      isApiSubscribed = false;
    };
  }, []);

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  const ToggleComment = async () => {
    setShowComments(!showComments);
  };

  const HandleLike = async () => {
    setIsliked(!isLiked);

    if (!isLiked) {
      setLikeCount(likeCount + 1);
    } else {
      setLikeCount(likeCount - 1);
    }

    let data = { userId: user.id, postId: id, isliked: !isLiked };
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

  return (
    <div>
      {error && (
        <Container style={{ marginTop: "30px" }}>
          {" "}
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            This is an error —{" "}
            <strong>the page you are looking for doesn't exists</strong>
          </Alert>
        </Container>
      )}

      {individualPost && !error ? (
        <div
          style={{
            padding: "30px",
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "row",
            justifyContent: "center",
            // alignItems: "center",
          }}
        >
          <Card
            elevation={5}
            style={{
              height: "70vh",
              width: "70vh",
              marginRight: "20px",
              padding: "10px",
              backgroundColor: "black !important",
            }}
          >
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img
                src={individualPost.image}
                alt=""
                style={{
                  maxHeight: "500px",
                  maxWidth: "600px",
                  minWidth: "70vh",
                  minHeight: "70vh",
                  objectFit: "contain",
                }}
              />
            </div>
          </Card>

          <div>
            <Card elevation={4} style={{ padding: "10px", maxWidth: "70vh" }}>
              {/* SECOND CARD */}

              <div>
                {/* POST HEADER  */}
                <div
                  className="pheader"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row",
                    marginBottom: "10px",
                  }}
                >
                  <Avatar
                    src={
                      individualPost.userData.profile_image
                        ? "/images/avatar.png"
                        : individualPost.userData.profile_image
                    }
                    style={{
                      marginRight: "10px",
                      width: "45px",
                      height: "45px",
                      border: "2px solid rgb(255, 255, 255)",
                    }}
                  ></Avatar>
                  <span>{individualPost.title}</span>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      marginLeft: "10px",
                    }}
                  >
                    <p style={{ fontSize: "12px", color: "gray" }}>
                      {timeString}
                    </p>
                  </div>
                </div>

                {/* POST BODY  */}
                <div>
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

                    <p>{individualPost.hashtags.map((el) => `${el} `)}</p>
                  </div>
                </div>

                {/* POST BUTTONS  */}

                <div
                  style={{ display: "flex", justifyContent: "space-evenly" }}
                >
                  <span
                    onClick={HandleLike}
                    style={{ color: isLiked === true ? "blue" : "gray" }}
                  >
                    <InputOption
                      className="PostIcons"
                      Icon={ThumbUpIcon}
                      title={`Like : ${likeCount}`}
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
                <CommentComponent parentId={id} />
              </Collapse>
            </Card>
          </div>
        </div>
      ) : (
        <SkeletonPosts />
      )}
    </div>
  );
}

const SkeletonPosts = () => {
  return (
    <div
      style={{
        padding: "30px",
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "center",
        // alignItems: "center",
      }}
    >
      <Card
        elevation={5}
        style={{
          height: "70vh",
          width: "70vh",
          marginRight: "20px",
          padding: "10px",
          backgroundColor: "black !important",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Skeleton
            animation="pulse"
            variant="rectangular"
            width={"70vh"}
            height={"70vh"}
          />
        </div>
      </Card>

      <div>
        <Card elevation={4} style={{ padding: "10px", maxWidth: "70vh" }}>
          {/* SECOND CARD */}

          <div>
            {/* POST HEADER  */}
            <div
              className="pheader"
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                marginBottom: "10px",
              }}
            >
              <Skeleton
                variant="circular"
                style={{ marginRight: "10px", width: "45px", height: "45px" }}
              />
              <span>
                <Skeleton animation="wave" width={"10vh"} />
              </span>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginLeft: "10px",
                }}
              >
                <p style={{ fontSize: "12px", color: "gray" }}>
                  <Skeleton animation="wave" width={"10vh"} />
                </p>
              </div>
            </div>

            {/* POST BODY  */}
            <div>
              <div style={{ marginLeft: "20px" }}>
                <Skeleton animation="wave" width={"50vh"} />
                <Skeleton animation="wave" width={"50vh"} />
                <Skeleton animation="wave" width={"50vh"} />
                <Skeleton animation="wave" width={"50vh"} />
              </div>
            </div>

            {/* POST BUTTONS  */}

            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
              <Skeleton animation="wave" width={"50vh"} height={"10vh"} />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PostDetails;
