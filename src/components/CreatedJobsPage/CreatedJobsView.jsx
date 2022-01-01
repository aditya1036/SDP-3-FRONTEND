import { Container } from '@mui/material';
import axios from 'axios';
import React from 'react'
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/UserContext/UserSlice';
import IndividualCreated from './individualCreated';

function CreatedJobsView() {

    const user = useSelector(selectUser);  
    const [jobs, setJobs] = React.useState([]);  

    
    React.useEffect(()=> {
        
        let fetching = true;

        axios.get(`https://secure-stream-79742.herokuapp.com/api/job/getjobsbyuserid/${user.id}`, {
            headers :{
                Authorization: `Bearer ${
                    JSON.parse(localStorage.getItem("token")).token
                  }`
            }
        }).then(data => { 
            if(fetching) {
                setJobs([...jobs, ...data.data.content || null])
                console.log(data.data.content)
            }
        
        })
        
        return () => fetching = false

    }, [])

    return (
        <Container>
            <div  style={{textAlign: "center", margin: "1rem"}}>
                <span  style={{fontSize: "2rem"}}>
                    Here are your created jobs..
                </span>
            </div>

            <div>
               {jobs && jobs.map(el => <IndividualCreated key={el.id} data={el}/> )} 


            </div>

            
        </Container>
    )
}

export default CreatedJobsView
