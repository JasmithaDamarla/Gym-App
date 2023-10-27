import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../component-styles/UpdateTraineeProfile.css';

interface TrainerProfile {
  userName: string;
  firstName: string;
  lastName: string;
  specialization: string;
}

const UpdateTraineeProfile: React.FC = () => {
  // const [formData, setFormData] = useState({
  //   userName: '',
  //   firstName: '',
  //   lastName: '',
  //   dob: '',
  //   address: '',
  //   isActive: 'Yes',
  //   trainers: [] as any,
  // });

  const location = useLocation();
  const traineeData = location.state?.traineeData;
  if (!traineeData) {
    console.log(traineeData);
    return <div>Loading...</div>;
  }

  console.log(traineeData);

  const [formData, setFormData] = useState({
    userName: traineeData.userName,
    firstName: traineeData.firstName,
    lastName: traineeData.lastName,
    dob: traineeData.dob,
    address: traineeData.address,
    isActive: traineeData.isActive ? 'Yes' : 'No',
    trainers: [] as any,
  });

  const [availableTrainers, setAvailableTrainers] = useState<TrainerProfile[]>([]);

  const [fetchTrainers, setFetchTrainers] = useState(true);

  useEffect(() => {
    if (fetchTrainers && formData.userName) {
      fetch(`http://localhost:4001/main/trainer/notAssignedTrainees?userName=${formData.userName}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          setAvailableTrainers(data);
          setFetchTrainers(false);
        })
        .catch((error) => {
          console.error('Error fetching trainers:', error);
        });
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
    const updatedTrainers = checked
      ? [...formData.trainers, name]
      : formData.trainers.filter((trainer:any) => trainer !== name);

    setFormData({ ...formData, trainers: updatedTrainers });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updateData = {
      userName: formData.userName,
      firstName: formData.firstName,
      lastName: formData.lastName,
      dob: formData.dob,
      address: formData.address,
      isActive: formData.isActive === 'Yes',
      trainers: formData.trainers,
    };
    console.log(updateData);

    fetch('http://localhost:4001/main/trainee/updateTrainers', {
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
        return response.json();
      })
      .then((data) => {
        console.log('Trainee profile updated successfully', data);
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  };

  return (
    <div className="update-trainee-box">
      <h1 className="update-trainee-heading">Update Profile Form</h1>
      <form className="update-trainee-form" onSubmit={handleSubmit}>
        <div className="update-trainee-field">
          <label htmlFor="userName">User Name:</label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={formData.userName}
            onChange={handleInputChange}
          />
        </div>
        <div className="update-trainee-field">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
          />
        </div>
        <div className="update-trainee-field">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
          />
        </div>
        <div className="update-trainee-field">
          <label htmlFor="dob">Date of Birth:</label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleInputChange}
          />
        </div>
        <div className="update-trainee-field">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
          />
        </div>
        <div className="update-trainee-field">
          <label>Is Active:</label>
          <div>
            <label>
              <input
                type="radio"
                id="isActiveYes"
                name="isActive"
                value="Yes"
                checked={formData.isActive === 'Yes'}
                onChange={handleInputChange}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                id="isActiveNo"
                name="isActive"
                value="No"
                checked={formData.isActive === 'No'}
                onChange={handleInputChange}
              />
              No
            </label>
          </div>
          </div>
          <div className="update-trainee-field">
          <label>Trainers List:</label>
          <div>
            {availableTrainers.map((trainer) => (
              <label key={trainer.userName}>
                <input
                  type="checkbox"
                  name={trainer.userName as string}
                  checked={formData.trainers.includes(trainer.userName as string)}
                  onChange={handleCheckboxChange}
                />
                {`${trainer.firstName} ${trainer.lastName} (${trainer.specialization})`}
              </label>
            ))}
          </div>
        </div>
        <div className="button-container">
          <button className="action-button" type="submit">
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateTraineeProfile;
