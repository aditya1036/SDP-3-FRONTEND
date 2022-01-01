import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/UserContext/UserSlice";
import Avatar from "@mui/material/Avatar";
import styled from "styled-components";
import { useState, useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import "./Profile.css";
import Experience from "../Experience/Experience";
import { useParams } from "react-router-dom";
import { Input, Box, Slide } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import Education from "../Education/Education";
import Certification from "../Certification/Certification";
import SaveIcon from "@mui/icons-material/Save";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { API_URL } from "../../config/env";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import GitHubIcon from "@mui/icons-material/GitHub";
import Link from "@mui/material/Link";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Typography } from "@mui/material";
import Project from "../Projects/Project";
import { LoadingButton } from "@mui/lab";
import axios from "axios";
import Widgets from "../Widgets/Widgets";

const ITEM_HEIGHT = 40;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 40,
    },
  },
};
const names = ["C++", "Java", "Python", "React JS", "Angular JS"];

const names1 = ["English", "Hindi", "French", "German"];

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function Profile() {
  const { id } = useParams();

  const [files, setFiles] = React.useState(null);
  const [image, setImage] = React.useState("");
  const [enableUpload, setEnableUpload] = React.useState(true);
  const [loadingButton, setLoadingButton] = React.useState(false);
  const [filename, setFilename] = React.useState("");

  const [file, setFile] = React.useState(null);
  const [enableUploadResume, setEnableUploadResume] = React.useState(true);
  const [loadingButtonResume, setLoadingButtonResume] = React.useState(false);
  const [resumeLink, setresumeLink] = React.useState("");
  const [Resumefilename, setResumeFileName] = React.useState("");

  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [SuccessMessage, setSuccessMessage] = React.useState("");
  const user_state = useSelector(selectUser);
  const [open, setOpen] = useState(false);
  const [userProfile, setUserProfile] = useState({});
  const theme = useTheme();
  const [github_link, setGithub] = useState("");
  const [linked_link, setLinkedIn] = useState("");
  const [bio, setBio] = useState("");
  const [skills, setSkills] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [follow, setFollow] = useState(false);

  const [fullName, setFullName] = useState("");

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }


  useEffect(() => {
    async function initialUser() {
      const res = await fetch(`${API_URL}/api/profile/user/profile/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("token")).token
          }`,
        },
      });
      const data = await res.json();
      console.log(data);
      setUserProfile(data.data[0]);
      setImage(data.data[0].profile_image);
      setGithub(data.data[0].github_link);
      setLinkedIn(data.data[0].linkedIn_link);
      setSkills([...skills, ...(data.data[0].skills || [])]);
      setresumeLink(data.data[0].resumeLink);
      setFullName(data.data[0].fullname);
      setBio(data.data[0].bio);
      setLanguages([...languages, ...(data.data[0].languages || [])]);
      setFollow(data.data[0].following);
    }
    initialUser();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleFollow = async (e) => {
    if (follow) {
      const res = await fetch("https://secure-stream-79742.herokuapp.com/api/follow/unfollow", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("token")).token
          }`,
        },
        body: JSON.stringify({
          source_userid: user_state.id,
          target_userid: id,
        }),
      });
      const data = await res.json();
      console.log(data);
    } else {
      const res = await fetch("https://secure-stream-79742.herokuapp.com/api/follow/follow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("token")).token
          }`,
        },
        body: JSON.stringify({
          source_userid: user_state.id,
          target_userid: id,
        }),
      });
      const data = await res.json();
      console.log(data);
    }
    setFollow(!follow);
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSkills(
      // On autofill we get a the stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const handleChange1 = (event) => {
    const {
      target: { value },
    } = event;
    setLanguages(
      // On autofill we get a the stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const HandleUpload = async () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      setLoadingButton(true);
      setEnableUpload(true);

      let form = new FormData();

      form.append("image", files, files.name);

      let res = await axios.post("https://upload-sdp3.herokuapp.com/upload/profile", form, {
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
    // console.log(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const HandleResumeFileChange = async (e) => {
    setEnableUploadResume(false);
    setFile(e.target.files[0]);
    console.log(e.target.files[0].name);
    setResumeFileName(e.target.files[0].name);
  };

  const [openPdf, setOpenPdf] = React.useState(false);

  const handleClickOpenPdf = () => {
    setOpenPdf(true);
  };

  const handleClosePdf = () => {
    setOpenPdf(false);
  };

  const HandleResumeUpload = async () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      setLoadingButtonResume(true);
      setEnableUploadResume(true);

      let form = new FormData();

      form.append("file", file, file.name);

      let res = await axios.post("https://upload-sdp3.herokuapp.com/upload/resume", form, {
        onUploadProgress: (progressEvent) => console.log(progressEvent.loaded),
      });

      console.log(res);

      setresumeLink(res.data.publicUrl);

      setSuccess(true);
      setSuccessMessage("File Upload Successfull ✅");
      setLoading(false);
      setLoadingButtonResume(false);

      setFile(null);
    }
  };

  const handleUpdate = async (e, id) => {
    e.preventDefault();
    const res = await fetch(`${API_URL}/api/profile/user/profile/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("token")).token
        }`,
      },
      body: JSON.stringify({
        id: id,
        github_link: github_link,
        linkedIn_link: linked_link,
        bio: bio,
        skills: skills,
        languages: languages,
        profile_image: image,
        resumeLink: resumeLink,
        fullname: fullName,
      }),
    });

    const data = await res.json();
    console.log(data);
    setUserProfile({
      id: user_state.id,
      github_link: github_link,
      linkedIn_link: linked_link,
      bio: bio,
      skills: skills,
      languages: languages,
      profile_image: null,
    });
    handleClose();
  };
  console.log(resumeLink);

  const handleClose = () => {
    setOpen(false);
  };
  const newsArticle = (heading, subtitle) => (
    <div className="widgets__article">
      <div className="widgets__articleLeft">
        <FiberManualRecordIcon />
      </div>

      <div className="widgets__articleRight">
        <h4>{heading}</h4>
        <p>{subtitle}</p>
      </div>
    </div>
  );
  // console.log(languages)
  return (
    <>
      <div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Update Profile</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              margin="dense"
              id="fullname"
              label="Full Name"
              type="text"
              fullWidth
              variant="outlined"
              required
            />

            <TextField
              value={linked_link}
              onChange={(e) => setLinkedIn(e.target.value)}
              margin="dense"
              id="linkedin"
              label="LinkedIn Link"
              type="text"
              fullWidth
              variant="outlined"
              required
            />
            <TextField
              value={github_link}
              onChange={(e) => setGithub(e.target.value)}
              margin="dense"
              id="github"
              label="Github Link"
              type="text"
              fullWidth
              variant="outlined"
              required
            />
            <TextField
              multiline
              minRows={5}
              margin="dense"
              id="name"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              label="Bio"
              type="text"
              fullWidth
              variant="outlined"
              required
            />
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexDirection: "row-reverse",
                }}
              >
                <div style={{ marginLeft: "1rem" }}>
                  <label
                    className="buttonLabel"
                    htmlFor="contained-button-file"
                  >
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
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexDirection: "row-reverse",
                }}
              >
                <div style={{ marginLeft: "1rem" }}>
                  <label className="buttonLabel" htmlFor="containedandlsnalkd">
                    Upload a Resume
                  </label>

                  <Input
                    onChange={(e) => {
                      HandleResumeFileChange(e);
                    }}
                    style={{
                      opacity: "0",
                      zIndex: "-1",
                      position: "absolute",
                    }}
                    accept="application/*"
                    id="containedandlsnalkd"
                    type="file"
                  />
                </div>
                <div>
                  <TextField
                    margin="dense"
                    variant="outlined"
                    fullWidth
                    value={Resumefilename}
                    disabled={true}
                  />
                </div>
                <Box sx={{ m: 1, position: "relative" }}>
                  <LoadingButton
                    loading={loadingButtonResume}
                    disabled={enableUploadResume}
                    loadingPosition="start"
                    startIcon={<SaveIcon />}
                    onClick={HandleResumeUpload}
                    variant="outlined"
                  >
                    Upload
                  </LoadingButton>
                </Box>
              </div>
            </div>
            <div>
              <Select
                multiple
                displayEmpty
                style={{ maxWidth: "30vh" }}
                value={skills}
                keepMounted
                onChange={handleChange}
                input={<OutlinedInput />}
                renderValue={(selected) => {
                  if (selected.length === 0) {
                    return <em>Programming Languages</em>;
                  }

                  return selected.join(", ");
                }}
                MenuProps={MenuProps}
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem disabled value="">
                  <Typography textAlign="center">
                    Programming Languages
                  </Typography>
                </MenuItem>
                {names.map((name) => (
                  <MenuItem key={name} dense={true} value={name}>
                    <Typography textAlign="center">{name}</Typography>
                  </MenuItem>
                ))}
              </Select>
            </div>

            <Select
              multiple
              displayEmpty
              value={languages}
              style={{ maxWidth: "30vh" }}
              onChange={handleChange1}
              input={<OutlinedInput />}
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return <em>Languages</em>;
                }

                return selected.join(", ");
              }}
              MenuProps={MenuProps}
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem disabled value="">
                <em>Languages</em>
              </MenuItem>
              {names1.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, languages, theme)}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={(e) => handleUpdate(e, user_state.id)}>
              Update
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <Container>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="profile__sidebar">
            <div className="profile__sidebar__top">
              <img src="/images/linkedIn.png" alt="background" />

              <Avatar
                src={image}
                className="profile__sidebar__avatar"
                style={{ height: "150px", width: "150px", marginLeft: "2rem" }}
              ></Avatar>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span style={{ padding: "20px", fontSize: "2rem" }}>
                  {fullName}
                </span>
                <div style={{marginRight: "1rem"}}>
                  {user_state.id * 1 === id * 1 ? (
                    <></>
                  ) : (
                    <>
                      <Button
                        variant="contained"
                        onClick={handleFollow}
                        style={{
                          backgroundColor: follow ? "gray" : "#3f51b5",
                        }}
                      >
                        {follow ? "UnFollow" : "Follow"}
                      </Button>
                    </>
                  )}
                </div>

                {user_state.id * 1 !== id * 1 ? (
                  <></>
                ) : (
                  <span
                    onClick={handleClickOpen}
                    style={{ marginRight: "1rem" }}
                  >
                    <EditIcon />
                  </span>
                )}
              </div>
              <div>
                <Link
                  href={github_link}
                  style={{ marginLeft: "30px" }}
                  target="_blank"
                >
                  <GitHubIcon style={{ color: "black" }} />
                </Link>
                <Link
                  href={linked_link}
                  style={{ marginLeft: "10px" }}
                  target="_blank"
                >
                  <LinkedInIcon style={{ color: "black" }} />
                </Link>
              </div>
              <div className="profile__info"></div>
              <div className="profile__info">
                <a href={resumeLink} >
                  Resume Link 🔗
                </a>
              </div>
              {userProfile.bio && (
                <div className="profile__addition">
                  <p> Bio: {bio}</p>
                  <p>
                    Languages:{" "}
                    {languages &&
                      languages.map((e, i) => {
                        if (i === languages.length - 1) return <span>{e}</span>;
                        else return <span>{e}, </span>;
                      })}
                  </p>
                  <p>
                    Skills:{" "}
                    {skills &&
                      skills.map((e, i) => {
                        if (i == skills.length - 1) return <span>{e}</span>;
                        else return <span>{e}, </span>;
                      })}
                  </p>
                </div>
              )}
            </div>
          </div>
          <div>

      {/* <Dialog
        fullScreen
        open={openPdf}
        onClose={handleClosePdf}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClosePdf}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Resume
            </Typography>
          </Toolbar>
        </AppBar>
        <div>
      <Document
        file="https://cors-anywhere.herokuapp.com/http://www.pdf995.com/samples/pdf.pdf"
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />
      </Document>
      <p>Page {pageNumber} of {numPages}</p>
    </div>
      </Dialog> */}
    </div>
          <div style={{ marginLeft: "2rem" }}>
            <Experience />
            <Project />
            <Education />
            <Certification />
          </div>
        </div>
        <div>
          <Widgets />
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  padding-top: 20px;
  display: flex;
  flex-direction: row;
`;
