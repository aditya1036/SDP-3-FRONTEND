import React from "react";
import "./Projects.css";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState, useEffect } from "react";
import { API_URL } from "../../config/env";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/UserContext/UserSlice";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DateRangePicker from "@mui/lab/DateRangePicker";
import Box from "@mui/material/Box";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

import axios from 'axios'

const Projects = () => {
  const user_state = useSelector(selectUser);
  const [projects, setProjects] = useState([]);
  const [description, setDescription] = useState("");
  const [value, setValue] = useState([null, null]);
  const [git_link, setGit] = useState("");
  const [name, setName] = useState("");
  const [duration, setDuration] = useState(null);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);

  function convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }

  var project_duration = convert(value[0]) + " to    " + convert(value[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen1 = (e, id) => {
    setOpen1(true);
    // setExp(id);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  useEffect(() => {
      let fetching = true;

      
      axios.get(`http://localhost:8080/api/project/getbyuserid/${user_state.id}`, {
        headers: {
          'Authorization' : `Bearer ${JSON.parse(localStorage.getItem("token")).token}`
        }
      }).then(res => {
        if (fetching) {
          setProjects([...res.data.ListData]);
        }
      })


      return () => {
        fetching = false;
      }
  }, []);

  const handleAddExperience = async (e, id) => {
    e.preventDefault();

    // const res = await fetch(`${API_URL}/api/experience/addExperience`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${
    //       JSON.parse(localStorage.getItem("token")).token
    //     }`,
    //   },
    //   body: JSON.stringify({
    //     title: title,
    //     description: description,
    //     duration: experience_duration,
    //     location: location,
    //     user_id: id,
    //   }),
    // });
    // const data = await res.json();
    // console.log(data);
    // setExperience([
    //   ...experience,
    //   {
    //     id: data.data.id,
    //     title: title,
    //     description: description,
    //     duration: experience_duration,
    //     location: location,
    //     user_id: id,
    //   },
    // ]);

    // handleClose();
    // setTitle("");
    // setDescription("");
    // setLocation("");
  };

  const deleteEducation = async (e, id) => {
    e.preventDefault();
    // const res = await fetch(`${API_URL}/api/experience/deletebyid/${id}`, {
    //   method: "DELETE",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${
    //       JSON.parse(localStorage.getItem("token")).token
    //     }`,
    //   },
    // });
    // const data = await res.json();
    // console.log(data);
    // setExperience(experience.filter((edu) => edu.id !== id));
  };

  const handleUpdateExperience = async (e, id) => {
    e.preventDefault();
    // const res = await fetch(`${API_URL}/api/experience/updateById`, {
    //   method: "PATCH",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${
    //       JSON.parse(localStorage.getItem("token")).token
    //     }`,
    //   },
    //   body: JSON.stringify({
    //     id: id,
    //     title: title,
    //     description: description,
    //     duration: experience_duration,
    //     location: location,
    //     user_id: user_state.id,
    //   }),
    // });

    // const data = await res.json();
    // const index = experience.findIndex((exp) => exp.id === id);
    // var updated_experience = [...experience];
    // updated_experience[index] = {
    //   id: id,
    //   title: title,
    //   description: description,
    //   duration: experience_duration,
    //   location: location,
    //   user_id: user_state.id,
    // };
    // setExperience(updated_experience);
    // handleClose1();
  };

  return (
    <>
      <div className="project_container">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "1rem",
          }}
        >
          <span style={{ fontSize: "1.5rem", fontWeight: "500" }}>
            Project 🏆
          </span>
          <span style={{ cursor: "pointer" }} onClick={handleClickOpen}>
            <AddIcon />
          </span>
        </div>
        {/* {experience.length === 0 ? <div>
          <span style={{fontSize: "1rem"}}>Please Add some Experience to your profile.. 👨‍💼</span>
        </div>  : experience.map((exp) => (
          <>
            <div className="experience_content" key={exp.id}>
              <span onClick={(e) => handleClickOpen1(e, exp.id)}>
                <EditIcon style={{ marginLeft: "800px", marginTop: "15px" }} />
              </span>
              &nbsp;
              <span onClick={(e) => deleteEducation(e, exp.id)}>
                <DeleteIcon />
              </span>
              <h4 style={{ marginLeft: "40px", marginTop: "30px" }}>
                Title: {exp.title}{" "}
              </h4>
              <div className="experience__info">
                <p>Duration: {exp.duration}</p>
                <p> Location: {exp.location}</p>
              </div>
              <h4 style={{ marginLeft: "40px", marginTop: "30px" }}>
                Description: {exp.description}
              </h4>
            </div>
          </>
        ))} */}
      </div>
      <div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add Project</DialogTitle>
          <DialogContent>
            <DialogContentText></DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="title"
              value={name}
              onChange={(e) => setName(e.target.value)}
              label="Title"
              type="text"
              fullWidth
              variant="standard"
              required
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateRangePicker
                startText="From"
                endText="To"
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
                renderInput={(startProps, endProps) => (
                  <React.Fragment>
                    <TextField {...startProps} />
                    <Box sx={{ mx: 2 }}> to </Box>
                    <TextField {...endProps} />
                  </React.Fragment>
                )}
              />
            </LocalizationProvider>
            <TextField
              autoFocus
              margin="dense"
              id="location"
              label="Location"
              value={git_link}
              onChange={(e) => setGit(e.target.value)}
              type="text"
              fullWidth
              variant="standard"
              required
            />
            <TextField
              autoFocus
              margin="dense"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              label="Description"
              type="text"
              fullWidth
              variant="standard"
              required
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={(e) => handleAddExperience(e, user_state.id)}>
              Add
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={open1} onClose={handleClose1}>
          <DialogTitle>Update Experience</DialogTitle>
          <DialogContent>
            <DialogContentText></DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="title"
              value={name}
              onChange={(e) => setName(e.target.value)}
              label="Title"
              type="text"
              fullWidth
              variant="standard"
              required
            />
            &nbsp;
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateRangePicker
                startText="From"
                endText="To"
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
                renderInput={(startProps, endProps) => (
                  <React.Fragment>
                    <TextField {...startProps} />
                    <Box sx={{ mx: 2 }}> to </Box>
                    <TextField {...endProps} />
                  </React.Fragment>
                )}
              />
            </LocalizationProvider>
            <TextField
              autoFocus
              margin="dense"
              id="location"
              label="Location"
              value={git_link}
              onChange={(e) => setGit(e.target.value)}
              type="text"
              fullWidth
              variant="standard"
              required
            />
            <TextField
              autoFocus
              margin="dense"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              label="Description"
              type="text"
              fullWidth
              variant="standard"
              required
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose1}>Cancel</Button>
            {/* <Button onClick={(e) => handleUpdateExperience(e, exp_id)}> */}
              {/* Update */}
            {/* </Button> */}
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default Projects;
