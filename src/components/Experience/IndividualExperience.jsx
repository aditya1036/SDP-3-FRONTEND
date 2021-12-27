import React from "react";
import "./Experience.css";
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

function IndividualExperience({ experiences, exp, setExpereinces }) {
  const user_state = useSelector(selectUser);
  const [experience, setExperience] = useState(exp);
  const [description, setDescription] = useState(exp.description);
  const [value, setValue] = useState(exp.duration.split("to"));
  const [location, setLocation] = useState(exp.location);
  const [title, setTitle] = useState(exp.title);
  const [exp_id, setExp] = useState(exp.id);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);

  function convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }

  var experience_duration = convert(value[0]) + " to    " + convert(value[1]);

  const handleClickOpen1 = (e, id) => {
    setOpen1(true);
    setExp(id);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  const deleteEducation = async (e) => {
    e.preventDefault();
    let newex = experiences.filter((el) => el.id != experience.id);
    setExpereinces(newex);
    const res = await fetch(
      `${API_URL}/api/experience/deletebyid/${experience.id}`,
      {
        method: "DELETE",
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
  };

  const handleUpdateExperience = async (e, id) => {
    e.preventDefault();
    const res = await fetch(`${API_URL}/api/experience/updateById`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("token")).token
        }`,
      },
      body: JSON.stringify({
        id: id,
        title: title,
        description: description,
        duration: experience_duration,
        location: location,
        user_id: user_state.id,
      }),
    });

    const data = await res.json();

    console.log(data);
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
    setExperience(data.data);
    handleClose1();
  };
  return (
    <>
      <div className="experience_content" key={experience.id}>
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
              {experience.title}{" "}
            </span>
          </div>
          <div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div className="div_edit_button">
                <span
                  className="Edit_button"
                  style={{ cursor: "pointer" }}
                  onClick={(e) => handleClickOpen1(e, experience.id)}
                >
                  <EditIcon style={{}} />
                </span>
              </div>

              <div className="delete_button">
                <span
                  style={{ cursor: "pointer" }}
                  onClick={(e) => deleteEducation(e)}
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
            <span style={{ color: "gray" }}>{experience.duration}</span>
          </div>
          <div>
            <span style={{ color: "gray" }}>{experience.location}</span>
          </div>
          <div style={{ marginTop: "1rem" }}>
            <span style={{}}>{experience.description}</span>
          </div>
        </div>
      </div>
      <div>
        <Dialog open={open1} onClose={handleClose1}>
          <DialogTitle>Update Experience</DialogTitle>
          <DialogContent>
            <DialogContentText></DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
              value={location}
              onChange={(e) => setLocation(e.target.value)}
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
            <Button onClick={(e) => handleUpdateExperience(e, exp_id)}>
              Update
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}

export default IndividualExperience;
