import React from 'react'
import './Education.css';
import AddIcon from '@mui/icons-material/Add'; 
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {useState , useEffect} from 'react'
import {API_URL} from '../../config/env'
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/UserContext/UserSlice';





export const Education = () => {

    const user_state = useSelector(selectUser)

    useEffect(() => {

        async function userExperience()
        {
            const res = await fetch(`${API_URL}/api/education/getbyuserid/${user_state.id}` , 
            {
                method:'GET',
                headers:
                {
                    "Content-Type": "application/json",
                    "Authorization" : `Bearer ${JSON.parse(localStorage.getItem("token")).token}`,
                }
            })
            const data = await res.json();
            console.log(data.data)
        }
        userExperience();
    },[])




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
