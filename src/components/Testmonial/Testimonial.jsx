import React from 'react'
import './Testimonial.css'
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
const Testimonial = () => {

    const data = [


        {
            id: 1,
            name: "Navneet Kumar Singh",
            designation: 'CEO',
            description: "Co-Founder",
            img: 'images/author.png',
            featured: false
        }
        ,
        {
            id: 2,
            name: "Udbhav Govindu",
            designation: 'Web Developer',
            description: "CO-Founder",
            img: 'images/author.png',
            featured: true
        }
        ,
        {
            id: 3,
            name: "Aditya khandelwal",
            designation: 'Web Developer',
            description: "I am a developer that like to work on MERN and I have worked on the authetication part of the project",
            img: 'images/author.png',
            featured: false
        }

    ]





    return (
        <div className="testimonials" id="testimonial">
            <h1>About us</h1>
            <div className="container">
                {data.map((item) => (

                    <div key={item.id} className={item.featured ? "card featured" : "card"}>
                        <div className="top">
                            <LinkedInIcon fontSize='large'/>
                            <img src={item.img} alt="" />
                            <GitHubIcon fontSize='large'/>
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
    )
}

export default Testimonial