import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { API_URL } from '../../config/env';
import { selectUser } from '../redux/UserContext/UserSlice';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
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
import { useParams } from 'react-router-dom';

function IndividualEducation({edu, education, setEducation}) {


    const {id}  = useParams();
    const user_state = useSelector(selectUser);
    const [educati, seteducati] = useState(edu)
    const [institution_name, setInstitueName] = useState(edu.institution_name)
    const [value, setValue] = useState(edu.duration.split("to"));
    const [location, setLocation] = useState(edu.location)
    const [degree_type, setDegree_type] = useState(edu.degree_type);
    const [id1, setId] = useState(edu.id)
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);

    function convert(str) {
        var date = new Date(str),
          mnth = ("0" + (date.getMonth() + 1)).slice(-2),
          day = ("0" + date.getDate()).slice(-2);
        return [date.getFullYear(), mnth, day].join("-");
      }
    
    var education_duration = convert(value[0])+" to "+convert(value[1]);


    const handleClickOpen1 = (e) => {
        setOpen1(true);
    };

    const handleClose1 = () => {
        setOpen1(false);
    };



    const deleteEducation = async (e) => {
        e.preventDefault()

        if (window.confirm(`Are you sure you want to delete this?`)) {

            let newed = education.filter(el => el.id != edu.id)
            setEducation(newed)
            const res = await fetch(`${API_URL}/api/education/delete/${edu.id}` , {
                method: "DELETE",
                headers:
                    {
                        "Content-Type": "application/json",
                        "Authorization" : `Bearer ${JSON.parse(localStorage.getItem("token")).token}`,
                    }
            })
            const data = await res.json();
            // console.log(data);
        }else {
            return;
        }
    }
    const handleUpdateEducation = async(e) => {
        e.preventDefault()
        // console.log({
      //     id: id1,
      //     institution_name: institution_name,
      //     duration: education_duration,
      //     location: location,
      //     degree_type : degree_type,
      //     user_id: user_state.id
      // })
        const res = await fetch(`${API_URL}/api/education/update` , {
            method: "PATCH" ,
            headers:
                {
                    "Content-Type": "application/json",
                    "Authorization" : `Bearer ${JSON.parse(localStorage.getItem("token")).token}`,
                },
            body: JSON.stringify({
                id: id1,
                institution_name: institution_name,
                duration: education_duration,
                location: location,
                degree_type : degree_type,
                user_id: user_state.id
            })
            
        })

        const data = await res.json()
        // console.log(data)
        seteducati(data.Data)
        handleClose1()
    }

    return (
        <div>
            <div className="education_content">
                <div  style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
               <div>
            <span style={{ fontSize: "1.3rem", fontWeight: "500" }}>
              {educati.institution_name + " 🏫"}
            </span>
          </div>

          <div>
          {user_state.id*1 !== id*1 ? <></> :
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div className="div_edit_button">
                <span
                  className="Edit_button"
                  style={{ cursor: "pointer" }}
                  onClick={(e) => handleClickOpen1(e)}
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
            </div> }
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
            <span style={{ color: "gray" }}>{educati.duration}</span>
          </div>
          <div>
            <span style={{ color: "gray" }}>{educati.location + " 🌎"}</span>
          </div>
          <div style={{ marginTop: "1rem" }}>
            <span style={{}}>Degree : {educati.degree_type}</span>
          </div>
        </div>
            </div>
<Dialog open={open1} onClose={handleClose1}>
        <DialogTitle>Update Education</DialogTitle>
        <DialogContent>
          <DialogContentText>
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="institute"
            value={institution_name}
            onChange={(e) => setInstitueName(e.target.value)}
            label="Institution Name"
            type="text"
            fullWidth
            variant="outlined"
            required
          />&nbsp;
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
            variant="outlined"
            required
          />
          <TextField
            autoFocus
            margin="dense"
            id="degree"
            value={degree_type}
            onChange={(e) => setDegree_type(e.target.value)}
            label="Degree"
            type="text"
            fullWidth
            variant="outlined"
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose1}>Cancel</Button>
          <Button onClick={(e) => handleUpdateEducation(e)}>Update</Button>
        </DialogActions>
      </Dialog>
            
        </div>
    )
}

export default IndividualEducation
