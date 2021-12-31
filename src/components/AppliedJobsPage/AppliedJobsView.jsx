import axios from 'axios';
import React from 'react'
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/UserContext/UserSlice';

function AppliedJobsView() {

    const user = useSelector(selectUser)

    const [appliedJobs, setAppliedJobs] = React.useState([])
    
    React.useEffect(()=> {
        
        let fetching = true;

        axios.get(`http://localhost:8080/api/applicant/getapplicantbyuserid/${user.id}`, {
            headers :{
                Authorization: `Bearer ${
                    JSON.parse(localStorage.getItem("token")).token
                  }`
            }
        }).then(data => { 
            setAppliedJobs([...appliedJobs, ...data.data.ListData])
            console.log(data)
        
        })
        

    }, [])

    return (
        <div>
            {
                appliedJobs && appliedJobs.map(el => <div>{el.id}</div>)
            }
        </div>
    )
}

export default AppliedJobsView
