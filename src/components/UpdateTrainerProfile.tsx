import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Container,
  Typography,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
} from '@mui/material';
import '../component-styles/UpdateTrainerProfile.css';

const UpdateTrainerProfile: React.FC = () => {
  const location = useLocation();
  const trainerData = location.state?.trainerData;
  if (!trainerData) {
    console.log(trainerData);
    return <div>Loading...</div>;
  }
  console.log(trainerData);

  const [formData, setFormData] = useState({
    userName: trainerData.username,
    firstName: trainerData.firstName,
    lastName: trainerData.lastName,
    isActive: trainerData.isActive ? 'Yes' : 'No',
  });

  const [warningMessage, setWarningMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [successVisible, setSuccessVisible] = useState(false);
  const [failureVisible, setFailureVisible] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData({ ...formData, isActive: value });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updateData = {
      userName: formData.userName,
      firstName: formData.firstName,
      lastName: formData.lastName,
      isActive: formData.isActive === 'Yes',
    };
    fetch('http://localhost:4001/main/trainer/updateTrainerProfile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log('Trainer profile updated successfully', data);
        setFormData(data);
        setSuccessMessage('Updated successfullyy..');
        setWarningMessage('');

        setSuccessVisible(true);
        setTimeout(() => {
          setSuccessVisible(false);
        }, 3000);

      //   fetch('http://localhost:4001/main/trainee/profile?userName=' + localStorage.getItem('userName'))
      // .then((response) => {
      //   if (!response.ok) {
      //     throw new Error('Error fetching data');
      //   }
      //   return response.json();
      // })
      // .catch((error) => {
      //   console.error('Error fetching trainer data:', error);
      //   // localStorage.setItem('login','0');
      //   window.location.href = '/notFound';
      // });


      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);

        setSuccessMessage('');
        setWarningMessage('There is an error in page. reload it');

        setFailureVisible(true);
        setTimeout(() => {
          setFailureVisible(false);
        }, 3000);
      });
  };

  return (
    <Container className="update-trainer-box">

      <div className={`success-box ${successVisible ? 'show' : 'hide'}`}>{successMessage}</div>
      <div className={`failure-box ${failureVisible ? 'show' : 'hide'}`}>{warningMessage}</div>

      <Typography variant="h4" className="update-trainer">
        <p className="update-trainer-heading">Update Profile</p>
      </Typography>
      <form onSubmit={handleFormSubmit} className="update-trainer-form">
        <div className="update-trainer-field">
          <label htmlFor="firstName">First Name:</label>
          <TextField
            type="text"
            id="firstName"
            name="firstName"
            className="update-trainer-input"
            value={formData.firstName}
            onChange={handleInputChange}
          />
        </div>
        <div className="update-trainer-field">
          <label htmlFor="lastName">Last Name:</label>
          <TextField
            type="text"
            id="lastName"
            name="lastName"
            className="update-trainer-input"
            value={formData.lastName}
            onChange={handleInputChange}
          />
        </div>
        <div className="update-trainer-field">
          <label htmlFor="userName">User Name:</label>
          <TextField
            type="text"
            id="userName"
            name="userName"
            className="update-trainer-input"
            value={formData.userName}
            InputProps={{
              readOnly: true,
            }}
            
          />
        </div>
        <div className="update-trainer-field">
          <label>Is Active:</label>
          <RadioGroup
            name="isActive"
            value={formData.isActive}
            onChange={handleRadioChange}
          >
            <FormControlLabel
              value="Yes"
              control={<Radio />}
              label="Yes"
            />
            <FormControlLabel
              value="No"
              control={<Radio />}
              label="No"
            />
          </RadioGroup>
        </div>
        <div className="button-container">
          <Button type="submit" variant="contained" color="primary" className="action-button">
            Save Changes
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default UpdateTrainerProfile;
