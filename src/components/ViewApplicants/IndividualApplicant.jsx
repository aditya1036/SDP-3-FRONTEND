import { Avatar, Button } from "@mui/material";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import "./IndividualApplicant.css";

function IndividualApplicant({ data, setApplicants, applicants }) {
  const [applicant, setApplicant] = React.useState(data);

  console.log(data);

  const acceptHandler = async () => {
    if (window.confirm("You sure you want to accept?")) {
      let data = {
        id: applicant.id,
        user_id: applicant.userData.id,
        job_id: applicant.postData.id,
        status: true,
      };

      let email = await axios.get(
        `https://secure-stream-79742.herokuapp.com/api/auth/getUserEmail/${applicant.userData.id}`,
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("token")).token
            }`,
          },
        }
      );

      email = email.data;

      let emailData = {
        recipient: email,
        subject: applicant.userData.fullname + " Congratulations ✨",
        message:
          `This is to inform you that you application has been accepted by ${applicant.postData.company} and you will be getting a call soon from our team.`,
      };

      console.log(emailData);

      let mail = await axios.post(
        `https://upload-sdp3.herokuapp.com/upload/sendmail`,
        emailData
      );

      console.log(mail);

      let res = await axios.patch(
        `https://secure-stream-79742.herokuapp.com/api/applicant/updateapplicant`,
        data,
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("token")).token
            }`,
          },
        }
      );

      console.log(res);

      setApplicants(applicants.filter((el) => el.id !== data.id));
    }
  };

  const rejectHandler = async () => {
    if (window.confirm("You sure you want to reject?")) {

        
      let email = await axios.get(
        `https://secure-stream-79742.herokuapp.com/api/auth/getUserEmail/${applicant.userData.id}`,
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("token")).token
            }`,
          },
        }
      );

      email = email.data;

      let emailData = {
        recipient: email,
        subject: applicant.userData.fullname,
        message:
          `This is to inform you that you application has been rejected by ${applicant.postData.company}. Please don't give up and try again later.`,
      };

      console.log(emailData);

      let mail = await axios.post(
        `https://upload-sdp3.herokuapp.com/upload/sendmail`,
        emailData
      );

      let res = await axios.delete(
        `https://secure-stream-79742.herokuapp.com/api/applicant/deleteapplicantbyid/${applicant.id}`,
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("token")).token
            }`,
          },
        }
      );

      console.log(res);

      setApplicants(applicants.filter((el) => el.id !== data.id));
    }
  };

  return (
    <div className="individual-applicant-card">
      <div className="individual-applicant-card-top-section">
        <Avatar
          src={`${applicant.userData.profile_image}`}
          sx={{ width: 56, height: 56 }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            flex: "1",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginLeft: "1rem",
            }}
          >
            <span style={{ fontSize: "1.2rem" }}>
              {applicant.userData.fullname}
            </span>
            <span style={{ fontSize: ".9rem", color: "grey" }}>
              {"Applied on: " +
                new Date(applicant.created_at).toLocaleDateString()}
            </span>
          </div>
          <div>
            <Link to={`/profile/${applicant.userData.id}`}>
              <Button variant="contained">View Profile</Button>
            </Link>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", margin: "1rem" }}>
        <span>{`Job Title: ${applicant.postData.job_title}`}</span>
        <span>{`Description: ${applicant.postData.job_description}`}</span>
      </div>

      <div className="individual-applicant-card-action">
        <Button
          variant="contained"
          color="success"
          onClick={acceptHandler}
          style={{ marginRight: "1rem" }}
        >
          Accept
        </Button>
        <Button color="error" variant="contained" onClick={rejectHandler}>
          Reject
        </Button>
      </div>
    </div>
  );
}

export default IndividualApplicant;
