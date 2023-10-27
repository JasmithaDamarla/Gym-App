import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../component-styles/TrainerProfile.css';

interface Trainer {
  firstName: string;
  lastName: string;
}

interface TrainerData {
  firstName: string;
  lastName: string;
  username: string;
  specialization: string;
  isActive: boolean;
  trainees: Trainer[];
}

const TrainerDetails: React.FC = () => {
  const [trainerData, setTrainerData] = useState<TrainerData | null>(null);

  useEffect(() => {
    fetch('http://localhost:4001/main/trainer/getTrainerProfile?userName='+localStorage.getItem('userName'))
    .then(response => {
      if (!response.ok) {
        throw new Error('Error fetching data');
      }
      return response.json();
    })
      .then(data => setTrainerData(data))
      .catch(error => {
        console.error('Error fetching trainer data:', error);
        window.location.href='/notFound';
      });
  }, []);

  if (!trainerData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="trainer-details-box">
      <h1>Trainer Details</h1>
      <form className="trainer-details-form">
        <div className="trainer-details-field">
          <label className='trainer-profile' htmlFor="firstName">First Name:</label>
          <div className="input-container">
            <input type="text" id="firstName" value={trainerData.firstName} readOnly />
          </div>
        </div>
        <div className="trainer-details-field">
          <label className='trainer-profile' htmlFor="lastName">Last Name:</label>
          <div className="input-container">
            <input type="text" id="lastName" value={trainerData.lastName} readOnly />
          </div>
        </div>
        <div className="trainer-details-field">
          <label className='trainer-profile' htmlFor="username">Username:</label>
          <div className="input-container">
            <input type="text" id="username" value={trainerData.username} readOnly />
          </div>
        </div>
        <div className="trainer-details-field">
          <label className='trainer-profile' htmlFor="specialization">Specialization:</label>
          <div className="input-container">
            <input type="text" id="specialization" value={trainerData.specialization} readOnly />
          </div>
        </div>
        <div className="trainer-details-field">
          <label className='trainer-profile' htmlFor="isActive">Is Active:</label>
          <div className="input-container">
            <input type="text" id="isActive" value={trainerData.isActive ? 'Yes' : 'No'} readOnly />
          </div>
        </div>
        <div className="trainer-details-trainees">
          <label>Trainees List:</label>
          <table className="trainer-table">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
              </tr>
            </thead>
            <tbody>
              {trainerData.trainees.map((trainee, index) => (
                <tr key={index}>
                  <td>
                    {trainee.firstName}
                  </td>
                  <td>
                    {trainee.lastName}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="trainer-button-container">
          <Link to="/trainerTrainingsLog" state={{userName:trainerData.username}}><button className="trainer-action-button">View Trainings</button></Link>
          <Link to="/updateTrainerProfile" state={{ trainerData }}><button className="trainer-action-button">Update Trainer Profile</button></Link>
          <Link to="/changePassword"><button className="trainer-action-button">Change Password</button></Link>
        </div>
      </form>
    </div>
  );
};

export default TrainerDetails;
