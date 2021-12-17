import React from 'react'

import Avatar from '@mui/material/Avatar';
import styled from "styled-components";
import AddIcon from '@mui/icons-material/Add';
import InputOption from '../Home/InputOption';
import EditIcon from '@mui/icons-material/Edit';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import './Profile.css';
import Experience from '../Experience/Experience';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import Education from '../Education/Education';
import Certification from '../Certification/Certification';

export default function Profile() {
  const [value, setValue] = React.useState(0);
  const ref = React.useRef(null);
  const newsArticle = (heading, subtitle) => (
    <div className="widgets__article">
        <div className="widgets__articleLeft">
            <FiberManualRecordIcon />
        </div>

        <div className="widgets__articleRight">
            <h4>{heading}</h4>
            <p>{subtitle}</p>
        </div>
    </div>
);
    return (
        <>
        <Container>
        <div className="profile__sidebar">
            <div className="profile__sidebar__top">
                <img src="/images/linkedIn.png" alt="background" />
                
                <Avatar src="/images/avatar.png" className="profile__sidebar__avatar" style={{height: "150px", width: "150px"}}></Avatar> 
                <h1 style={{padding:"35px"}}>Sai Jagat Udbhav Govindu <EditIcon/></h1>
                <p> Followers Count: </p>
                <p> Github Link</p>
                <p> LinkedIn Link</p>
                <p> Bio </p>
                <p> Education</p> 

            </div>
            
        </div>
        <div className="profile__widgets">
            <div className="profile__widgets__header">
                <h2>Job Interests</h2>
                <InfoOutlinedIcon />
            </div>
            {newsArticle("Elon Musk is now the richest person in the world", "Top news - 4296 readers")}
            {newsArticle("Elon Musk is now the richest person in the world", "Top news - 4296 readers")}
            
        </div>
        <Experience/>
        <Education/>
        <Certification/>
        </Container>

        </>

    )
}

const Container = styled.div`
  padding-top: 30px;
  max-width: 100%;
`;
