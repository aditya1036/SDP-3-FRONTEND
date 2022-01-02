import { Container } from "@mui/material";
import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import IndividualApplicant from "./IndividualApplicant";

function ViewApplicants() {
  const { id } = useParams();
  const [applicants, setApplicants] = React.useState([]);

  React.useEffect(() => {
    let fetching = true;

    axios
      .get(`https://secure-stream-79742.herokuapp.com/api/applicant/getapplicantbyjobid/${id}`, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("token")).token
          }`,
        },
      })
      .then((data) => {
        if (fetching) {
            let newData = data.data.ListData.filter(el => el.status !== true);
          setApplicants([...applicants, ...newData || []])
          // console.log(data);
        }
      });

    return () => (fetching = false);
  }, [id]);

  return (
    <Container>
      <div style={{textAlign: "center", margin:"1rem"}}>
          <span style={{fontSize: "2rem"}}>
          Here are your applicants

          </span>
        </div>

      <div style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>

        {applicants && applicants.map(el => <IndividualApplicant data={el} setApplicants={setApplicants} applicants={applicants}/>)}

      </div>
    </Container>
  );
}

export default ViewApplicants;
