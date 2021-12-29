import React from "react";
import { useState, useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
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
import { API_URL } from "../../config/env";

const IndividualProject = ({ projects, setProjects, project }) => {
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);
  const [git_link, setGitLink] = useState(project.git_link);
  const [value, setValue] = useState(project.duration.split("to"));
  const user_state = useSelector(selectUser);
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

  const handleUpdateProject = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API_URL}/api/project/update`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("token")).token
        }`,
      },
      body: JSON.stringify({
        id: project.id,
        name: name,
        description: description,
        duration: project_duration,
        git_link: git_link,
        user_id: user_state.id,
      }),
    });

    const data = await res.json();
    const index = projects.findIndex((proj) => proj.id === project.id);
    var updated_experience = [...projects];
    updated_experience[index] = {
      id: project.id,
      name: name,
      description: description,
      duration: project_duration,
      git_link: git_link,
      user_id: user_state.id,
    };
    setProjects(updated_experience);
    handleClose();
  };


  const handleDelete = async(e) =>{
    e.preventDefault()
    const res = await fetch(`${API_URL}/api/project/deletebyid/${project.id}` , {
        method: "DELETE",
        headers:
            {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${JSON.parse(localStorage.getItem("token")).token}`,
            }
    })
    const data = await res.json();
    setProjects(projects.filter((edu => edu.id !== project.id)))
    

  }

  return (
    <div>
      {/* <span>{project.id}</span>
      <span>{project.name}</span>
      <span>{project.description}</span>
      <span>{project.git_link}</span>
      <span>{project.duration}</span>
      <DeleteIcon onClick={handleDelete}/>
      <EditIcon onClick={handleClickOpen} /> */}

<div className="project_content">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <span style={{ fontSize: "1.3rem", fontWeight: "500" }}>
              {project.name + " 🚀"}
            </span>
          </div>

          <div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div className="div_edit_button">
                <span
                  className="Edit_button"
                  style={{ cursor: "pointer" }}
                  onClick={(e) => handleClickOpen(e)}
                >
                  <EditIcon />
                </span>
              </div>

              <div className="delete_button">
                <span
                  style={{ cursor: "pointer" }}
                  onClick={(e) => handleDelete(e)}
                >
                  <DeleteIcon />
                </span>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <div>
            <span style={{ color: "gray" }}>{project.duration}</span>
          </div>
          <div>
            <span style={{color:"grey"}}> {project.description}</span>
          </div>
          <div>
            <span style={{ color: "gray" }}><a  style={{ color: "gray" }} href={project.git_link} target="_blank">Source Link 🔗</a></span>
          </div>
        </div>
      </div>
      <div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Update Project Details</DialogTitle>
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
            <Button onClick={(e) => handleUpdateProject(e)}>Update</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default IndividualProject;
