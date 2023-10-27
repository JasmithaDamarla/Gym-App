import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../component-styles/TraineeProfile.css';

interface Trainer {
  userName: string;
  firstName: string;
  lastName: string;
  specialization: string;
}

interface TraineeDetailsData {
  userName: string;
  firstName: string;
  lastName: string;
  dob: Date;
  address: string,
  isActive: boolean;
  trainersList: Trainer[];
}
const TrainerDetails: React.FC = () => {
  // const navigate = useNavigate();
  const [traineeData, setTraineeData] = useState<TraineeDetailsData | null>(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:4001/main/trainee/profile?userName=' + localStorage.getItem('userName'))
      .then(response => {
        if (!response.ok) {
          throw new Error('Error fetching data');
        }
        return response.json();
      })
      .then(data => setTraineeData(data))
      .catch(error => { 
          setError(error);
          console.error('Error fetching trainer data:', error);
          window.location.href='/notFound';
        });
  }, []);
  if (!traineeData) {
    if (error) {
      return (
        <div className="error-message">
          An error occurred: {error}
        </div>
      );
    }
    else {
      return <div>Loading..</div>
    }
  }

  return (
    <div className="trainee-details-box">
      <h1 className='traineeProfile-heading'>Trainee Details</h1>
      <form className="trainee-details-form">
        <div className="trainee-details-field">
          <label htmlFor="firstName">First Name:</label>
          <input type="text" id="firstName" value={traineeData.firstName} readOnly />
        </div>
        <div className="trainee-details-field">
          <label htmlFor="lastName">Last Name:</label>
          <input type="text" id="lastName" value={traineeData.lastName} readOnly />
        </div>
        <div className="trainee-details-field">
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" value={traineeData.userName} readOnly />
        </div>
        <div className="trainee-details-field">
          <label htmlFor="dob">DOB:</label>
          <input type="text" id="dob" value={traineeData.dob + ""} readOnly />
        </div>
        <div className="trainee-details-field">
          <label htmlFor="address">Address:</label>
          <input type="text" id="address" value={traineeData.address} readOnly />
        </div>
        <div className="trainee-details-field">
          <label htmlFor="isActive">Is Active:</label>
          <input
            type="text"
            id="isActive"
            value={traineeData.isActive ? 'Yes' : 'No'}
            readOnly
          />
        </div>
        <div className="trainee-details-trainees">
          <label>Trainer List:</label>
          <table className="trainee-table">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Specialization</th>
              </tr>
            </thead>
            <tbody>
              {traineeData.trainersList.map((trainer, index) => (
                <tr key={index}>
                  <td>{trainer.firstName}</td>
                  <td>{trainer.lastName}</td>
                  <td>{trainer.specialization}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>


        {/* <div className="trainee-details-trainees">
          <label>Traineer List:</label>
          <ul>
            {traineeData.trainersList.map((trainer, index) => (
              <li key={index}>
                {/* <div className="trainee-details-field">
                  <label htmlFor={`trainerUserName${index}`}>Trainee's User Name:</label>
                  <input
                    type="text"
                    id={`trainerUserName${index}`}
                    value={trainer.userName}
                    readOnly
                  />
                </div> 
                <div className="trainee-details-field">
                  <label htmlFor={`trainerFirstName${index}`}>Trainer's First Name:</label>
                  <input
                    type="text"
                    id={`trainerFirstName${index}`}
                    value={trainer.firstName}
                    readOnly
                  />
                </div>
                <div className="trainee-details-field">
                  <label htmlFor={`trainerLastName${index}`}>Trainer's Last Name:</label>
                  <input
                    type="text"
                    id={`trainerLastName${index}`}
                    value={trainer.lastName}
                    readOnly
                  />
                </div>
                <div className="trainee-details-field">
                  <label htmlFor={`trainerSpecialization${index}`}>Trainer's Specialization:</label>
                  <input
                    type="text"
                    id={`trainerSpecialization${index}`}
                    value={trainer.specialization}
                    readOnly
                  />
                </div>
              </li>
            ))}
          </ul>
        </div> */}
        <div className="trainee-button-container">
          <Link to="/traineeTrainingsLog" state={{userName:traineeData.userName}}><button className="trainee-action-button">View Trainings</button></Link>
          <Link to="/updateTraineeProfile" state={{ traineeData }}><button className="trainee-action-button">Update Trainee Profile</button></Link>
          <Link to="/login"><button className="trainee-action-button">Delete Trainee Profile</button></Link>
          <Link to="/changePassword"><button className="trainee-action-button">Change Password</button></Link>
          <Link to="/addTraining"><button className="trainee-action-button">Add-Training</button></Link>
        </div>
      </form>
    </div>
  );
};

export default TrainerDetails;
