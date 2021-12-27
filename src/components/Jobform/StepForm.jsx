import React from 'react'
import { useState , useEffect } from 'react';
import { Link } from 'react-router-dom';
import {API_URL} from '../../config/env'
import { FormControl } from '@mui/material';
import {
  Typography,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";

import {
  useForm,
  Controller,
  FormProvider,
  useFormContext,
} from "react-hook-form";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/UserContext/UserSlice';



function getSteps() {
  return [
    "Basic information",
    "Workplacetype & Information",
    "Job Description",
  ];
}







const BasicForm = () => {
  const { control } = useFormContext();
  return (
    <>
      <Controller
        control={control}
        name="job_title"
        render={({ field }) => (
          <TextField
            id="job_title"
            label="Job Title"
            variant="outlined"
            placeholder="Enter Job Title"
            fullWidth
            margin="normal"
            {...field}
            required
          />
        )}
      />

      <Controller
        control={control}
        name="company"
        render={({ field }) => (
          <TextField
            id="company"
            label="company"
            variant="outlined"
            placeholder="Enter Company"
            fullWidth
            margin="normal"
            {...field}
            required
          />
        )}
      />
    </>
  );
};

const ContactForm = () => {
  const [employment_type , setEmployment] = useState('');
  const [open, setOpen] = useState(false);

        const handleChange = (event) => {
          setEmployment(event.target.value);
        };

        const handleClose = () => {
          setOpen(false);
        };

        const handleOpen = () => {
          setOpen(true);
        };


  const { control } = useFormContext();
  return (
    <>
      <Controller
        control={control}
        name="workplace"
        render={({ field }) => (
          <TextField
            id="workplace"
            label="Workplace"
            variant="outlined"
            placeholder="Enter Workplace Type"
            type="text"
            fullWidth
            margin="normal"
            {...field}
            required
          />
        )}
      />

      <Controller
        control={control}
        name="job_location"
        render={({ field }) => (
          <TextField
            id="job_location"
            label="Job Location"
            variant="outlined"
            placeholder="Enter Job Location"
            fullWidth
            type="text"
            margin="normal"
            {...field}
            required
          />
        )}
      />
      
      <Controller
        control={control}
        name="employment_type"
        render={({ field }) => (
          <>
        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Employment Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          open={open}
          fullWidth
          style={{marginBottom: "15px" , marginTop: "2px"}}
          onClose={handleClose}
          onOpen={handleOpen}
          label="Enter Employment Type"
          value={employment_type}
          onChange={handleChange}
          {...field}
        >
          <MenuItem value="">
            <em>Select</em>
          </MenuItem>
          <MenuItem value={'FullTime'}>Full Time</MenuItem>
          <MenuItem value={'Internship'}>Internship</MenuItem>
          <MenuItem value={'PartTime'}>PartTime</MenuItem>
          <MenuItem value={'Contract'}>Contract</MenuItem>
          <MenuItem value={'Temporary'}>Temporary</MenuItem>
          <MenuItem value={'Volunteer'}>Volunteer</MenuItem>
        </Select>
        </FormControl>
        </>
        )}
      />
    </>
  );
};
const PersonalForm = () => {
  const { control } = useFormContext();
  return (
    <>
      <Controller
        control={control}
        name="job_description"
        render={({ field }) => (
          <TextField
            id="job_description"
            label="Job Description"
            variant="outlined"
            placeholder="Enter JobDescription"
            fullWidth
            margin="normal"
            {...field}
            required
          />
        )}
      />
      
    </>
  );
};


function getStepContent(step) {
  switch (step) {
    case 0:
      return <BasicForm />;

    case 1:
      return <ContactForm />;
    case 2:
      return <PersonalForm />;
    default:
      return "unknown step";
  }
}



const StepForm = () => {
  
  
  
  const methods = useForm({
    defaultValues: {
      job_title : "",
      company: "",
      workplace: "",
      job_location: "",
      employment_type: "",
      job_description: "",
    },
  });


  const [activeStep, setActiveStep] = useState(0);
  const [skippedSteps, setSkippedSteps] = useState([]);
  const user_state = useSelector(selectUser)
  const steps = getSteps();

  const isStepOptional = (step) => {
    return step === 1 || step === 2;
  };

  const isStepSkipped = (step) => {
    return skippedSteps.includes(step);
  };

  const handleNext = async (data) => {
    
    if (activeStep === steps.length - 1) {
      console.log(data.job_title , data.employment_type,data.company,data.job_description)
      setActiveStep(activeStep + 1);
     const res = await fetch(`${API_URL}/api/job/addjob` , {
       method: "POST" , 
       headers: {
         "Content-Type": "application/json",
         "Authorization" : `Bearer ${JSON.parse(localStorage.getItem("token")).token}`
       },
       body: JSON.stringify({
         "job_title" : data.job_title,
         "employment_type": data.employment_type,
         "company": data.company,
         "job_description": data.job_description,
         "job_location": data.job_location,
         "workplace": data.workplace,
         "user_id" : user_state.id
       })
     })
     
     const data_final = await res.json()
     console.log(data_final)
    } else {
      setActiveStep(activeStep + 1);
      setSkippedSteps(
        skippedSteps.filter((skipItem) => skipItem !== activeStep)
      );
    }
  };

  const handleBack = (e) => {
    e.preventDefault()
    setActiveStep(activeStep - 1);
  };

  const handleSkip = (e) => {
    e.preventDefault()
    if (!isStepSkipped(activeStep)) {
      setSkippedSteps([...skippedSteps, activeStep]);
    }
    setActiveStep(activeStep + 1);
  };



  return (
    <div style={{display:"flex" , alignItems: "center" , justifyContent:"center" , flexDirection:"column",marginTop: "5rem"}}>
      <Stepper alternativeLabel activeStep={activeStep}>
        {steps.map((step, index) => {
          const labelProps = {};
          const stepProps = {};
        
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step {...stepProps} key={index}>
              <StepLabel {...labelProps}>{step}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      {activeStep === steps.length ? (
        <>
        <Typography variant="h3" align="center">
          Thank You
        </Typography>
        <Link to="/" >
        <Typography variant="h6" align="center">
          Back to Home
        </Typography>
        </Link>
        </>
      ) : (
        <>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(handleNext)}>
            <div>
              {getStepContent(activeStep)}
              
              <Button
                style={{marginRight: "1rem"}}
                disabled={activeStep === 0}
                onClick={handleBack}
              >
                back
              </Button>
              {isStepOptional(activeStep) && (
                <Button
                  style={{marginRight: "1rem"}}
                  variant="contained"
                  color="primary"
                  onClick={handleSkip}
                >
                  skip
                </Button>
              )}
              <Button
                style={{marginRight: "1rem"}}
                variant="contained"
                color="primary"
                // onClick={handleNext}
                type="submit"
              >
                
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
              </div>
            </form>
          </FormProvider>
        </>
      )}
    </div>
  )
}

export default StepForm
