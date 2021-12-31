import React, { useEffect, useState } from "react";
import JobCard from "./JobCard";
import "./JobPage.css";
import Divider from "@mui/material/Divider";
import CallMadeIcon from "@mui/icons-material/CallMade";
import { Button } from "@mui/material";

function JobPage() {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [componentState, setComponentState] = useState(false);
  const [jobDetail, setJobDetail] = useState(null);
  let page = 0;
  let last = false;

  useEffect(() => {
    fetchJobs();
  }, []);

  function chunkString(str, length = 80) {
    return str.replace(/([.?!])\s*(?=[A-Z])/g, "$1|").split("|");
  }

  const fetchJobs = () => {
    setIsLoading(true);

    fetch(`http://localhost:8080/api/job/getalljobs?pageNo=${page}`, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("token")).token
        }`,
      },
    })
      .then((data) => data.json())
      .then((data) => {
        setJobs((jobs) => [...jobs, ...(data.content || [])]);
        last = data.last;
        console.log(data.content);
        setIsFirstLoad(false);
        setIsLoading(false);
      })
      .catch((e) => {
        alert("Some Error Occured try later");
      });
  };

  return (
    <div className="main-feed-div">
      {/* <div className="main-job-toolbar-container">


        <div className="main-job-feed-toolbar">


        </div>
        </div> */}
      <div className="main-feed-section">
        <div className="main-list-view">
          {jobs &&
            jobs.map((job) => (
              <JobCard key={job.id} job={job} setJobDetail={setJobDetail} />
            ))}
        </div>

        <div className="main-detail-view" style={{height : !jobDetail ? "80vh": "auto"}}>
          <div className="main-detail-card">
            {!jobDetail ? (
              <div style={{ fontSize: "2rem" }}>No Job Selected 🔎</div>
            ) : (
              <div className="main-job-detail-card">
                <div className="job-detail-top-section">
                  <span style={{ fontSize: "2rem" }}>
                    {jobDetail.job_title}
                  </span>
                  <span style={{ fontSize: "1rem", color: "grey" }}>
                    {" "}
                    {" Posted At: " +
                      new Date(jobDetail.created_at)
                        .toUTCString()
                        .split(" ")
                        .slice(0, 4)
                        .join(" ")}
                  </span>
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
                    <Button variant="contained" color="success" endIcon={<CallMadeIcon />} size="medium">
                      APPLY
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default JobPage;
