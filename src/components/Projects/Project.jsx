import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/UserContext/UserSlice";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import "./Project.css";
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
import { API_URL } from "../../config/env";
import IndividualProject from "./IndividualProject";
import { useParams } from "react-router-dom";

const Project = () => {
  const {id} = useParams()
  const user_state = useSelector(selectUser);
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [git_link, setGitLink] = useState("");
  const [value, setValue] = useState([null, null]);
  const [open, setOpen] = useState(false);

  function convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }

  var project_duration = convert(value[0]) + " to " + convert(value[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    async function userProjects() {
      const res = await fetch(
        `${API_URL}/api/project/getbyuserid/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("token")).token
            }`,
          },
        }
      );

      const data = await res.json();
      console.log(data);
      setProjects(data.ListData);
    }

    userProjects();
  }, []);

  const handleAddProject = async (e) => {
    e.preventDefault();

    const res = await fetch(`${API_URL}/api/project/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("token")).token
        }`,
      },
      body: JSON.stringify({
        name: name,
        duration: project_duration,
        description: description,
        git_link: git_link,
        user_id: user_state.id,
      }),
    });
    const data = await res.json();
    setProjects([
      ...projects,
      {
        id: data.Data.id,
        name: name,
        duration: project_duration,
        description: description,
        git_link: git_link,
        user_id: user_state.id,
      },
    ]);

    handleClose();
    setName("");
    setDescription("");
    setGitLink("");
  };

  return (
    <>
      <div className="project_container">
      <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingTop: "1rem",
            }}>


        <span style={{ fontSize: "1.5rem", fontWeight: "500" }}>Projects ☕</span> {user_state.id*1 !== id*1 ? <></> :<span style={{cursor: "pointer"}}onClick={handleClickOpen}><AddIcon /></span> }
            </div >
        {projects.map((project) => (
          <>
            <IndividualProject project = {project} projects={projects} setProjects = {setProjects} />
          </>
        ))}
      </div>
      <div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add Projects</DialogTitle>
          <DialogContent>
            <DialogContentText></DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              label="Project Name/Title"
              type="text"
              fullWidth
              variant="outlined"
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
              id="description"
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              fullWidth
              variant="outlined"
              required
            />
            <TextField
              autoFocus
              margin="dense"
              id="git_link"
              value={git_link}
              onChange={(e) => setGitLink(e.target.value)}
              label="Source Code(GitHub Link)"
              type="text"
              fullWidth
              variant="outlined"
              required
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={(e) => handleAddProject(e)}>Add</Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default Project;
