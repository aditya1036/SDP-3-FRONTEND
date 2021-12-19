
import React from 'react'
import './Experience.css'
import AddIcon from '@mui/icons-material/Add'; 
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState ,useEffect } from 'react';
import {API_URL} from '../../config/env';
import {useSelector} from 'react-redux';
import {selectUser} from '../redux/UserContext/UserSlice';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DateRangePicker from '@mui/lab/DateRangePicker';
import Box from '@mui/material/Box';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { ConstructionOutlined, Title } from '@mui/icons-material';
import Education from '../Education/Education';


const Experience = () => {

    const user_state = useSelector(selectUser)
    const [experience, setExperience] = useState([]);
    const [value, setValue] = useState([null, null]);
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [exp_id, setExp] = useState(null);

    function convert(str) {
        var date = new Date(str),
          mnth = ("0" + (date.getMonth() + 1)).slice(-2),
          day = ("0" + date.getDate()).slice(-2);
        return [date.getFullYear(), mnth, day].join("-");
      }

    var experience_duration = convert(value[0])+" "+convert(value[1]);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpen1 = (e,id) => {
        setOpen1(true);
        setExp(id)
    };

    const handleClose1 = () => {
        setOpen1(false);
    };

    useEffect(() => {

        async function userExperience()
        {
            const res = await fetch(`${API_URL}/api/experience/getByUserId/${user_state.id}` , 
            {
                method:'GET',
                headers:
                {
                    "Content-Type": "application/json",
                    "Authorization" : `Bearer ${JSON.parse(localStorage.getItem("token")).token}`,
                }
            })
            const data = await res.json();
            setExperience(data.Listdata)
        }
        userExperience();
    },[])

    const handleAddExperience = async(e,id) => {
        e.preventDefault()

        const res = await fetch(`${API_URL}/api/education/add`, {
            method: "POST",
            headers:
                {
                    "Content-Type": "application/json",
                    "Authorization" : `Bearer ${JSON.parse(localStorage.getItem("token")).token}`,
                },
            body:JSON.stringify({
                title: title,
                duration: experience_duration,
                location: location,
                user_id: id
            })
        })
        const data = await res.json()
        console.log(data)
        setExperience([...experience ,{
            title: title,
            duration: experience_duration,
            location: location,
            user_id: id
        }])

        handleClose()
        setTitle('')
        setLocation('')
    }





    return (
        <div className='experience_container'>
        <h1 style={{marginLeft: "20px"}}>Work Experience<span onClick={handleClickOpen}><AddIcon style={{marginLeft: "580px"}}/></span></h1> 
        {experience && experience.map((exp) => (
            <>
            <div className='experience_content'>
            <h4 style={{marginLeft: "40px", marginTop: "30px"}}>{exp.title}</h4>
            <h4 style={{marginLeft: "40px", marginTop: "30px"}}>{exp.duration}</h4>
            <h4 style={{marginLeft: "40px", marginTop: "30px"}}>{exp.location}</h4>
            <span onClick={(e) => handleClickOpen1(e,exp.id)}></span>
            </div>
            </>
        ))}
        </div>
    )
}

export default Experience