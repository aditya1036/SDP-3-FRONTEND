import { Button } from "@mui/material";
import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/UserContext/UserSlice";
import IndividualApply from "./IndividualApply";
import ArrowBackTwoToneIcon from "@mui/icons-material/ArrowBackTwoTone";
import { Link } from "react-router-dom";

function AppliedJobsView() {
  const user = useSelector(selectUser);

  const [appliedJobs, setAppliedJobs] = React.useState([]);

  React.useEffect(() => {
    let fetching = true;

    console.log(user);

    axios
      .get(
        `https://secure-stream-79742.herokuapp.com/api/applicant/getapplicantbyuserid/${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("token")).token
            }`,
          },
        }
      )
      .then((data) => {
        if (fetching) {
          // console.log(data)
          setAppliedJobs([...appliedJobs, ...data.data.ListData || []]);
          // console.log(data);
        }
      });

    return () => (fetching = false);
  }, []);

  return (
    <div>
      <div
        style={{
          textAlign: "center",
          margin: "1rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {appliedJobs.length > 0 ? (
          <span style={{ fontSize: "2rem" }}>
            Here are your Applied jobs 💼
          </span>
        ) : (
          <div
            style={{
              marginTop: "2rem",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {" "}
            <span style={{ fontSize: "2rem" }}>
              You haven't applied for a single job yet..
            </span>{" "}
            <div style={{ marginTop: "1rem" }}>
                <Link to="/jobs">
              <Button
                startIcon={<ArrowBackTwoToneIcon />}
                color="warning"
                variant="contained"
                >
                Go Back
              </Button>
                  </Link>
            </div>{" "}
          </div>
        )}
      </div>
      {appliedJobs && appliedJobs.map((el) => <IndividualApply data={el} />)}
    </div>
  );
}

export default AppliedJobsView;
