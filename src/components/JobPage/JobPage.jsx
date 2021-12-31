import React, { useEffect, useState } from "react";
import JobCard from "./JobCard";
import "./JobPage.css";
import Divider from "@mui/material/Divider";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import JobDetail from "./JobDetail";
import WorkTwoToneIcon from "@mui/icons-material/WorkTwoTone";
import AddBoxTwoToneIcon from "@mui/icons-material/AddBoxTwoTone";
import CreateTwoToneIcon from "@mui/icons-material/CreateTwoTone";
import ArticleTwoToneIcon from "@mui/icons-material/ArticleTwoTone";
import { Link } from "react-router-dom";

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
      <div className="main-feed-section">
        <div className="main-feed-side-bar">
          <nav aria-label="main mailbox folders">
            <List>
                <Link to="/applied">
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <WorkTwoToneIcon />
                  </ListItemIcon>
                  <ListItemText primary="View Applied Jobs" />
                </ListItemButton>
              </ListItem>
                </Link>
              <Divider />
              <Link to="/createdJobs">
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <AddBoxTwoToneIcon />
                  </ListItemIcon>
                  <ListItemText primary="View Created Jobs" />
                </ListItemButton>
              </ListItem>
              </Link>
              <Divider />
              <Link to="/jobform">
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <CreateTwoToneIcon />
                  </ListItemIcon>
                  <ListItemText primary="Post a free job" />
                </ListItemButton>
              </ListItem>
              </Link>
              <Divider />
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <ArticleTwoToneIcon />
                  </ListItemIcon>
                  <ListItemText primary="Check Resume" />
                </ListItemButton>
              </ListItem>
            </List>
          </nav>
        </div>
        <div className="main-list-view">
          {jobs &&
            jobs.map((job) => (
              <JobCard key={job.id} job={job} setJobDetail={setJobDetail} />
            ))}
        </div>
        <div
          className="main-detail-view"
          style={{ height: !jobDetail ? "80vh" : "auto" }}
        >
          <div className="main-detail-card">
            {!jobDetail ? (
              <div style={{ fontSize: "2rem" }}>No Job Selected 🔎</div>
            ) : (
              <JobDetail jobDetail={jobDetail} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default JobPage;
