import React from "react";
import "./Job.css";
import { Avatar } from "@mui/material";
import { Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
const JobDetailCard = ({ jobDetail }) => {
  return (
    <>
      <div className="job_detail_container">
      
          <Typography gutterBottom variant="h5" component="div">
            Company: {jobDetail.company}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            Job Title: {jobDetail.title}
          </Typography>
          <Typography variant="body2" variant="h6" color="text.secondary">
            Description: {jobDetail.description}
          </Typography>
          <Typography variant="body2" variant="h6" color="text.secondary">
            Employment Type: {jobDetail.employmenttype}
          </Typography>
          <Typography variant="body2" variant="h6" color="text.secondary">
            Location: {jobDetail.location}
          </Typography>
          <Typography variant="body2" variant="h6" color="text.secondary">
            WorkPlace: {jobDetail.workplace}
          </Typography>

          <Button variant="contained" color="success" size="medium">
            APPLY
          </Button>
      </div>
    </>
  );
};

export default JobDetailCard;
