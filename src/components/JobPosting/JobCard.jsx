import React from 'react'
import {useState, useEffect} from 'react';

import CircularProgress from '@mui/material/CircularProgress';
import { Avatar } from '@material-ui/core'
import './JobPosting.css'
import { Button } from '@mui/material';



export const JobCard = () => {
    const [jobs, setJobs] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [isFirstLoad, setIsFirstLoad] = useState(true);
    var last = false
    var page = 0;

    useEffect(() => {
        window.scrollTo({top: 0, behavior: 'smooth'});

        fetchJobs();

        window.addEventListener("scroll", handleScroll);
    }, []);

    const fetchJobs = () => {
        setIsLoading(true);

        fetch(`http://localhost:8080/api/job/getalljobs?pageNo=${page}`,{
            headers: {
                'Authorization' : `Bearer ${JSON.parse(localStorage.getItem("token")).token}`
            }
        })

        .then((data) => data.json())
        .then((data) => {
            setJobs((jobs) => [...jobs , ...data.content]);
            last = data.last
            console.log(data.content)
            setIsFirstLoad(false);
            setIsLoading(false);
      })
      .catch((e) => {
        alert(
          "Loading image from Unsplash failed. This is likely due to exceeding free API limit. Please clone the repo and try locally using your own API keys or come back in 60 minutes."
        );
      });
    };

    const handleScroll = () => {
        if (
          Math.ceil(window.innerHeight + window.scrollY) >=
          document.documentElement.offsetHeight
        ) {
          if(last)
          {
          return
          }
          page = page + 1
          fetchJobs();
        }
      };
    return (
        <>

            
{isFirstLoad ? (
                <h3 style={{display:"flex" , alignItems: "center" , justifyContent: "center"}}><CircularProgress disableShrink/></h3>
              ) : (
                <>
                  {jobs.length ? (
                    <>
                      {jobs.map((job) => (
                      
        <div>
            <div className ='jobposting'>
        <div className="jobposting__header">
            <Avatar src="/images/avatar.png"></Avatar>
            <div className="jobposting__info">
                <h2>{job.job_title}</h2>
                <p>{job.job_description}</p>
            </div>
        </div>


         <div className="jobposting__body">
             <p>{job.employment_type}</p>
             &nbsp; <Button variant="contained" href="#contained-buttons" size='small'> Apply </Button>
         </div>  
        </div>
        </div>
                      ))}
                    </>
                  ) : null}

                 
                </>
              )}
              {last &&(
                <div >
                  <div >
                   Loading . . . <CircularProgress disableShrink/>
                  </div>
                </div>
              )}         
        </>
    )
}
