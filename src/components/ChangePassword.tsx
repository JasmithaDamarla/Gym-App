import React, { useState } from 'react';
import { 
  Button, 
  Container, 
  TextField, 
  Typography 
} from '@mui/material';
import '../component-styles/ChangePassword.css';
import { useAppSelector } from '../redux/Hooks';

const ChangePassword: React.FC = () => {
 
  // const location = useLocation();
  // const [userName,setUserName] = useState(location.state.userName);
  const userName = useAppSelector((state) => state.userData.userName);
  const initialFormData = {
    userName: userName,
    oldPassword: '',
    newPassword: '',
    newPasswordConfirmation: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [submissionStatus, setSubmissionStatus] = useState({
    success: false,
    error: '',
  });

  const showMessage = (type: 'success' | 'error', message: string) => {

    setSubmissionStatus((prevStatus) => ({
      ...prevStatus,
      [type]: message,
    }));
    setTimeout(() => {
      setSubmissionStatus((prevStatus) => ({
        ...prevStatus,
        [type]: '',
      }));
    }, 3000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetch('http://localhost:4001/main/user/updatePassword', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        } else {
          setSubmissionStatus({ success: true, error: '' });
          console.log('Updated successfully');
        }
      })
      .catch((error) => {
        setSubmissionStatus({ success: false, error: error.message });
      });
  };

  const handleReset = () => {
    setFormData(initialFormData);
  };

  return (
    <Container maxWidth="sm">
      <div className="change-password-box">
          {submissionStatus.success && (
            <div className={`success-box ${submissionStatus.success ? 'show' : 'hide'}`}>Password updated successfullyy</div>
          )}
          {submissionStatus.error && (
            <div className="failure-box">Failed to change Password</div>
          )}
        <Typography variant="h4" className="change-password-heading">
          Change Password
        </Typography>
        <form className="change-password-form" onSubmit={handleSubmit}>
          <TextField
            label="Username"
            type="text"
            name="userName"
            required
            className="changepassword-input"
            value={userName}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            inputProps={{ style: { backgroundColor: 'whitesmoke', color: 'black' } }}
            InputLabelProps={{ style: { color: 'black' } }}
          />
          <TextField
            label="Old Password"
            type="password"
            name="oldPassword"
            required
            className="changepassword-input"
            value={formData.oldPassword}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            inputProps={{ style: { backgroundColor: 'whitesmoke', color: 'black' } }}
            InputLabelProps={{ style: { color: 'black' } }}
          />
          <TextField
            label="New Password"
            type="password"
            name="newPassword"
            required
            className="changepassword-input"
            value={formData.newPassword}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            inputProps={{ style: { backgroundColor: 'whitesmoke', color: 'black' } }}
            InputLabelProps={{ style: { color: 'black' } }}
          />
          <TextField
            label="New Password Confirmation"
            type="password"
            name="newPasswordConfirmation"
            required
            className="changepassword-input"
            value={formData.newPasswordConfirmation}
            onChange={handleInputChange}
            fullWidth
            inputProps={{ style: { backgroundColor: 'whitesmoke', color: 'black' } }}
            InputLabelProps={{ style: { color: 'black' } }}
            margin="normal"
          />
          <div className="button-container">
            <Button type="submit" variant="contained" color="primary" onClick={() => showMessage('success', 'Password updated successfully')}>
              Change Password
            </Button>
            <Button type="button" onClick={handleReset} variant="contained" color="secondary">
              Reset
            </Button>
          </div>
        </form>
        {/* {submissionStatus.success && (
          <div className="submission-success">Password updated successfully</div>
        )}
        {submissionStatus.error && (
          <div className="submission-error">{submissionStatus.error}</div>
        )} */}
      </div>
    </Container>
  );
};

export default ChangePassword;
