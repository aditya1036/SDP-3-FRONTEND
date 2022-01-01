import React from "react";
import axios from "axios";
import { green } from "@mui/material/colors";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/UserContext/UserSlice";
import { LoadingButton } from "@mui/lab";
import Slide from "@mui/material/Slide";

import {
  Box,
  Button,
  Input,
  TextField,
  Dialog,
  Toolbar,
} from "@mui/material";

import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import "./Feed.css";
import SaveIcon from "@mui/icons-material/Save";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function ModelForm({ posts, setPosts, handleClose, open, setOpen }) {
  const user = useSelector(selectUser);

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

  let errorStatus = false;
  const HandleSubmit = async () => {
    setsubmitfailure(false);

    validate({ description: description, title: title });

    if (!errorStatus) {
      try {
        let hashtags = [];

        hashtags = description.match(/#[a-z]+/gi);

        if (!hashtags) {
          hashtags = [];
        }

        let postData = {
          userId: user.id,
          image: image,
          description: description,
          hashtags: hashtags,
          post_type: "parent",
          title: title,
        };

        let res = await axios.post(
          `https://secure-stream-79742.herokuapp.com/api/post/addposts`,
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

        console.log("RESSS", res);

        setPosts([res.data.data, ...posts]);
        setTitle("");
        setDescription("");
        setFiles(null);
        setImage("");

        setOpen(false);
      } catch (e) {
        setsubmitfailure(true);
        console.log(e);
      }
    }
  };

  const validate = (data) => {
    const errors = {};
    if (!data.description) {
      errors.description = "Description is required";
    }
    if (!data.title) {
      errors.title = "Title is required";
    }
    setFormErrors(errors);
    if (Object.entries(errors).length > 0) errorStatus = true;
    return errors;
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
        onUploadProgress: (progressEvent) => console.log(progressEvent.loaded),
      });

      console.log(res);

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
    console.log(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };
  return (
    <div>
      {/* <Modal
        trans
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      > */}
      <Dialog
        scroll={"body"}
        open={open}
        onClose={handleClose}
        fullWidth
        TransitionComponent={Transition}
      >

        <DialogTitle style={{textAlign: "center" , display: "flex" ,flexDirection : "row-reverse", justifyContent: "space-between"}}>    <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton> <span style={{fontSize: "1.4rem", fontWeight: "500"}}>
           Create a post 📝
          </span>
           </DialogTitle>
        <DialogContent
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
          dividers={"body"}
        >
          <DialogContentText></DialogContentText>

          <TextField
            margin="normal"
            onChange={(e) => setTitle(e.target.value)}
            required
            variant="outlined"
            fullWidth
            id="email"
            label="Post Title"
            name="title"
            autoFocus
            value={title}
          />
          <small style={{ color: "red" }}>{formErrors.title}</small>

          <TextField
            margin="normal"
            required
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            variant="outlined"
            minRows={10}
            name="description"
            label="Description"
            id="description"
            multiline
            value={description}
            style={{ marginBottom: "30px" }}
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
          <Button
            style={{ marginTop: "30px" }}
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => HandleSubmit()}
            sx={{ mt: 3, mb: 2 }}
          >
            Create Post ✨
          </Button>

          {submitfailure && (
            <div style={{ color: "red" }}>Invalid title or description</div>
          )}
        </DialogContent>
      </Dialog>
      {/* </Modal> */}
    </div>
  );
}

export default ModelForm;
