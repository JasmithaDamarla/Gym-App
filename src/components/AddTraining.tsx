import React, { useState, useEffect } from 'react';
import '../component-styles/AddTraining.css';

const AddTraining: React.FC = () => {
  const [formData, setFormData] = useState({
    traineeUserName: '',
    trainerUserName: '',
    trainingName: '',
    trainingDate: '',
    traningDuration: 1,
  });

  const [availableTrainers, setAvailableTrainers] = useState<string[]>([]);
  const [selectedSpecialization, setSelectedSpecialization] = useState('ZUMBA');

  useEffect(() => {
    // Fetch trainers based on the selected specialization
    fetchTrainersBySpecialization(selectedSpecialization);
  }, [selectedSpecialization]);

  const fetchTrainersBySpecialization = (specialization: string) => {
    fetch(`http://localhost:4001/main/trainer/getTrainersBySpecialization?specialization=${specialization}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setAvailableTrainers(data);
      })
      .catch((error) => {
        console.error('Error fetching trainers:', error);
      });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSpecializationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const specialization = e.target.value;
    setSelectedSpecialization(specialization);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Make the API request to add the training with the selected data
    fetch('http://localhost:4001/main/training/addTraining', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData), // Sending the form data directly
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        else {
          console.log('Training added successfully');
        }
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  };

  return (
    <div className="add-training-box">
      <h1 className="add-training-heading">Add Training</h1>
      <form className="add-training-form" onSubmit={handleSubmit}>
        <div className="add-training-field">
          <label htmlFor="add-training-date">Training Date:</label>
          <input
            type="date"
            id="add-training-date"
            name="trainingDate"
            value={formData.trainingDate}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="add-training-field">
          <label htmlFor="add-training-traineeUserName">User Name:</label>
          <input
            type="text"
            id="add-training-traineeUserName"
            name="traineeUserName"
            value={formData.traineeUserName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="add-training-field">
          <label htmlFor="add-training-name">Training Name:</label>
          <input
            type="text"
            id="add-training-name"
            name="trainingName"
            value={formData.trainingName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="add-training-field">
          <label htmlFor="add-training-type">Training Type:</label>
          <select
            id="add-training-type"
            name="trainingType"
            value={selectedSpecialization}
            onChange={handleSpecializationChange}
            required
          >
            <option value="ZUMBA">ZUMBA</option>
            <option value="FITNESS">FITNESS</option>
            <option value="YOGA">YOGA</option>
            <option value="STRETCHING">STRETCHING</option>
            <option value="RESISTANCE">RESISTANCE</option>
          </select>
        </div>
        <div className="add-training-field">
          <label htmlFor="add-trainer-name">Trainer's Name:</label>
          <select
            id="add-trainer-name"
            name="trainerUserName"
            value={formData.trainerUserName}
            onChange={handleInputChange}
            required
          >
            <option value="">Select a trainer</option>
            {availableTrainers.map((trainer) => (
              <option key={trainer} value={trainer}>
                {trainer}
              </option>
            ))}
          </select>
        </div>
        <div className="add-training-field">
          <label htmlFor="add-training-duration">Training Duration (in hours):</label>
          <input
            type="number"
            id="add-training-duration"
            name="traningDuration"
            value={formData.traningDuration}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="button-container">
          <button className="add-training-button" type="submit">
            Add Training
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTraining;
