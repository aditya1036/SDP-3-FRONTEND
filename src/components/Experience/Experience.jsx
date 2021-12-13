import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../redux/UserContext/UserSlice'
import {API_URL} from '../../config/env'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import TextareaAutosize from '@mui/material/TextareaAutosize';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

const Experience = () => {

    const state = useSelector(selectUser)
    const [experience , setExperience] = useState([])
    const [title, setTitle] = useState('')
    const [duration, setDuration] = useState('')
    const [location, setLocation] = useState('')
    const [open, setOpen] = useState(false);
    



    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {

        async function UserExperience(){
            const res = await fetch(`http://localhost:8080/api/experience/getByUserId/${state.id}`,{
                method: 'GET',
             headers: {
                 "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token")).token}`
             }
            })
            const data = await res.json()
            setExperience(...experience,data.Listdata)
        } 

        UserExperience()
    },[])

  
    const handleSubmit = async (e) => {
     
        e.preventDefault();
        const res = await fetch(`${API_URL}/api/experience/addExperience` ,{
            headers:{
                'Content-Type': "application/json",
                "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token")).token}`,
            },
            method: "POST",
            body:  JSON.stringify({
              "title": title,
              "location" : location,
              "duration" : duration,
              "user_id" : state.id
          })
        })
        const data  = await res.json()
        setExperience((e) => [...e, data.data]);
        
      
        setTitle('')
        setDuration('')
        setLocation('')

        
    }



    return (
        
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
        Add
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Experience</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Title"
            value = {title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            label="Duration"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            label="Location"
            type="text"
            fullWidth
            variant="standard"
          />
          
        
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose} type='submit'>ADD</Button>
        </DialogActions>
          </Box>
        </DialogContent>
        
      </Dialog>    
        <h1>Experience Component</h1>
        {experience.length === 0 && <h1>No Experience</h1>}
        { experience &&
            experience.map((exp) => (
                <div key={exp.id}>
                <h4>{exp.title}</h4>
                <h4>{exp.duration}</h4>
                <h4>{exp.location}</h4>
                </div>
            ))
        }
        

          
        </div>
    )
}

export default Experience
