import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  InputLabel,
  TextareaAutosize,
  Grid
} from '@mui/material';

const TraineeRegistrationForm: React.FC = () => {
  const initialFormData = {
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: '',
    address: '',
  };

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: '',
    address: '',
  });

  const [showResponse, setShowResponse] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [response, setResponse] = useState({
    userName: '',
    password: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    const allFieldsFilled = Object.values(formData).every((value) => value.trim() !== '');
    setIsSubmitDisabled(!allFieldsFilled);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const traineeData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      dob: formData.dateOfBirth,
      address: formData.address,
    };
    setIsSubmitDisabled(true);

    fetch('http://localhost:4001/main/trainee/traineeRegistration', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(traineeData),
    })
      .then((response) => {
        if (response.status === 201) {
          return response.json();
        } else if (response.status === 400) {
          return response.json().then((errorData) => {
            throw new Error(errorData.message);
          });
        } else {
          throw new Error('Network response was not ok');
        }
      })
      .then((data) => {
        setResponse(data);
        setShowResponse(true);
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setShowResponse(false);
    setResponse({
      userName: '',
      password: '',
    });
    setIsSubmitDisabled(true);
  };

  return (
    <Container maxWidth="lg"> {/* Increase the maxWidth */}
      <Paper elevation={3} style={{ padding: '20px', margin: '20px auto' }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <img
              src="src\images\gym-register.PNG"
              alt="Registration Image"
              style={{ width: '100%', height: '95%' }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h4" align="center" gutterBottom style={{ fontWeight: 'bold', fontFamily: 'Times New Roman' }}>
              Trainee Registration
            </Typography>
            <form onSubmit={handleFormSubmit}>
              <TextField
                label="First Name"
                variant="outlined"
                fullWidth
                margin="normal"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange as any}
                required
                inputProps={{ style: { backgroundColor: 'whitesmoke', color: 'black' } }}
                InputLabelProps={{ style: { color: 'black' } }}
              />

              <TextField
                label="Last Name"
                variant="outlined"
                fullWidth
                margin="normal"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange as any}
                required
                inputProps={{ style: { backgroundColor: 'whitesmoke', color: 'black' } }}
                InputLabelProps={{ style: { color: 'black' } }}
              />

              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                name="email"
                value={formData.email}
                onChange={handleInputChange as any}
                required
                inputProps={{ style: { backgroundColor: 'whitesmoke', color: 'black' } }}
                InputLabelProps={{ style: { color: 'black' } }}
              />

              <div style={{ display: 'flex', alignItems: 'center' }}>
                <InputLabel style={{ flex: 0.25 }}>Date of Birth</InputLabel>
                <TextField
                  // label="DD-MM-YYYY"
                  variant="outlined"
                  margin="normal"
                  name="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange as any}
                  inputProps={{ style: { backgroundColor: 'GrayText', color: 'black' } }}
                  InputLabelProps={{ style: { color: 'black' } }}
                />
              </div>

              <TextareaAutosize
                minRows={3}
                maxRows={5}
                aria-label="Address"
                placeholder="Address"
                name="address"
                value={formData.address}
                onChange={handleInputChange as any}
                style={{ width: '95%', marginBottom: '16px', backgroundColor: '#F7F7F7', color: '#333' }}
              />

              {showResponse && (
                <div className="register-form-group">
                  <InputLabel>Username</InputLabel>
                  <TextField
                    fullWidth
                    variant="outlined"
                    name="userName"
                    value={response.userName}
                    InputProps={{ readOnly: true }}
                    inputProps={{ style: { backgroundColor: 'whitesmoke', color: 'black' } }}
                    InputLabelProps={{ style: { color: 'black' } }}
                  />
                </div>
              )}

              {showResponse && (
                <div className="register-form-group">
                  <InputLabel>Password</InputLabel>
                  <TextField
                    fullWidth
                    variant="outlined"
                    name="password"
                    value={response.password}
                    InputProps={{ readOnly: true }}
                    inputProps={{ style: { backgroundColor: 'whitesmoke', color: 'black' } }}
                    InputLabelProps={{ style: { color: 'black' } }}
                  />
                </div>
              )}

              <div className="register-form-group">
                <Button type="submit" variant="contained" color="primary" disabled={isSubmitDisabled}>
                  Register
                </Button>
                <Link to="/traineeRegistration" onClick={handleReset}>
                  <Button variant="contained" style={{marginLeft:'20px'}} onClick={handleReset}>Reset</Button>
                </Link>
              </div>
            </form>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default TraineeRegistrationForm;
