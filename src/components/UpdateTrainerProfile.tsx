import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../component-styles/UpdateTrainerProfile.css';

const UpdateTrainerProfile: React.FC = () => {

  const location = useLocation();
  const trainerData = location.state?.trainerData;
  if (!trainerData) {
    console.log(trainerData);
    return <div>Loading...</div>;
  }
  console.log(trainerData);

  // const [formData, setFormData] = useState({
  //   firstName: '',
  //   lastName: '',
  //   userName:'',
  //   isActive: false, 
  // });

  const [formData, setFormData] = useState({
    userName: trainerData.username,
    firstName: trainerData.firstName,
    lastName: trainerData.lastName,
    isActive: trainerData.isActive ? true : false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const isActive = value === 'Yes';
    setFormData({ ...formData, isActive });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updateData = {
      userName: formData.userName, 
      firstName: formData.firstName,
      lastName: formData.lastName,
      isActive: formData.isActive
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
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  };

  return (
    <div className="update-trainer-box">
      <h1 className="update-trainer-heading">Update Profile Form</h1>
      <form onSubmit={handleFormSubmit} className="update-trainer-form">
        <div className="update-trainer-field">
          <label htmlFor="firstName">First Name:</label>
          <input
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
          <input
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
          <input
            type="text"
            id="userName"
            name="userName"
            className="update-trainer-input"
            value={formData.userName}
            onChange={handleInputChange}
          />
        </div>
        <div className="update-trainer-field">
          <label>Is Active:</label>
          <div className="update-trainer-radio">
            <input
              type="radio"
              id="activeYes"
              name="isActive"
              value="Yes"
              checked={formData.isActive === true}
              onChange={handleRadioChange}
              className="update-trainer-input"
            />
            <label htmlFor="activeYes">Yes</label>
            <input
              type="radio"
              id="activeNo"
              name="isActive"
              value="No"
              checked={formData.isActive === false}
              onChange={handleRadioChange}
              className="update-trainer-input"
            />
            <label htmlFor="activeNo">No</label>
          </div>
        </div>
        <div className="button-container">
          <button type="submit" className="action-button">
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateTrainerProfile;

// import React from 'react';

// const UpdateTrainerProfile: React.FC = () => {
//   return (
//     <div className="update-trainer-box">
//       <h1 className="update-trainer-heading">Update Profile Form</h1>
//       <form className="update-trainer-form">
//         <div className="update-trainer-field">
//           <label htmlFor="firstName">First Name:</label>
//           <input type="text" id="firstName" className="update-trainer-input" />
//         </div>
//         <div className="update-trainer-field">
//           <label htmlFor="lastName">Last Name:</label>
//           <input type="text" id="lastName" className="update-trainer-input" />
//         </div>
//         <div className="update-trainer-field">
//           <label>Is Active:</label>
//           <div className="update-trainer-radio">
//             <input type="radio" id="activeYes" name="isActive" value="Yes" className="update-trainer-input" />
//             <label htmlFor="activeYes">Yes</label>
//             <input type="radio" id="activeNo" name="isActive" value="No" className="update-trainer-input" />
//             <label htmlFor="activeNo">No</label>
//           </div>
//         </div>
//         <div className="button-container">
//           <button className="action-button">Send</button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default UpdateTrainerProfile;
