import React from 'react'
import './Certification.css'
import AddIcon from '@mui/icons-material/Add'; 
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {useState , useEffect} from 'react'
import {API_URL} from '../../config/env'
import { useSelector } from 'react-redux';
import UserSlice, { selectUser } from '../redux/UserContext/UserSlice';
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
import IndividualCertificate from './IndividualCertificate';
import { useParams } from 'react-router-dom';


const Certification = () => {

  const {id} = useParams()

    const user_state = useSelector(selectUser)
    const[licenses, setLicenses] = useState([])
    const [value, setValue] = useState([null, null]);
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [license_name , setLicenseName] = useState('')
    const [pdf_link , setPdfLink] = useState('')
    const [license_id , setLicenseId] = useState(null)

    function convert(str) {
        var date = new Date(str),
          mnth = ("0" + (date.getMonth() + 1)).slice(-2),
          day = ("0" + date.getDate()).slice(-2);
        return [date.getFullYear(), mnth, day].join("-");
      }
    
    var license_duration = convert(value[0]) + " to " +convert(value[1]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        
        async function userExperience()
        {
            const res = await fetch(`${API_URL}/api/test/user/licenses/${user_state.id}` , 
            {
                method:'GET',
                headers:
                {
                    "Content-Type": "application/json",
                    "Authorization" : `Bearer ${JSON.parse(localStorage.getItem("token")).token}`,
                }
            })
            const data = await res.json();
            console.log(data)
            setLicenses(data.data)
          
        }
        userExperience();
    } , [])


    const handleAddLicense = async (e,id) => {
        e.preventDefault()

        const res = await fetch(`${API_URL}/api/test/create/license/${id}`, {
            method: "POST",
            headers:
                {
                    "Content-Type": "application/json",
                    "Authorization" : `Bearer ${JSON.parse(localStorage.getItem("token")).token}`,
                },
            body:JSON.stringify({
                license_name: license_name,
                duration: license_duration,
                pdf_link: pdf_link,
                user_id: user_state.id
            })
        })
        const data = await res.json()

        console.log(data);
        setLicenses([{
            id: data.data[0].id,
            license_name: license_name,
            duration: license_duration,
            pdf_link: pdf_link,
            user_id: user_state.id
        }, ...licenses])

        handleClose()
        setLicenseName('')
        setPdfLink('')
    }

    return (
        <div> 

        <div className='certification_container'>
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingTop: "1rem",
            }}>

        <span style={{ fontSize: "1.5rem", fontWeight: "500" }}>Certificate 📜</span> 
        {user_state.id*1 !== id*1 ? <></> :
        <span style={{cursor: "pointer"}}onClick={handleClickOpen}><AddIcon /></span> }
            </div >
        {licenses.length === 0 ? <div>
          <span style={{fontSize: "1rem"}}>Please add your certificate deatils to your profile.. 📎</span>
        </div> :licenses.map((lic) => (
          <IndividualCertificate key={lic.id} lic={lic} licenses={licenses} setLicenses={setLicenses} />
          ))}
        </div>
        <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add License Or Certification</DialogTitle>
        <DialogContent>
          <DialogContentText>
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="license_name"
            value={license_name}
            onChange={(e) => setLicenseName(e.target.value)}
            label="License Name"
            type="text"
            fullWidth
            variant="outlined"
            required
            />
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
            id="pdf_link"
            label="PDF Link"
            value={pdf_link}
            onChange={(e) => setPdfLink(e.target.value)}
            type="text"
            fullWidth
            variant="outlined"
            required
            />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={(e) => handleAddLicense(e,user_state.id)}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
      
     
      
      )
    }
    
    export default Certification