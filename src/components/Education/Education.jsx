import React from 'react'
import './Education.css';
import AddIcon from '@mui/icons-material/Add'; 
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
export const Education = () => {
    return (
        <div className='education_container'>
        <h1 style={{marginLeft: "20px"}}>Education <AddIcon style={{marginLeft: "690px"}}/></h1> 
        <div className='education_content'>
            <h2 style={{marginLeft: "40px", marginTop: "30px"}}> This is some shit <EditIcon style={{marginLeft: "800px"}}/>&nbsp;<DeleteIcon/></h2>
        </div>

        <div className='education_content'>
            <h2 style={{marginLeft: "40px", marginTop: "30px"}}> This is some shit <EditIcon style={{marginLeft: "800px"}}/>&nbsp;<DeleteIcon/></h2>
        </div>
        </div>
    )
}

export default Education
