import { DateRangePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { API_URL } from "../../config/env";
import { selectUser } from "../redux/UserContext/UserSlice";
import { useParams } from "react-router-dom";

function IndividualCertificate({ lic, licenses, setLicenses }) {
  const {id} = useParams()
  const user_state = useSelector(selectUser);
  const [license, setLicense] = useState(lic);
  const [value, setValue] = useState(lic.duration.split("to"));
  const [open1, setOpen1] = useState(false);
  const [license_name, setLicenseName] = useState(lic.license_name);
  const [pdf_link, setPdfLink] = useState(lic.pdf_link);
  const [id1, setId] = useState(lic.id);


  function convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }
  var license_duration = convert(value[0]) + " to " +convert(value[1]);


  const handleClickOpen1 = (e) => {
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  const deleteCertification = async (e) => {
    e.preventDefault();
    setLicenses(licenses.filter((lics) => lics.id !== id1));

    const res = await fetch(
      `${API_URL}/api/test/user/delete/license/${id1}`,
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
    // console.log(data);
  };

  const handleUpdateCertification = async (e) => {
    e.preventDefault();
    // console.log(id1)
    const res = await fetch(`${API_URL}/api/test/user/license/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("token")).token
        }`,
      },
      body: JSON.stringify({
        id: id1,
        license_name: license_name,
        duration: license_duration,
        pdf_link: pdf_link,
        user_id: user_state.id,
      }),
    });

    const data = await res.json();   
    // console.log(data)
    setLicense(data.data[0]);
    handleClose1();
  };

  return (
    <div>
      <div className="certification_content">
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
              {license.license_name + " 🎗️"}
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
                  <EditIcon />
                </span>
              </div>

              <div className="delete_button">
                <span
                  style={{ cursor: "pointer" }}
                  onClick={(e) => deleteCertification(e)}
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
            <span style={{ color: "gray" }}>{license.duration}</span>
          </div>
          <div>
            <span style={{ color: "gray" }}><a  style={{ color: "gray" }} href={license.pdf_link} target="_blank">Credentials Link 🔗</a></span>
          </div>
        </div>
      </div>
      <Dialog open={open1} onClose={handleClose1}>
        <DialogTitle>Update License</DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="license_name"
            value={license_name}
            onChange={(e) => setLicenseName(e.target.value)}
            label="License Name"
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
            id="pdf_link"
            label="PDF Link"
            value={pdf_link}
            onChange={(e) => setPdfLink(e.target.value)}
            type="text"
            fullWidth
            variant="outlined"
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose1}>Cancel</Button>
          <Button onClick={(e) => handleUpdateCertification(e)}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default IndividualCertificate;
