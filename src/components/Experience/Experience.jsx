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
import IndividualExperience from "./IndividualExperience";

const Experience = () => {
  const user_state = useSelector(selectUser);
  const [experience, setExperience] = useState([]);
  const [description, setDescription] = useState("");
  const [value, setValue] = useState([null, null]);
  const [location, setLocation] = useState("");
  const [title, setTitle] = useState("");
  const [exp_id, setExp] = useState(null);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);

  function convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }

  var experience_duration = convert(value[0]) + " to    " + convert(value[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    let fetching = true;

    async function userExperience() {
      const res = await fetch(
        `${API_URL}/api/experience/getByUserId/${user_state.id}`,
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
      if (fetching) {
        setExperience(data.Listdata);
      }
    }
    if (fetching) {
      userExperience();
    }

    return () => {
      fetching = false;
    };
  }, []);

  const handleAddExperience = async (e, id) => {
    e.preventDefault();

    const res = await fetch(`${API_URL}/api/experience/addExperience`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("token")).token
        }`,
      },
      body: JSON.stringify({
        title: title,
        description: description,
        duration: experience_duration,
        location: location,
        user_id: id,
      }),
    });

    const data = await res.json();
    console.log(data);
    setExperience([
      {
        id: data.data.id,
        title: title,
        description: description,
        duration: experience_duration,
        location: location,
        user_id: id,
      },
      ...experience,
    ]);

    handleClose();
    setTitle("");
    setDescription("");
    setLocation("");
  };

  return (
    <>
      <div className="experience_container">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "1rem",
          }}
        >
          <span style={{ fontSize: "1.5rem", fontWeight: "500" }}>
            Experience 📄
          </span>
          <span style={{ cursor: "pointer" }} onClick={handleClickOpen}>
            <AddIcon />
          </span>
        </div>
        {experience.length === 0 ? (
          <div>
            <span style={{ fontSize: "1rem" }}>
              Please Add some Experience to your profile.. 👨‍💼
            </span>
          </div>
        ) : (
          experience.map((exp) => (
            <IndividualExperience
              key={exp.id}
              exp={exp}
              setExpereinces={setExperience}
              experiences={experience}
            />
          ))
        )}
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Experience</DialogTitle>
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
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={(e) => handleAddExperience(e, user_state.id)}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Experience;
