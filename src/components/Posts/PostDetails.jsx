import React, { useState, useEffect } from "react";
import Container from '@mui/material/Container';
import { Button, Card, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Input, TextField } from "@mui/material";
import { useParams } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Collapse from '@mui/material/Collapse';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ChatIcon from '@mui/icons-material/Chat';
import SaveIcon from "@mui/icons-material/Save";

import ShareIcon from '@mui/icons-material/Share';
import SendIcon from '@mui/icons-material/Send';
import InputOption from "../Home/InputOption";
import CommentComponent from "./commentComponent";
import { useSelector } from "react-redux";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

import { selectUser } from "../redux/UserContext/UserSlice";
import axios from "axios";
import { Skeleton } from "@mui/material";
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import { green } from "@mui/material/colors";
import { Box } from "@mui/system";
import { LoadingButton } from "@mui/lab";

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

  const [hashtags, setHashtags] = useState([]);
  const [filename, setFilename] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [files, setFiles] = React.useState(null);
  const [image, setImage] = React.useState("");
  const [enableUpload, setEnableUpload] = React.useState(true);
  const [loadingButton, setLoadingButton] = React.useState(false);

  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [SuccessMessage, setSuccessMessage] = React.useState("");

  const [formErrors, setFormErrors] = React.useState({});
  const [submitfailure, setsubmitfailure] = React.useState(false);


  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
      return new Date(f).toLocaleString();
    }
  };

  useEffect(() => {
    let isApiSubscribed = true;
    axios
      .get(`https://secure-stream-79742.herokuapp.com/api/post/getpostbyid/${id}`, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("token")).token
          }`,
        },
      })
      .then((res) => {
        if (isApiSubscribed) {
          // console.log(res.data.data);
          setLikeCount(res.data.data.like_count);
          setIsliked(res.data.data.liked);
          setindividualPost(res.data.data);
          setTitle(res.data.data.title)
          setDescription(res.data.data.description)
          setImage(res.data.data.image)
          setTime(new Date(res.data.data.created_at));
          setHashtags(res.data.data.hashtags);
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


  const handleDelete = async () => {

    if(window.confirm("Are you sure you want to delete this post?"))
{


    let res = await axios.delete(`https://secure-stream-79742.herokuapp.com/api/post/deletepostbyid/${id}`,  {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("token")).token
        }`,
      },
    })

    setOpen(false);

    window.location = "/"
  }
  }

  const HandleLike = async () => {
    setIsliked(!isLiked);

    if (!isLiked) {
      setLikeCount(likeCount + 1);
    } else {
      setLikeCount(likeCount - 1);
    }

    let data = { userId: user.id, postId: id, isliked: !isLiked };
    // console.log(data);

    let re = await axios.post(
      `https://secure-stream-79742.herokuapp.com/api/activity/create`,
      data,
      {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("token")).token
          }`,
        },
      }
    );

    // console.log(re);
  };

  let errorStatus = false;
  const HandleSubmit = async () => {
    setsubmitfailure(false);

    // validate({ description: description, title: title });

    if (!errorStatus) {
      try {
        let hashtags1 = [];

        hashtags1 = description.match(/#[a-z]+/gi);

        if (!hashtags1) {
          hashtags1 = [];
        }

        let postData = {
          id: id,
          userId: user.id,
          image: image,
          description: description,
          hashtags: hashtags1,
          post_type: "parent",
          title: title,
          likeCount: likeCount
        };
        // console.log("POST DATA ",  postData)

        let res = await axios.patch(
          `https://secure-stream-79742.herokuapp.com/api/post/updatepost`,
          JSON.stringify(postData),
          {
            headers: {
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem("token")).token
              }`,
              "Content-Type": "application/json",
            },
          }
        );

        // console.log("RESSS", res);

        setTitle(res.data.data.title);
        setDescription(res.data.data.description);
        setFiles(null);
        setImage(res.data.data.image);

        setOpen(false);
      } catch (e) {
        setsubmitfailure(true);
        // console.log(e);
      }
    }
  };

  const validate = (data) => {
    return;
    // const errors = {};
    // if (!data.description) {
    //   errors.description = "Description is required";
    // }
    // if (!data.title) {
    //   errors.title = "Title is required";
    // }
    // setFormErrors(errors);
    // if (Object.entries(errors).length > 0) errorStatus = true;
    // return errors;
  };

  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      "&:hover": {
        bgcolor: green[700],
      },
    }),
  };

  const HandleUpload = async () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      setLoadingButton(true);
      setEnableUpload(true);

      let form = new FormData();

      form.append("image", files, files.name);

      let res = await axios.post("https://upload-sdp3.herokuapp.com/upload", form, {
        onUploadProgress: (progressEvent) => {},
      });

      // console.log(res);

      setImage(res.data.publicUrl);

      setSuccess(true);
      setSuccessMessage("File Upload Successfull ✅");
      setLoading(false);
      setLoadingButton(false);

      setFiles(null);
    }
  };

  const HandleFileChange = async (e) => {
    setEnableUpload(false);
    setFiles(e.target.files[0]);
    // console.log(e.target.files[0]);
    setFilename(e.target.files[0].name);
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
                src={image}
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
                      !individualPost.userData.profile_image
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
                  <span style={{fontWeight: "500"}}>{title}</span>

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
                      ? description.slice(0, 150)
                      : description}
                    {description.length > 150 && (
                      <span
                        onClick={toggleReadMore}
                        style={{ color: "rgb(3, 136, 252)", cursor: "pointer" }}
                      >
                        {isReadMore ? "...read more" : " show less"}
                      </span>
                    )}

                    <p>{hashtags.map((el) => `${el} `)}</p>
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
                      Icon={ChatIcon}
                      title="Comment"
                      color="gray"
                    />
                  </span>

                  <span onClick={() => {
                 navigator.clipboard.writeText(`https://jobbers.netlify.app/post/${individualPost.id}`);
              }}>

                  <InputOption
                    className="PostIcons"
                    Icon={ShareIcon}
                    title="Share"
                    color="gray"
                    />


                    </span>
                    {individualPost.userId === user.id ?   <span onClick={handleClickOpen}>
                  <InputOption
                    className="PostIcons"
                    Icon={EditTwoToneIcon}
                    title="Edit"
                    color="gray"
                    />
                    </span> : <></>}
                  
                </div>
              </div>
              <Collapse in={showComments}>
                <CommentComponent parentId={id} />
              </Collapse>
            </Card>
          </div>
          <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Post</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="post title"
            type="text"
            onChange={(e) => setTitle(e.target.value)}

            fullWidth
            value={title}
            variant="outlined"
          />
          <small style={{ color: "red" }}>{formErrors.title}</small>

          <TextField
            multiline
            onChange={(e) => setDescription(e.target.value)}
            value={description}

            minRows={6}
            margin="dense"
            id="description"
            label="post description"
            type="text"
            fullWidth
            variant="outlined"
          />
          <small style={{ color: "red" }}>{formErrors.description}</small>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row-reverse",
            }}
          >
            <div style={{ marginLeft: "1rem" }}>
              <label className="buttonLabel" htmlFor="contained-button-file">
                Upload a Image
              </label>

              <Input
                onChange={(e) => HandleFileChange(e)}
                style={{
                  opacity: "0",
                  zIndex: "-1",
                  position: "absolute",
                }}
                accept="image/*"
                id="contained-button-file"
                multiple
                type="file"
              />
            </div>
            <div>
              <TextField
                margin="dense"
                variant="outlined"
                fullWidth
                value={filename}
                disabled={true}
              />
            </div>
          </div>
          <Box sx={{ m: 1, position: "relative" }}>
            <LoadingButton
              loading={loadingButton}
              disabled={enableUpload}
              loadingPosition="start"
              startIcon={<SaveIcon />}
              onClick={HandleUpload}
              variant="outlined"
            >
              Upload
            </LoadingButton>
          </Box>
          <span>{SuccessMessage}</span>
          
          {submitfailure && (
            <div style={{ color: "red" }}>Invalid title or description</div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button color="warning" onClick={handleDelete}>Delete</Button>
          <Button onClick={HandleSubmit}>Update</Button>
        </DialogActions>
      </Dialog>
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
