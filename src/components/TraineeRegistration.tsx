import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../component-styles/Registration.css';

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

    const allFieldsFilled = Object.values(formData).map((value) => value.trim() !== '');
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
    console.log("UserName : " + localStorage.getItem('userName'));
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
    <div className="center-box">
      <div className="registration-container">
        <h1 className="traineeRegistration-heading">Trainee Registration</h1>
        <form onSubmit={handleFormSubmit} className="registration-form">
          <div className="register-form-group">
            <label htmlFor="firstName">First Name *</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              className='register-input'
              value={formData.firstName}
              onChange={handleInputChange}
              required
              placeholder="Enter First Name"
            />
          </div>

          <div className="register-form-group">
            <label htmlFor="lastName">Last Name *</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              className='register-input'
              value={formData.lastName}
              onChange={handleInputChange}
              required
              placeholder="Enter Last Name"
            />
          </div>

          <div className="register-form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              className='register-input'
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="Enter your Email"
            />
          </div>

          <div className="register-form-group">
            <label htmlFor="dateOfBirth">Date of Birth</label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              className='register-input'
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              placeholder="Select Date of Birth"
            />
          </div>

          <div className="register-form-group">
            <label htmlFor="address">Address</label>
            <textarea
              id="address"
              name="address"
              className='register-input'
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Enter Address"
            ></textarea>
          </div>

          {showResponse && (
            <div className="register-form-group">
              <label htmlFor="userName">Username</label>
              <input
                type="text"
                id="userName"
                name="userName"
                className="register-input"
                value={response.userName}
                readOnly
              />
            </div>
          )}

          {showResponse && (
            <div className="register-form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="register-input"
                value={response.password}
                readOnly
              />
            </div>
          )}

          <div className="register-form-group">
            <button type="submit" className='register-button' disabled={isSubmitDisabled}>Register</button>
            <Link to='/traineeRegistration' onClick={handleReset}><button type="submit" className='reset-button'>Reset</button></Link>
          </div>
        </form>

        {/* {showResponse && (
          <div className="register-response">
            <h3>User Details</h3>
            <p>
              <strong>Username:</strong> {response.userName}
            </p>
            <p>
              <strong>Password:</strong> {response.password}
            </p>
          </div>
        )} */}
      </div>
    </div>
);
};

export default TraineeRegistrationForm;


// import React, { useState } from 'react';

// const TraineeRegistrationForm: React.FC = () => {
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '', // Add email to match TraineeRegistrationDTO
//     dateOfBirth: '',
//     address: '',
//   });

//   const [showResponse, setShowResponse] = useState(false);

//   const [response, setResponse] = useState({
//     userName: '', // Change "username" to "userName" to match DetailsDTO
//     password: '',
//   });

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleFormSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     const traineeData = {
//       firstName: formData.firstName,
//       lastName: formData.lastName,
//       email: formData.email,
//       dob: formData.dateOfBirth,
//       address: formData.address,
//     };

//     fetch('http://localhost:4001/main/trainee/traineeRegistration', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(traineeData),
//     })
//       .then((response) => {
//         if (response.status === 201) {
//           return response.json();
//         } else if (response.status === 400) {
//           return response.json().then((errorData) => {
//             throw new Error(errorData.message); 
//           });
//         } else {
//           throw new Error('Network response was not ok');
//         }
//       })
//       .then((data) => {
//         setResponse(data);
//         setShowResponse(true);
//       })
//       .catch((error) => {
//         console.error('There was a problem with the fetch operation:', error);
//       });
//   };

//   return (
//     <div className="center-box">
//       <div className="registration-container">
//         <h1 className="traineeRegistration-heading">Trainee Registration</h1>
//         <form onSubmit={handleFormSubmit} className="registration-form">
//         <div className="register-form-group">
//              <label htmlFor="firstName">First Name *</label>
//              <input
//               type="text"
//               id="firstName"
//               name="firstName" className='register-input'
//               value={formData.firstName}
//               onChange={handleInputChange}
//               required
//             />
//           </div>

//           <div className="register-form-group">
//             <label htmlFor="lastName">Last Name *</label>
//             <input
//               type="text"
//               id="lastName"
//               name="lastName" className='register-input'
//               value={formData.lastName}
//               onChange={handleInputChange}
//               required
//             />
//           </div>

//           <div className="register-form-group">
//             <label htmlFor="lastName">Email *</label>
//             <input
//               type="email"
//               id="email"
//               name="email" className='register-input'
//               value={formData.email}
//               onChange={handleInputChange}
//               required
//             />
//           </div>

//           <div className="register-form-group">
//             <label htmlFor="dateOfBirth">DOB</label>
//             <input
//               type="date"
//               id="dateOfBirth"
//               name="dateOfBirth" className='register-input'
//               value={formData.dateOfBirth}
//               onChange={handleInputChange}
//             />
//           </div>

//           <div className="register-form-group">
//             <label htmlFor="address">Address</label>
//             <textarea
//               id="address"
//               name="address" className='register-input'
//               value={formData.address}
//               onChange={handleInputChange}
//             ></textarea>
//           </div>

//           <div className="register-form-group">
//             <button type="submit" className='register-button'>Register</button>
//           </div>
//         </form>

//         {showResponse && (
//           <div className="register-response">
//             <h3>User Details</h3>
//             <p>
//               <strong>Username:</strong> {response.userName}
//             </p>
//             <p>
//               <strong>Password:</strong> {response.password}
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TraineeRegistrationForm;
