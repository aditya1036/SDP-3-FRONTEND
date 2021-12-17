
import React from 'react'
import './Experience.css'
import AddIcon from '@mui/icons-material/Add'; 
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
const Experience = () => {
    return (
        <div className='experience_container'>
        <h1 style={{marginLeft: "20px"}}>Work Experience <AddIcon style={{marginLeft: "580px"}}/></h1> 
        <div className='experience_content'>
            <h2 style={{marginLeft: "30px", marginTop: "30px"}}> This is some shit <EditIcon style={{marginLeft: "800px"}}/>&nbsp;<DeleteIcon/></h2>
        </div>

        <div className='experience_content'>
            <h2 style={{marginLeft: "30px", marginTop: "30px"}}> This is some shit <EditIcon style={{marginLeft: "800px"}}/>&nbsp;<DeleteIcon/></h2>
        </div>
        </div>
    )
}

export default Experience