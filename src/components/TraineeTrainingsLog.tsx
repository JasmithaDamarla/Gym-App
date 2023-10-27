import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../component-styles/TraineeTrainingsLog.css';

interface TraineeTrainingTypeResponseDTO {
  trainingName:string,
  trainingDate:Date,
  trainingType:string,
  duration: Number,
  trainerName :string
}

const TraineeTrainings: React.FC = () => {
  const location = useLocation();
  const [userName,setUserName] = useState(location.state.userName);
  const [trainerName, setTrainerName] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [trainingsList, setTrainingsList] = useState<TraineeTrainingTypeResponseDTO[]>([]);

  const handleSearch = () => {
    const params = new URLSearchParams();
    params.append('username', userName); 
    if (trainerName) params.append('trainerName', trainerName);
    if (specialization) params.append('trainingType', specialization);
    if (startDate) params.append('periodFrom', startDate);
    if (endDate) params.append('periodTo', endDate);

    fetch(`http://localhost:4001/main/trainee/getTrainees?${params.toString()}`)
      .then((response) => response.json())
      .then((data) => setTrainingsList(data))
      .catch((error) => console.error('Error fetching trainee trainings:', error));
  };

  useEffect(() => {
    handleSearch();
  }, []);



  return (
    <div className="trainee-trainings-form">
      <h1>Trainee Trainings</h1>
      <div className="trainee-trainings-search-section">
      <div className="trainee-trainings-search-field">
          <label>Search by User Name:</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="trainee-trainings-search-field">
          <label>Search by Trainer Name:</label>
          <input
            type="text"
            value={trainerName}
            onChange={(e) => setTrainerName(e.target.value)}
          />
        </div>
        <div className="trainee-trainings-search-field">
          <label>Search by Specialization:</label>
          <select
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
          >
            <option value="">Select Specialization</option>
            <option value="ZUMBA">ZUMBA</option>
            <option value="FITNESS">FITNESS</option>
            <option value="YOGA">YOGA</option>
            <option value="STRETCHING">STRETCHING</option>
            <option value="RESISTANCE">RESISTANCE</option>
          </select>
        </div>
        <div className="trainee-trainings-search-field">
          <label>Search by Date (From/To):</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="trainee-trainings-log-list">
        <h2>Trainings List</h2>
        <table className="trainee-trainings-log-table">
          <thead>
            <tr>
              <th>Training Date</th>
              <th>Training Name</th>
              <th>Training Type</th>
              <th>Trainer's Name</th>
              <th>Training Duration</th>
            </tr>
          </thead>
          <tbody>
            {trainingsList.map((training, index) => (
              <tr key={index}>
                <td>{training.trainingDate + ''}</td>
                <td>{training.trainingName}</td>
                <td>{training.trainingType}</td>
                <td>{training.trainerName}</td>
                <td>{training.duration + ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default TraineeTrainings;
