import React from 'react'
import './Education.css';
import AddIcon from '@mui/icons-material/Add'; 
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {useState , useEffect} from 'react'
import {API_URL} from '../../config/env'
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/UserContext/UserSlice';
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


const Education = () => {

    const user_state = useSelector(selectUser)
    const[education , setEducation] = useState([])
    const [value, setValue] = useState([null, null]);
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [institute , setInstitute] = useState('')
    const [degree , setDegree] = useState('')
    const [location , setLocation] = useState('')
    const [edu_id , setEdu] = useState(null)
    function convert(str) {
        var date = new Date(str),
          mnth = ("0" + (date.getMonth() + 1)).slice(-2),
          day = ("0" + date.getDate()).slice(-2);
        return [date.getFullYear(), mnth, day].join("-");
      }
    
    var education_duration = convert(value[0])+" "+convert(value[1]);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpen1 = (e,id) => {
        setOpen1(true);
        setEdu(id)
    };

    const handleClose1 = () => {
        setOpen1(false);
    };


    useEffect(() => {

        async function userEducation()
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
            setEducation([...data.ListData])
        }
        userEducation();
    },[])


    const handleAddEducation = async (e,id) => {
        e.preventDefault()

        const res = await fetch(`${API_URL}/api/education/add`, {
            method: "POST",
            headers:
                {
                    "Content-Type": "application/json",
                    "Authorization" : `Bearer ${JSON.parse(localStorage.getItem("token")).token}`,
                },
            body:JSON.stringify({
                institution_name: institute,
                duration: education_duration,
                location: location,
                degree_type: degree,
                user_id: id
            })
        })
        const data = await res.json()
        setEducation([...education ,{
            id: data.Data.id,
            institution_name: institute,
            duration: education_duration,
            location: location,
            degree_type : degree,
            user_id: id
        }])

        handleClose()
        setInstitute('')
        setDegree('')
        setLocation('')

    }


    const deleteEducation = async (e,id) => {
        e.preventDefault()
        const res = await fetch(`${API_URL}/api/education/delete/${id}` , {
            method: "DELETE",
            headers:
                {
                    "Content-Type": "application/json",
                    "Authorization" : `Bearer ${JSON.parse(localStorage.getItem("token")).token}`,
                }
        })
        const data = await res.json();
        setEducation(education.filter((edu => edu.id !== id)))
        

    
    }


    const handleUpdateEducation = async(e,id) => {
        e.preventDefault()
        const res = await fetch(`${API_URL}/api/education/update` , {
            method: "PATCH" ,
            headers:
                {
                    "Content-Type": "application/json",
                    "Authorization" : `Bearer ${JSON.parse(localStorage.getItem("token")).token}`,
                },
            body: JSON.stringify({
                id: id,
                institution_name: institute,
                duration: education_duration,
                location: location,
                degree_type : degree,
                user_id: user_state.id
            })
            
        })

        const data = await res.json()
        const index = education.findIndex((edu) => edu.id  === id)
        var updated_education = [...education]
        updated_education[index] = {
            id: id,
            institution_name: institute,
            duration: education_duration,
            location: location,
            degree_type : degree,
            user_id: user_state.id
        }
        setEducation(updated_education)
        handleClose1()
    }



    return (
        <>
        <div className='education_container'>
        <h1 style={{marginLeft: "20px"}}>Education <span onClick={handleClickOpen}><AddIcon style={{marginLeft: "690px"}}/></span></h1> 
        
            {education.map((edu) => (
                <>
                <div className='education_content'>
                <h4 style={{marginLeft: "40px", marginTop: "30px"}}>{edu.institution_name}</h4>
                <h4 style={{marginLeft: "40px", marginTop: "30px"}}>{edu.duration}</h4>
                <h4 style={{marginLeft: "40px", marginTop: "30px"}}>{edu.location}</h4>
                <h4 style={{marginLeft: "40px", marginTop: "30px"}}>{edu.degree_type}</h4>
                <span onClick={(e) => handleClickOpen1(e,edu.id)}><EditIcon style={{marginLeft: "800px"}}/></span>&nbsp;<span onClick={(e) => deleteEducation(e,edu.id)}><DeleteIcon/></span>
                </div>
                </>  
            ))}


        </div>
        <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Education</DialogTitle>
        <DialogContent>
          <DialogContentText>
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="institute"
            value={institute}
            onChange={(e) => setInstitute(e.target.value)}
            label="Institution Name"
            type="text"
            fullWidth
            variant="standard"
            required
          />&nbsp;
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateRangePicker
                startText="From"
                endText="To"
                value={value}
                onChange={(newValue) => {
                setValue(newValue);
                }}
                renderInput={(startProps, endProps) => (
                <React.Fragment>
                    <TextField {...startProps} />
                    <Box sx={{ mx: 2 }}> to </Box>
                    <TextField {...endProps} />
                </React.Fragment>
                )}
            />
            </LocalizationProvider>
          <TextField
            autoFocus
            margin="dense"
            id="location"
            label="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            type="text"
            fullWidth
            variant="standard"
            required
          />
          <TextField
            autoFocus
            margin="dense"
            id="degree"
            value={degree}
            onChange={(e) => setDegree(e.target.value)}
            label="Degree"
            type="text"
            fullWidth
            variant="standard"
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={(e) => handleAddEducation(e,user_state.id)}>Add</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={open1} onClose={handleClose1}>
        <DialogTitle>Update Education</DialogTitle>
        <DialogContent>
          <DialogContentText>
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="institute"
            value={institute}
            onChange={(e) => setInstitute(e.target.value)}
            label="Institution Name"
            type="text"
            fullWidth
            variant="standard"
            required
          />&nbsp;
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateRangePicker
                startText="From"
                endText="To"
                value={value}
                onChange={(newValue) => {
                setValue(newValue);
                }}
                renderInput={(startProps, endProps) => (
                <React.Fragment>
                    <TextField {...startProps} />
                    <Box sx={{ mx: 2 }}> to </Box>
                    <TextField {...endProps} />
                </React.Fragment>
                )}
            />
            </LocalizationProvider>
          <TextField
            autoFocus
            margin="dense"
            id="location"
            label="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            type="text"
            fullWidth
            variant="standard"
            required
          />
          <TextField
            autoFocus
            margin="dense"
            id="degree"
            value={degree}
            onChange={(e) => setDegree(e.target.value)}
            label="Degree"
            type="text"
            fullWidth
            variant="standard"
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose1}>Cancel</Button>
          <Button onClick={(e) => handleUpdateEducation(e,edu_id)}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
        </>
    )
}

export default Education
