
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

    return (
        <div className='experience_container'>
        <h1 style={{marginLeft: "20px"}}>Work Experience<AddIcon style={{marginLeft: "580px"}}/></h1> 
            <>
            <div className='experience_content'>
            <h4 style={{marginLeft: "40px", marginTop: "30px"}}>title</h4>
            <h4 style={{marginLeft: "40px", marginTop: "30px"}}>duration</h4>
            <h4 style={{marginLeft: "40px", marginTop: "30px"}}>location</h4>
            </div>
            </>
        </div>
    )
}

export default Experience