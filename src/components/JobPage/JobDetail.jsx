import { Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import "./JobPage.css";
import Divider from "@mui/material/Divider";
import CallMadeIcon from "@mui/icons-material/CallMade";
import ApplyModel from "./ApplyModel";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/UserContext/UserSlice";

function JobDetail({ jobDetail }) {

  const user = useSelector(selectUser);
  const [open, setOpen] = React.useState(false);
  const [isApplied, setIsApplied] = useState(jobDetail.applied);

  useEffect(() => {
    // console.log("JOB DETAILS: ", jobDetail)
    setIsApplied(jobDetail.applied)
  }, [])

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const HandleSubmit = async () => {
    let data = {
      job_id: jobDetail.id,
      user_id: user.id,
    };

    let res = await axios.post(
      `https://secure-stream-79742.herokuapp.com/api/applicant/addapplicant`,
      data,
      {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("token")).token
          }`,
        },
      }
    );

    jobDetail.applied = true
    setIsApplied(true);
    handleClose();
  };

  // console.log("JOB DETAILS IS APPPLIED: ", isApplied)

  function chunkString(str, length = 80) {
    return str.replace(/([.?!])\s*(?=[A-Z])/g, "$1|").split("|");
  }
  return (
    <>
      <div className="main-job-detail-card">
        <div className="job-detail-top-section">
          <span style={{ fontSize: "2rem" }}>{jobDetail.job_title}</span>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <a
              href={`/profile/${jobDetail.userData.id}`}
              style={{ fontSize: "1rem", color: "grey" }}
            >
              {"Posted By: " + jobDetail.userData.fullname}
            </a>
            <span style={{ fontSize: "1rem", color: "grey" }}>
              {" "}
              {" At: " +
                new Date(jobDetail.created_at)
                  .toUTCString()
                  .split(" ")
                  .slice(0, 4)
                  .join(" ")}
            </span>
          </div>
        </div>
        <Divider />

        <div className="main-jobdetail-body-section">
          <div className="main-jobdetail-text-section">
            <span>Company: {jobDetail.company}</span>

            <span>Location: {jobDetail.job_location}</span>

            <span>WorkPlace: {jobDetail.workplace}</span>

            <span>Employment Type: {jobDetail.employment_type}</span>

            <div style={{ marginTop: "2rem" }}>
              <span>Job description:</span>
              <br />
              <ul>
                {chunkString(jobDetail.job_description).map((el) => (
                  <li style={{ listStyleType: "square" }}>{el} </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="main-jobdetail-action">
            <Button
              disabled={jobDetail.applied}
              variant="contained"
              color="success"
              endIcon={<CallMadeIcon />}
              onClick={handleClickOpen}
              size="medium"
            >
              APPLY
            </Button>
          </div>
        </div>
      </div>

      <ApplyModel
        handleClose={handleClose}
        open={open}
        HandleSubmit={HandleSubmit}
      />
    </>
  );
}

export default JobDetail;
