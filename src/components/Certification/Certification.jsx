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


const Certification = () => {

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
    
    var license_duration_start = convert(value[0])
    var license_duration_end = convert(value[1])


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpen1 = (e,id) => {
        setOpen1(true);
        setLicenseId(id)
    };

    const handleClose1 = () => {
        setOpen1(false);
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
                received_date: license_duration_start,
                expiration_date: license_duration_end,
                pdf_link: pdf_link,
                user_id: user_state.id
            })
        })
        const data = await res.json()
        setLicenses([...licenses ,{
            id: data.data[0].id,
            license_name: license_name,
            received_date: license_duration_start,
            expiration_date: license_duration_end,
            pdf_link: pdf_link,
            user_id: user_state.id
        }])

        handleClose()
        setLicenseName('')
        setPdfLink('')
    }


    const deleteCertification= async (e,id) => {
        e.preventDefault()
        const res = await fetch(`${API_URL}/api/test/user/delete/license/${id}` , {
            method: "DELETE",
            headers:
                {
                    "Content-Type": "application/json",
                    "Authorization" : `Bearer ${JSON.parse(localStorage.getItem("token")).token}`,
                }
        })
        const data = await res.json();
        console.log(data)
        setLicenses(licenses.filter((lic => lic.id !== id)))
        

    
    }


    const handleUpdateCertification = async(e,id) => {
        e.preventDefault()
        const res = await fetch(`${API_URL}/api/test/user/license/update` , {
            method: "PUT" ,
            headers:
                {
                    "Content-Type": "application/json",
                    "Authorization" : `Bearer ${JSON.parse(localStorage.getItem("token")).token}`,
                },
            body: JSON.stringify({
                id: id,
                license_name: license_name,
                received_date: license_duration_start,
                expiration_date: license_duration_end,
                pdf_link: pdf_link,
                user_id: user_state.id
            })
            
        })

        const data = await res.json()
        const index = licenses.findIndex((exp) => exp.id  === id)
        var updated_experience = [...licenses]
        updated_experience[index] = {
            id: id,
            license_name: license_name,
            received_date: license_duration_start,
            expiration_date: license_duration_end,
            pdf_link: pdf_link,
            user_id: user_state.id
            
        }
        setLicenses(updated_experience)
        handleClose1()
    }





    return (
        <>
        <div className='certification_container'>
        <h1 style={{marginLeft: "20px"}}>Certificate <span onClick={handleClickOpen}><AddIcon style={{marginRight:"auto", marginLeft: "680px"}}/></span></h1> 
        {licenses.map((lic) => (
                <>
                <div className='certification_content' key={lic.id}>
                <h4 style={{marginLeft: "40px", marginTop: "30px"}}>{lic.license_name}</h4>
                <h4 style={{marginLeft: "40px", marginTop: "30px"}}>{lic.received_date}</h4>
                <h4 style={{marginLeft: "40px", marginTop: "30px"}}>{lic.expiration_date}</h4>
                <h4 style={{marginLeft: "40px", marginTop: "30px"}}>{lic.pdf_link}</h4>
                <span onClick={(e) => handleClickOpen1(e,lic.id)}><EditIcon style={{marginLeft: "800px"}}/></span>&nbsp;<span onClick={(e) => deleteCertification(e,lic.id)} ><DeleteIcon/></span>
                </div>
                </>  
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
            id="pdf_link"
            label="PDF Link"
            value={pdf_link}
            onChange={(e) => setPdfLink(e.target.value)}
            type="text"
            fullWidth
            variant="standard"
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={(e) => handleAddLicense(e,user_state.id)}>Add</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={open1} onClose={handleClose1}>
        <DialogTitle>Update License</DialogTitle>
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
            id="pdf_link"
            label="PDF Link"
            value={pdf_link}
            onChange={(e) => setPdfLink(e.target.value)}
            type="text"
            fullWidth
            variant="standard"
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose1}>Cancel</Button>
          <Button onClick={(e) => handleUpdateCertification(e,license_id)}>Update</Button>
        </DialogActions>
      </Dialog>
        </>

    )
}

export default Certification