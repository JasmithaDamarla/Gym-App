import React, { useState } from 'react';
import '../component-styles/ChangePassword.css';


const ChangePassword: React.FC = () => {
  // Define state to manage form data
  const [formData, setFormData] = useState({
    userName: '',
    oldPassword: '',
    newPassword: '',
    newPasswordConfirmation: '',
  });

  // Define a state for handling form submission status
  const [submissionStatus, setSubmissionStatus] = useState({
    success: false,
    error: '',
  });

  // Event handler to capture user input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Function to handle form submission
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
        }
        else{
          setSubmissionStatus({ success: true, error: '' });
          console.log("Updated successfully");
        }
      })
      .catch((error) => {
        setSubmissionStatus(error);
      });
  };

  return (
    <div className="change-password-box">
      <h1 className="change-password-heading">Change Password</h1>
      <form className="change-password-form" onSubmit={handleSubmit}>
        <div className="change-password-field">
          <label htmlFor="changepassword-username">Username:</label>
          <input
            type="text"
            id="changepassword-username"
            name="userName"
            required
            className="changepassword-input"
            value={formData.userName}
            onChange={handleInputChange}
          />
        </div>
        <div className="change-password-field">
          <label htmlFor="changepassword-oldPassword">Old Password:</label>
          <input
            type="password"
            id="changepassword-oldPassword"
            name="oldPassword"
            required
            className="changepassword-input"
            value={formData.oldPassword}
            onChange={handleInputChange}
          />
        </div>
        <div className="change-password-field">
          <label htmlFor="changepassword-newPassword">New Password:</label>
          <input
            type="password"
            id="changepassword-newPassword"
            name="newPassword"
            required
            className="changepassword-input"
            value={formData.newPassword}
            onChange={handleInputChange}
          />
        </div>
        <div className="change-password-field">
          <label htmlFor="changepassword-newPasswordConfirmation">New Password Confirmation:</label>
          <input
            type="password"
            id="changepassword-newPasswordConfirmation"
            name="newPasswordConfirmation"
            required
            className="changepassword-input"
            value={formData.newPasswordConfirmation}
            onChange={handleInputChange}
          />
        </div>
        <div className="button-container">
          <button className="changepassword-button" type="submit">
            Change Password
          </button>
        </div>
      </form>
      {submissionStatus.success && (
        <div className="submission-success">Password updated successfully</div>
      )}
      {submissionStatus.error && <div className="submission-error">{submissionStatus.error}</div>}
    </div>
  );
};

export default ChangePassword;
