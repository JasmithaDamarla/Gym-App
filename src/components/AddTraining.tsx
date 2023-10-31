import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
} from '@mui/material';
import { useAppSelector } from '../redux/Hooks';

const AddTraining = () => {
  const userName = useAppSelector((state) => state.userData.userName);
  
  const [formData, setFormData] = useState({
    traineeUserName: userName,//localStorage.getItem('userName'),
    trainerUserName: '',
    trainingName: '',
    trainingDate: '',
    traningDuration: 1,
  });

  const [availableTrainers, setAvailableTrainers] = useState<string[]>([]);
  const [selectedSpecialization, setSelectedSpecialization] = useState('ZUMBA');

  const [warningMessage, setWarningMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [successVisible, setSuccessVisible] = useState(false);
  const [failureVisible, setFailureVisible] = useState(false);

  useEffect(() => {
    // Fetch trainers based on the selected specialization
    fetchTrainersBySpecialization(selectedSpecialization);
  }, [selectedSpecialization]);

  const fetchTrainersBySpecialization = (specialization: string) => {
    fetch(`http://localhost:4001/main/trainer/getTrainersBySpecialization?specialization=${specialization}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setAvailableTrainers(data);
        
        console.log("trainers data fecthed successfully ",data);
      })
      .catch((error) => {
        console.error('Error fetching trainers:', error);
        
        setWarningMessage('There is an error in fetching trainers.');
        setSuccessMessage('');
        setFailureVisible(true);
        setTimeout(() => {
          setFailureVisible(false);
        }, 3000); 
      });
  };

  const handleInputChange = (e : React.ChangeEvent<HTMLInputElement> ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSpecializationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const specialization = e.target.value;
    setSelectedSpecialization(specialization);
  };

  const handleSubmit = (e:React.FormEvent) => {
    e.preventDefault();

    // Make the API request to add the training with the selected data
    fetch('http://localhost:4001/main/training/addTraining', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        } else {
          console.log('Training added successfully');

          setSuccessMessage('Added Training successfullyy..');
          setWarningMessage('');
          setSuccessVisible(true);
          setTimeout(() => {
            setSuccessVisible(false);
          }, 3000);

        }
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);

        setWarningMessage('There is an error in adding training.');
        setSuccessMessage('');
        setFailureVisible(true);
        setTimeout(() => {
          setFailureVisible(false);
        }, 3000); 
      });
  };

  return (
    
    <Paper style={{height:'380px'}}>
      <div className={`success-box ${successVisible ? 'show' : 'hide'}`}>{successMessage}</div>
      <div className={`failure-box ${failureVisible ? 'show' : 'hide'}`}>{warningMessage}</div>
    <Box className="add-training-box">
      
      <Typography variant="h4" className="add-training-heading">
        <p style={{color:'black',fontWeight:'bold',fontFamily:'Times New Roman',marginRight:'40px',marginLeft:'30px',paddingTop:'20px',marginTop:'40px'}}>Add Training</p>
      </Typography>
      <form className="add-training-form" onSubmit={handleSubmit}>
        <FormControl className="add-training-field">
        {/* <InputLabel htmlFor="add-training-date">Training-Date</InputLabel> */}
          <TextField
            type="date"
            id="add-training-date"
            name="trainingDate"
            value={formData.trainingDate}
            label='Training-Date'
            className='add-training-input-field'
            onChange={handleInputChange}
            style={{width:'300px',marginRight:'40px',marginLeft:'30px'}}
            required
            InputLabelProps={{
              shrink: true,
            }}
          />
        </FormControl>
        <FormControl className="add-training-field">
          {/* <InputLabel htmlFor="add-training-traineeUserName">User Name:</InputLabel> */}
          <TextField
            type="text"
            id="add-training-traineeUserName"
            // name="traineeUserName"
            label='Trainee UserName'
            // value={localStorage.getItem('userName')}
            value={userName}
            onChange={handleInputChange}
            required
            style={{width:'300px',marginRight:'40px'}}
            className='add-training-input-field'
            InputProps={{readOnly:true}}
            
          />
        </FormControl>
        <FormControl className="add-training-field">
          {/* <InputLabel htmlFor="add-training-name">Training Name:</InputLabel> */}
          <TextField
            type="text"
            id="add-training-name"
            name="trainingName"
            label='Training Name'
            className='add-training-input-field'
            value={formData.trainingName}
            onChange={handleInputChange}
            style={{width:'300px',marginRight:'40px'}}
            required
          />
        </FormControl>
        <br></br>
        <br></br>
        <FormControl className="add-training-field">
          <InputLabel htmlFor="add-training-type" style={{width:'300px',marginRight:'40px',marginLeft:'30px'}}>Training Type:</InputLabel>
          <Select
            id="add-training-type"
            name="trainingType"
            value={selectedSpecialization}
            onChange={handleSpecializationChange as any}
            className='add-training-input-field'
            style={{width:'300px',marginRight:'40px',marginLeft:'30px'}}
            required
            label='Training Type:'
          >
            <MenuItem value="ZUMBA">ZUMBA</MenuItem>
            <MenuItem value="FITNESS">FITNESS</MenuItem>
            <MenuItem value="YOGA">YOGA</MenuItem>
            <MenuItem value="STRETCHING">STRETCHING</MenuItem>
            <MenuItem value="RESISTANCE">RESISTANCE</MenuItem>
          </Select>
        </FormControl>
        <FormControl className="add-training-field">
          <InputLabel htmlFor="add-trainer-name">Trainer's Name:</InputLabel>
          <Select
            id="add-trainer-name"
            name="trainerUserName"
            value={formData.trainerUserName}
            onChange={handleInputChange as any}
            className='add-training-input-field'
            style={{width:'300px',marginRight:'40px'}}
            required
            label='Trainers Name:'
          >
            <MenuItem value="">Select a trainer</MenuItem>
            {availableTrainers.map((trainer) => (
              <MenuItem key={trainer} value={trainer} style={{width:'200px',color:'black'}}>
                {trainer}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className="add-training-field">
          {/* <InputLabel htmlFor="add-training-duration">Training Duration (in hours):</InputLabel> */}
          <TextField
            type="number"
            id="add-training-duration"
            name="traningDuration"
            label='Training Duration'
            value={formData.traningDuration}
            onChange={handleInputChange}
            required
            style={{width:'300px'}}
            className='add-training-input-field'
          />
        </FormControl>
        <div className="button-container">
          <Button variant="contained" color="primary" type="submit" className="add-training-button" style={{marginRight:'220px'}}>
            Add Training
          </Button>
        </div>
      </form>
    </Box>
    </Paper>
  );
};

export default AddTraining;
