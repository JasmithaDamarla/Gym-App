import React, { useState } from 'react';
import '../component-styles/Registration.css';
import { Link } from 'react-router-dom';

const TrainerRegistration: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email:'',
    specialization: 'ZUMBA',
  });

  const initialFormData = {
    firstName: '',
    lastName: '',
    email:'',
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
    const allFieldsFilled = Object.values(formData).map((value) => value.trim() !== '');
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
    <div className="center-box">
      <div className="registration-container">
        <h1 className='trainerRegistration-heading'>Trainer Registration</h1>
        <form onSubmit={handleFormSubmit} className="registration-form">
          <div className="register-form-group">
            <label htmlFor="firstName">First Name *</label>
            <input
              type="text"
              id="firstName"
              name="firstName" className='register-input'
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="Enter First Name"
              required
            />
          </div>

          <div className="register-form-group">
            <label htmlFor="lastName">Last Name *</label>
            <input
              type="text"
              id="lastName"
              name="lastName" className='register-input'
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Enter Last Name"
              required
            />
          </div>

          <div className="register-form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="text"
              id="email"
              name="email" className='register-input'
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your Email"
              required
            />
          </div>

          <div className="register-form-group">
            <label htmlFor="specialization">Specialization *</label>
            <select
              id="specialization"
              name="specialization"
              value={formData.specialization}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Specialization</option>
              <option value="ZUMBA">ZUMBA</option>
              <option value="FITNESS">FITNESS</option>
              <option value="YOGA">YOGA</option>
              <option value="STRETCHING">STRETCHING</option>
              <option value="RESISTANCE">RESISTANCE</option>
            </select>
          </div>

          <div className="register-form-group">
            <button type="submit" className='register-button' disabled={isSubmitDisabled}>Register</button>
            <Link to='/trainerRegistration' onClick={handleReset}><button type="submit" className='reset-button'>Reset</button></Link>
          </div>
        </form>

        {showResponse && (
          <div className="register-response">
            <h3>User Details</h3>
            <p>
              <strong>Username:</strong> {response.userName}
            </p>
            <p>
              <strong>Password:</strong> {response.password}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrainerRegistration;
