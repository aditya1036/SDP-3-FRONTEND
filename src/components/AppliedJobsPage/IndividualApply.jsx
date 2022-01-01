import { Button, Divider, Container } from '@mui/material';
import React, { useState } from 'react'

function IndividualApply({data}) {

    const [ajob, setAjob] = useState(data);

    return (
<Container>
        <div className="main-job-card">
      <div className="job-card-top-section">
        <span> {ajob.postData.job_title} </span>{" "}
        <span style={{ color: "grey" }}>
          {"Posted At: " +
            new Date(ajob.postData.created_at)
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
            <span>{" " + ajob.postData.company}</span>
          </div>
          <div>
            <span className="job-card-body-section-title-section">
              Employment:
            </span>
            <span>{" " + ajob.postData.employment_type}</span>
          </div>
          <div>
            <span className="job-card-body-section-title-section">
              WorkPlace:
            </span>
            <span>{" " + ajob.postData.workplace}</span>
          </div>
        </div>
        <div className="job-card-action">
            {ajob.status ?  <Button
            variant="contained"
            color="success"
          >
            Approved
          </Button>:   <Button
            variant="contained"
            color="error"
          >
            Not Approved
          </Button>}
        
        </div>
      </div>
    </div>
    </Container>
    )
}

export default IndividualApply
