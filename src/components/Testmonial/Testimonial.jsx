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
const Testimonial = () => {

    const data = [


        {
            id: 1,
            name: "Navneet Kumar Singh",
            designation: 'CEO',
            description: "I am a developer that like to work on MERN and I have worked on the authetication part of the project",
            img: 'images/avatar.png',
            featured: false
        }
        ,
        {
            id: 2,
            name: "Udbhav Govindu",
            designation: 'Web Developer',
            description: "I am a developer that like to work on MERN and I have worked on the authetication part of the project",
            img: 'images/avatar.png',
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
            featured: false
        }

    ]





    return (
        <>
        <div className='parent_container'>
        <div className='testimonial_aboutus_container'>
        <h1 style={{marginLeft: "20px"}}>About us</h1> 
        <div className='testimonial_content'>
            <h2 style={{marginLeft: "40px", marginTop: "30px"}}> Sit elit tempor nostrud ex dolore anim anim duis sunt minim mollit. Ad laboris ea duis velit pariatur do qui ullamco culpa aliquip. Ullamco irure excepteur irure amet enim amet. Proident ipsum qui sint tempor nisi sit. Adipisicing nostrud sunt duis officia exercitation pariatur fugiat proident occaecat.</h2>
        </div>
        </div>
        </div>


        <div className="testimonials" id="testimonial">
            <div className="container">
                {data.map((item) => (

                    <div key={item.id} className={item.featured ? "card featured" : "card"}>
                        <div className="top">
                            <LinkedInIcon fontSize='large'/>&nbsp;&nbsp;&nbsp;&nbsp;
                            <Avatar style={{height: "50px", width:"50px"}}src={item.img}> </Avatar>&nbsp;&nbsp;&nbsp;&nbsp;
                            <GitHubIcon fontSize='large'/>&nbsp;&nbsp;&nbsp;&nbsp;
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