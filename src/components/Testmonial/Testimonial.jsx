import React from 'react'
import './Testimonial.css'
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Avatar } from '@mui/material';
import Link from '@mui/material/Link';
const Testimonial = () => {

    const data = [


        {
            id: 1,
            name: "Navneet Kumar Singh",
            designation: 'CEO',
            description: "I am a developer that like to work on MERN and I have worked on the authetication part of the project",
            img: 'images/avatar.png',
            github_link: 'https://github.com/Navneet7716',
            linked_link: 'https://www.linkedin.com/in/navneet7716/',
            featured: false
        }
        ,
        {
            id: 2,
            name: "Udbhav Govindu",
            designation: 'Web Developer',
            description: "I am a developer that like to work on MERN and I have worked on the authetication part of the project",
            img: 'images/avatar.png',
            github_link: 'https://github.com/udbhav3101',
            linked_link: 'https://www.linkedin.com/in/udbhav-govindu/',
            featured: true
        }
        ,
        //Aboutus
        {
            id: 3,
            name: "Aditya khandelwal",
            designation: 'Web Developer',
            description: "I am a developer that like to work on MERN and I have worked on the authetication part of the project",
            img: 'images/avatar.png',
            github_link: 'https://github.com/aditya1036',
            linked_link: 'https://www.linkedin.com/in/aditya-khandelwal-6237821aa/',
            featured: false
        }

    ]





    return (
        <>
        <div className='parent_container'>
        <div className='testimonial_aboutus_container'>
        <h1 style={{marginLeft: "20px"}}>About us</h1> 
        <div className='testimonial_content'>
            <span style={{ textAlign : "center", fontSize : "1.2rem" }}>

                Hey, welcome to jobbers <br/>
                Here we are commited to find you the next big thing in your career <br />
                Our team is dedicated and devoted into building the best UI and UX possible <br />

            </span>
        </div>
        </div>
        </div>


        <div className="testimonials" id="testimonial">
            <div className="container">
                {data.map((item) => (

                    <div key={item.id} className={item.featured ? "card featured" : "card"}>
                        <div className="top">
                            <Link href={item.linked_link}>
                                <LinkedInIcon fontSize='large' style={{color: 'black'}}/>
                            </Link>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <Avatar style={{height: "50px", width:"50px"}}src={item.img}> </Avatar>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <Link href={item.github_link} target="_blank">
                            <GitHubIcon fontSize='large' style={{color: 'black'}}/>
                            </Link>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                        </div>
                        <div className="center">
                            <p>{item.description}</p>
                        </div>
                        <div className="bottom">
                            <h4>{item.name}</h4>
                            <h3>{item.designation}</h3>
                        </div>
                    </div>

                    ))}

                
            </div>
        </div>
        
        </>
    )
}

export default Testimonial