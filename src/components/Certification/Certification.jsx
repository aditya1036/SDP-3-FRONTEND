import React from 'react'
import './Certification.css'
import AddIcon from '@mui/icons-material/Add'; 
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
const Certification = () => {
    return (
        <div className='certification_container'>
        <h1 style={{marginLeft: "20px"}}>Certificate <AddIcon style={{marginRight:"auto", marginLeft: "680px"}}/></h1> 
        <div className='certification_content'>
            <h2 style={{marginLeft: "30px", marginTop: "30px"}}> This is some shit<EditIcon style={{marginLeft: "800px"}}/> <DeleteIcon/></h2>
        </div>

        <div className='certification_content'>
            <h2 style={{marginLeft: "30px", marginTop: "30px"}}> This is some shit <EditIcon style={{marginLeft: "800px"}}/> <DeleteIcon/></h2>
        </div>
        </div>
    )
}

export default Certification