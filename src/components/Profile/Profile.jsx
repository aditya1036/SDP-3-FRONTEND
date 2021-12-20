import React from 'react'
import {useSelector} from 'react-redux'
import {selectUser} from '../redux/UserContext/UserSlice'
import Avatar from '@mui/material/Avatar';
import styled from "styled-components";
import {useState , useEffect} from 'react';
import EditIcon from '@mui/icons-material/Edit';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import './Profile.css';
import Experience from '../Experience/Experience';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import Education from '../Education/Education';
import Certification from '../Certification/Certification';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {API_URL} from '../../config/env'
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import GitHubIcon from '@mui/icons-material/GitHub';
import Link from '@material-ui/core/Link';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
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

const names = [
  'C++',
  'Java',
  'Python',
  'React JS',
  'Angular JS'
];

const names1 = [
    'English',
    'Hindi',
    'Chinese'
  ];


function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }



export default function Profile() {
    
    const user_state = useSelector(selectUser)
    const [open, setOpen] = useState(false);
    const [userProfile , setUserProfile] = useState({})
    const theme = useTheme();
    const [github_link , setGithub] = useState('')
    const [linked_link , setLinkedIn] = useState('')
    const [bio , setBio] = useState('')
    const [skills , setSkills] = useState([])
    const [languages , setLanguages] = useState([])



    useEffect(() => {

        async function initialUser()
        {
            const res = await fetch(`${API_URL}/api/profile/user/profile/${user_state.id}` , 
            {
                method:'GET',
                headers:
                {
                    "Content-Type": "application/json",
                    "Authorization" : `Bearer ${JSON.parse(localStorage.getItem("token")).token}`,
                }
            })
            const data = await res.json();
            setUserProfile(data.data[0])
        }
        initialUser();

    
    }, [])
    

    const handleClickOpen = () => {
        setOpen(true);
    };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSkills(
      // On autofill we get a the stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  const handleChange1 = (event) => {
    const {
      target: { value },
    } = event;
    setLanguages(
      // On autofill we get a the stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleUpdate= async (e,id) => {

    e.preventDefault();
    const res = await fetch(`${API_URL}/api/profile/user/profile/update` , {
        method: 'PUT',
        headers: 
        {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${JSON.parse(localStorage.getItem("token")).token}`,
        
        },
        body: JSON.stringify({
            id: id,
            github_link: github_link,
            linkedIn_link: linked_link,
            bio : bio,
            skills: skills,
            languages: languages,
            profile_image : null
        })
        

    })

    const data = await res.json();
    console.log(data)
    setUserProfile({
        "id": user_state.id,
        "github_link": github_link,
        "linkedIn_link": linked_link,
        "bio" : bio,
        "skills": skills,
        "languages": languages,
        "profile_image" : null

    })
    handleClose()
  }

  const handleClose = () => {
    setOpen(false);
  };
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
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Update Profile</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    Update Your Profile...
                </DialogContentText>
                <TextField
                    autoFocus
                    value={linked_link}
                    onChange={(e) => setLinkedIn(e.target.value)}
                    margin="dense"
                    id="linkedin"
                    label="LinkedIn Link"
                    type="text"
                    fullWidth
                    variant="standard"
                    required
                />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <TextField
                    autoFocus
                    value={github_link}
                    onChange={(e) => setGithub(e.target.value)}
                    margin="dense"
                    id="github"
                    label="Github Link"
                    type="text"
                    fullWidth
                    variant="standard"
                    required
                />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    label="Description"
                    type="text"
                    fullWidth
                    variant="standard"
                    required
                />
                 <Select
          multiple
          displayEmpty
          value={skills}
          onChange={handleChange}
          input={<OutlinedInput />}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em>Programming Languages</em>;
            }

            return selected.join(', ');
          }}
          MenuProps={MenuProps}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem disabled value="">
            <em>Programming Languages</em>
          </MenuItem>
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, skills, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Select
          multiple
          displayEmpty
          value={languages}
          onChange={handleChange1}
          input={<OutlinedInput />}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em>Languages</em>;
            }

            return selected.join(', ');
          }}
          MenuProps={MenuProps}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem disabled value="">
            <em>Languages</em>
          </MenuItem>
          {names1.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, names1, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={(e) => handleUpdate(e,user_state.id)}>Update</Button>
                </DialogActions>
            </Dialog>
            </div>
        <Container>
        <div className="profile__sidebar">
            <div className="profile__sidebar__top">
                <img src="/images/linkedIn.png" alt="background" />
                
                <Avatar src="/images/avatar.png" className="profile__sidebar__avatar" style={{height: "150px", width: "150px"}}></Avatar> 
                <span onClick={handleClickOpen}><EditIcon style={{marginLeft: "850px"}}/></span>
                <h1 style={{padding:"20px"}}>{user_state.first_name}&nbsp;{user_state.last_name}</h1>
                <div>
                <Link href={userProfile.github_link} style={{marginLeft: "30px"}} target="_blank">
                  <GitHubIcon/>
                </Link>
                <Link href={userProfile.linkedIn_link} style={{marginLeft: "10px"}} target="_blank">
                  <LinkedInIcon/>
                </Link>
                </div>
                <div className='profile__info'>
                <p>456 Connections</p>&nbsp;&nbsp;&nbsp;&nbsp;
                </div>
                <div className='profile__addition'>
                <p> Bio: {userProfile.bio}</p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <p>Languages: {userProfile.languages}</p>&nbsp;&nbsp;&nbsp;&nbsp;
                <p>Skills: {userProfile.skills}</p>&nbsp;&nbsp;&nbsp;&nbsp;
                </div>
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
