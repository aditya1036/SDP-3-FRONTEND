import React, { useState } from "react";
import "./JobPage.css";
import Divider from "@mui/material/Divider";
import { Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";


function JobCard({ job, setJobDetail }) {
  const [singleJob, setSingleJob] = useState(job);

  const HandleClick = async () => {
    // console.log(singleJob);
    setJobDetail(singleJob);
  };

  return (
    <div className="main-job-card">
      <div className="job-card-top-section">
        <span> {singleJob.job_title} </span>{" "}
        <span style={{ color: "grey" }}>
          {"Posted At: " +
            new Date(singleJob.created_at)
              .toUTCString()
              .split(" ")
              .slice(0, 4)
              .join(" ")}
        </span>
      </div>

      <Divider />
      <div className="job-card-body-section">
        <div className="job-card-body-section-content-section">
          <div>
            <span className="job-card-body-section-title-section">
              Company:
            </span>
            <span>{" " + singleJob.company}</span>
          </div>
          <div>
            <span className="job-card-body-section-title-section">
              Employment:
            </span>
            <span>{" " + singleJob.employment_type}</span>
          </div>
          <div>
            <span className="job-card-body-section-title-section">
              WorkPlace:
            </span>
            <span>{" " + singleJob.workplace}</span>
          </div>
        </div>
        <div className="job-card-action">
          <Button
            variant="contained"
            endIcon={<ArrowForwardIcon />}
            onClick={HandleClick}
            color="primary"
          >
            details
          </Button>
        </div>
      </div>
    </div>
  );
}

export default JobCard;
