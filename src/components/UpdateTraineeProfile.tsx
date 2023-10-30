import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Container,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  RadioGroup,
  Radio,
  Button,
} from '@mui/material';
import '../component-styles/UpdateTraineeProfile.css';

interface TrainerProfile {
  userName: string;
  firstName: string;
  lastName: string;
  specialization: string;
}

const UpdateTraineeProfile: React.FC = () => {
  const location = useLocation();
  const traineeData = location.state?.traineeData;

  if (!traineeData) {
    return <div>Loading...</div>;
  }

  const [formData, setFormData] = useState({
    userName: traineeData.userName,
    firstName: traineeData.firstName,
    lastName: traineeData.lastName,
    dob: traineeData.dob,
    address: traineeData.address,
    isActive: traineeData.isActive ? 'Yes' : 'No',
    trainers: [] as (string | TrainerProfile)[],
  });

  const [availableTrainers, setAvailableTrainers] = useState<TrainerProfile[]>([]);
  const [fetchTrainers, setFetchTrainers] = useState(true);

  const [warningMessage, setWarningMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [successVisible, setSuccessVisible] = useState(false);
  const [failureVisible, setFailureVisible] = useState(false);

  useEffect(() => {
    if (fetchTrainers && formData.userName) {
      fetch(`http://localhost:4001/main/trainer/notAssignedTrainees?userName=${formData.userName}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data: TrainerProfile[]) => {
          setAvailableTrainers(data);
          setFetchTrainers(false);
          console.log('Fetched not assigned trainers successfully');
        })
        .catch((error) => {
          console.error('Error fetching trainers:', error);
          setWarningMessage('There is an error in fetching trainers.');
        });
    } else {
      setWarningMessage('Update failed.');
    }
  }, [formData.userName, fetchTrainers]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === 'userName') {
      setFetchTrainers(true);
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;

    let updatedTrainers: (string | TrainerProfile)[] = formData.trainers;

    if (checked) {
      if (!updatedTrainers.includes(name)) {
        updatedTrainers = [...updatedTrainers, name];
      }
    } else {
      updatedTrainers = updatedTrainers.filter((trainer) => {
        if (typeof trainer === 'string') {
          return trainer !== name;
        } else {
          return trainer.userName !== name;
        }
      });
    }

    setFormData({ ...formData, trainers: updatedTrainers });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const updateDataProfile = {
        userName: formData.userName,
        firstName: formData.firstName,
        lastName: formData.lastName,
        dob: formData.dob,
        address: formData.address,
        isActive: formData.isActive === 'Yes',
      };

      const firstApiResponse = await fetch('http://localhost:4001/main/trainee/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateDataProfile),
      });

      if (!firstApiResponse.ok) {
        throw new Error('Network response was not ok for the first API');
      }

      const firstApiData = await firstApiResponse.json();

      const updateDataTrainers = {
        userName: formData.userName,
        trainers: formData.trainers
          .filter((trainer) => typeof trainer === 'string')
          .map((trainer) => trainer as string),
      };

      const secondApiResponse = await fetch('http://localhost:4001/main/trainee/updateTrainers', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateDataTrainers),
      });

      if (!secondApiResponse.ok) {
        throw new Error('Network response was not ok for the second API');
      }

      // Trainers updated successfully
      const secondApiData = await secondApiResponse.json();

      console.log('Trainee profile updated successfully', firstApiData);
      console.log('Trainers updated successfully', secondApiData);

      setFormData({
        userName: firstApiData.userName,
        firstName: firstApiData.firstName,
        lastName: firstApiData.lastName,
        dob: firstApiData.dob,
        address: firstApiData.address,
        isActive: firstApiData.isActive ? 'Yes' : 'No',
        trainers: secondApiData,
      });

      console.log(formData);
      setSuccessMessage('Updated successfully');
      setWarningMessage('');

      setSuccessVisible(true);
      setTimeout(() => {
        setSuccessVisible(false);
      }, 3000);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);

      setSuccessMessage('');
      setWarningMessage('There is an error on the page. Please reload it.');

      setFailureVisible(true);
      setTimeout(() => {
        setFailureVisible(false);
      }, 3000);
    }
  };

  return (
    <Container className="update-trainee-box">
      <div className={`success-box ${successVisible ? 'show' : 'hide'}`}>{successMessage}</div>
      <div className={`failure-box ${failureVisible ? 'show' : 'hide'}`}>{warningMessage}</div>

      <Typography variant="h4" className="update-trainee">
        <p className="update-trainee-heading">Update Profile</p>
      </Typography>
      <form className="update-trainee-form" onSubmit={handleSubmit}>
        <div className="update-trainee-field">
          <TextField
            label="User Name"
            id="userName"
            name="userName"
            value={formData.userName}
            onChange={handleInputChange}
            fullWidth
            InputProps={{
              readOnly: true,
            }}
          />
        </div>
        <div className="update-trainee-field">
          <TextField
            label="First Name"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            fullWidth
          />
        </div>
        <div className="update-trainee-field">
          <TextField
            label="Last Name"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            fullWidth
          />
        </div>
        <div className="update-trainee-field">
          <TextField
            label="Date of Birth"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleInputChange}
            fullWidth
          />
        </div>
        <div className="update-trainee-field">
          <TextField
            label="Address"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            fullWidth
          />
        </div>
        <div className="update-trainee-field">
          <label>Is Active:</label>
          <RadioGroup
            id="isActive"
            name="isActive"
            value={formData.isActive}
            onChange={handleInputChange}
          >
            <FormControlLabel
              value="Yes"
              control={<Radio color="primary" />}
              label="Yes"
            />
            <FormControlLabel
              value="No"
              control={<Radio color="primary" />}
              label="No"
            />
          </RadioGroup>
        </div>
        <div className="update-trainee-field">
          <label className="update-trainee-list-heading">Trainers List:</label>
          <div>
            {availableTrainers.map((trainer) => (
              <FormControlLabel
                key={trainer.userName}
                control={
                  <Checkbox
                    name={trainer.userName}
                    checked={formData.trainers.includes(trainer.userName)}
                    onChange={handleCheckboxChange}
                    color="primary"
                  />
                }
                label={`${trainer.firstName} ${trainer.lastName} (${trainer.specialization})`}
              />
            ))}
          </div>
        </div>
        <div className="button-container">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="action-button"
            style={{ marginTop: '40px' }}
          >
            Save Changes
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default UpdateTraineeProfile;
