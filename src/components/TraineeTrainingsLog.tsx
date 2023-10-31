import React, { useEffect, useState } from 'react';
import {
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Grid,
  TablePagination,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import '../component-styles/TraineeTrainingsLog.css';
import { useAppSelector } from '../redux/Hooks';

interface TraineeTrainingTypeResponseDTO {
  trainingName: string;
  trainingDate: Date;
  trainingType: string;
  duration: Number;
  trainerName: string;
}

const TraineeTrainings: React.FC = () => {
  // const location = useLocation();
  const userName = useAppSelector((state) => state.userData.userName);
  // const [userName, setUserName] = useState(location.state.userName);

  const [trainerName, setTrainerName] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [trainingsList, setTrainingsList] = useState<TraineeTrainingTypeResponseDTO[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

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
      <Typography variant="h4">
        <p className="trainee-trainings-heading">Trainee Trainings</p>
      </Typography>
      <div className="trainee-search-container">
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={2}>
            <InputLabel className='label' style={{color:'black'}}>User Name</InputLabel>
            <TextField
              type="text"
              value={userName}
              // onChange={(e) => setUserName(e.target.value)}
              fullWidth
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={2}>
            <InputLabel className='label' style={{color:'black'}}>Trainer Name</InputLabel>
            <TextField
              type="text"
              value={trainerName}
              onChange={(e) => setTrainerName(e.target.value)}
              fullWidth
              placeholder='Trainer Name'
            />
          </Grid>
          <Grid item xs={2}>
            <FormControl fullWidth>
              <InputLabel className='label' style={{height:'50px',marginTop:'20px'}}>Specialization</InputLabel>
              <Select
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value as string)}
                style={{marginTop:'20px'}}
              >
                <MenuItem value="">Select Specialization</MenuItem>
                <MenuItem value="ZUMBA">ZUMBA</MenuItem>
                <MenuItem value="FITNESS">FITNESS</MenuItem>
                <MenuItem value="YOGA">YOGA</MenuItem>
                <MenuItem value="STRETCHING">STRETCHING</MenuItem>
                <MenuItem value="RESISTANCE">RESISTANCE</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={2}>
            <InputLabel className='date-heading' style={{color:'black'}}>Start Date</InputLabel>
            <TextField
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={2}>
          <InputLabel className='date-heading' style={{color:'black'}}>End Date</InputLabel>
            <TextField
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={2}>
            <Button
              variant="contained"
              onClick={handleSearch}
              startIcon={<SearchIcon />}
              fullWidth
              style={{height:'50px',marginTop:'20px'}}
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </div>
      <div className="trainee-trainings-log-list">
        <Typography variant="h5">
          <p className="trainee-trainings-list-heading">Trainings List</p>
        </Typography>
        <Table className="table-container">
          <TableHead>
            <TableRow className="table-row">
              <TableCell className="table-heading">Training Date</TableCell>
              <TableCell className="table-heading">Training Name</TableCell>
              <TableCell className="table-heading">Training Type</TableCell>
              <TableCell className="table-heading">Trainer's Name</TableCell>
              <TableCell className="table-heading">Training Duration</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {trainingsList
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((training, index) => (
              <TableRow key={index} className="table-row">
                <TableCell>{training.trainingDate + ''}</TableCell>
                <TableCell>{training.trainingName}</TableCell>
                <TableCell>{training.trainingType}</TableCell>
                <TableCell>{training.trainerName}</TableCell>
                <TableCell>{training.duration + ''}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={trainingsList.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(event) => setRowsPerPage(parseInt(event.target.value, 10))}
        />
      </div>
    </div>
  );
};

export default TraineeTrainings;
