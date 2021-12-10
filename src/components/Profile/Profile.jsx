import './Profile.css'
import { useSelector } from 'react-redux'
import { selectUser } from '../redux/UserContext/UserSlice'
import { useState , useEffect} from 'react'
import { API_URL } from '../../config/env'
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


const skills_ = [
    'C++',
    'java',
    'Python',

  ];

const languages_ = [
    'C++',
    'java',
    'Python',

  ];

  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }
  
  



const Profile = () => {

    const state = useSelector(selectUser)
    const [profile , setProfile] = useState({})
    const [open, setOpen] = useState(false);
    const [github,setGithub] = useState('');
    const [linkedIn,setLinkedIn] = useState('');
    const [bio,setBio] = useState('')
    const theme = useTheme();
    const [skills, setSkills] = useState([]);
    const [languages, setLanguages] = useState([]);

    const handleChange_skills = (event) => {
        const {
        target: { value },
        } = event;
        setSkills(
        // On autofill we get a the stringified value.
        typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleChange_languages = (event) => {
        const {
        target: { value },
        } = event;
        setLanguages(
        // On autofill we get a the stringified value.
        typeof value === 'string' ? value.split(',') : value,
        );
    };

    
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
   
    useEffect(() => {

        async function userProfile(){
         const res = await fetch(`${API_URL}/api/profile/user/profile/${state.id}`, {
             method: 'GET',
             headers: {
                 "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token")).token}`
             }
         })
         
         const data = await res.json();
         console.log(data.data[0])
         setProfile(data.data[0])
        }
        userProfile()
    },[])

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        const res = await fetch(`http://localhost:8080/api/profile/user/profile/update`,{
            method: 'PUT',
            headers: {
                'Content-Type' : "application/json",
                "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token")).token}`,
                
            },
            body: JSON.stringify({
                "id": state.id,
                "bio":bio,
                "github_link" : github,
                "linkedIn_link": linkedIn,
                "skills": skills,
                "languages" : languages,
                "profile_image" : null
            })
        })
        const data = await res.json()
        window.location.reload(true)
    
    }



    return (
        <div>
        <h1>Profile Component</h1>
        <h4>{profile.id}</h4>
        <h4>{profile.bio}</h4>
        <h4>{profile.github_link}</h4>
        <h4>{profile.linkedIn_link}</h4>
        <h4>{profile.skills}</h4>
        <h4>{profile.languages}</h4>


        
      <Button variant="outlined" onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Github Link"
            value = {github}
            onChange={(e) => setGithub(e.target.value)}
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            value={linkedIn}
            onChange={(e) => setLinkedIn(e.target.value)}
            label="Linked Link"
            type="text"
            fullWidth
            variant="standard"
          />
          <InputLabel id="demo-multiple-chip-label">Skills</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={skills}
          onChange={handleChange_skills}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {skills_.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, skills, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
        <InputLabel id="demo-multiple-chip-label">Languages</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={languages}
          onChange={handleChange_languages}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {languages_.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, languages, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>

        <TextareaAutosize
            aria-label="minimum height"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            minRows={3}
            placeholder="Bio"
            style={{ width: 200 }}
        />
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose} type='submit'>Update</Button>
        </DialogActions>
          </Box>
        </DialogContent>
        
      </Dialog>
    </div>
        
    )
}

export default Profile
