import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../component-styles/TrainerTrainingsLog.css';

interface TrainerTrainingTypeResponseDTO {
  trainingName: string,
  trainingDate: Date,
  trainingType: string,
  duration: Number,
  traineeName: string
}


const TrainerTrainings: React.FC = () => {
  const location = useLocation();
  const [userName,setUserName] = useState(location.state.userName);
  const [traineeName, setTraineeName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [trainingsList, setTrainingsList] = useState<TrainerTrainingTypeResponseDTO[]>([]);

  const handleSearch = () => {
    const params = new URLSearchParams();
  
    if (userName) {
      params.append('userName', userName);
    }
  
    if (traineeName) params.append('traineeName', traineeName);
    if (startDate) params.append('periodFrom', startDate);
    if (endDate) params.append('periodTo', endDate);

    
  
    fetch(`http://localhost:4001/main/trainer/getTrainersTrainings?${params.toString()}`)
      .then((response) => response.json())
      .then((data) => setTrainingsList(data))
      .catch((error) =>
        console.error('Error fetching trainer trainings:', error)
        );
  };
  
  
  useEffect(() => {
    handleSearch();
  }, [userName, traineeName, startDate, endDate]);

  return (
    <div className="trainer-trainings-form">
      <h1 className="trainer-trainings-heading">Trainer Trainings</h1>
      <div className="trainer-trainings-search-section">
        <div className="trainer-trainings-search-field">
          <label>Search by User Name:</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="trainer-trainings-search-field">
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
        <div className="trainer-trainings-search-field">
          <label>Search by Trainee Name:</label>
          <input
            type="text"
            value={traineeName}
            onChange={(e) => setTraineeName(e.target.value)}
          />
        </div>
        <button className="trainer-trainings-search-button" onClick={handleSearch}>
          Search
        </button>
      </div>
      <div className="trainer-trainings-log-list">
        <h2>Trainings List</h2>
        <table className="trainer-trainings-log-table">
          <thead>
            <tr>
              <th>Training Date</th>
              <th>Training Name</th>
              <th>Training Type</th>
              <th>Trainee's Name</th>
              <th>Training Duration</th>
            </tr>
          </thead>
          <tbody>
            {trainingsList.map((training, index) => (
              <tr key={index}>
                <td>{training.trainingDate + ''}</td>
                <td>{training.trainingName}</td>
                <td>{training.trainingType}</td>
                <td>{training.traineeName}</td>
                <td>{training.duration + ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default TrainerTrainings;
