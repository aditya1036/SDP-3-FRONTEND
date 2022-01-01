import { Button, Divider } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

function IndividualCreated({data}) {

    const [job, setJob] = React.useState(data)

    return (
        <div className="main-job-card">
        <div className="job-card-top-section">
          <span> {job.job_title} </span>{" "}
          <span style={{ color: "grey" }}>
            {"Posted At: " +
              new Date(job.created_at)
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
              <span>{" " + job.company}</span>
            </div>
            <div>
              <span className="job-card-body-section-title-section">
                Employment:
              </span>
              <span>{" " + job.employment_type}</span>
            </div>
            <div>
              <span className="job-card-body-section-title-section">
                WorkPlace:
              </span>
              <span>{" " + job.workplace}</span>
            </div>
          </div>
          <div className="job-card-action">
              <Link to={`/applicants/${job.id}`}>
              
            <Button
              variant="contained"
              color="success"
              >
              View Applicants
            </Button>
                </Link>
          </div>
        </div>
      </div>
    )
}

export default IndividualCreated
