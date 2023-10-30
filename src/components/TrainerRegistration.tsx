import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from '@mui/material';
// import '../component-styles/TrainerRegistration.css';

const TrainerRegistration: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    specialization: 'ZUMBA',
  });

  const initialFormData = {
    firstName: '',
    lastName: '',
    email: '',
    specialization: 'ZUMBA',
  };

  const [showResponse, setShowResponse] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [response, setResponse] = useState({
    userName: '',
    password: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    const allFieldsFilled = Object.values(formData).every((value) => value.trim() !== '');
    setIsSubmitDisabled(!allFieldsFilled);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trainerData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      specialization: formData.specialization,
    };
    setIsSubmitDisabled(true);

    fetch('http://localhost:4001/main/trainer/trainerRegistration', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(trainerData),
    })
      .then((response) => {
        if (response.status === 201) {
          return response.json();
        } else if (response.status === 400) {
          return response.json().then((errorData) => {
            console.log(errorData);
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
        console.error('Error:', error.message);
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
    <Container maxWidth="lg">
      <Paper elevation={20} style={{ padding: '20px', margin: '20px auto'}}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6}>
            <div className="login-image-container">
              <img
                src="src\images\gym-register.PNG"
                alt="Login Image"
                className="login-image"
              />
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h4" align="center" gutterBottom style={{ fontWeight: 'bold', fontFamily: 'Times New Roman' }}>
              Trainer Registration
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
                inputProps={{ style: { backgroundColor: 'whitesmoke',color:'black' } }}
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
                inputProps={{ style: { backgroundColor: 'whitesmoke',color:'black' } }}
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
                inputProps={{ style: { backgroundColor: 'whitesmoke',color:'black' } }}
                InputLabelProps={{ style: { color: 'black' } }}
              />
              <FormControl variant="outlined" fullWidth margin="normal">
                <InputLabel id="specialization-label">Specialization *</InputLabel>
                <Select
                  labelId="specialization-label"
                  label="Specialization *"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleInputChange as any}
                  required
                >
                  <MenuItem value="">Select Specialization</MenuItem>
                  <MenuItem value="ZUMBA">ZUMBA</MenuItem>
                  <MenuItem value="FITNESS">FITNESS</MenuItem>
                  <MenuItem value="YOGA">YOGA</MenuItem>
                  <MenuItem value="STRETCHING">STRETCHING</MenuItem>
                  <MenuItem value="RESISTANCE">RESISTANCE</MenuItem>
                </Select>
              </FormControl>
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
              <Button type="submit" variant="contained" style={{marginLeft:'20px', marginTop:'20px'}} color="primary" disabled={isSubmitDisabled} className='register-button'>
                Register
              </Button>
              <Link to="/trainerRegistration" onClick={handleReset}>
                <Button variant="contained" className='reset-button' style={{marginLeft:'20px', marginTop:'20px'}}>
                  Reset
                </Button>
              </Link>
            </form>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default TrainerRegistration;
