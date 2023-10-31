import React, { useState, useEffect } from 'react';
import {
  Button,
  TextField,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Grid,
  InputLabel,
  TablePagination,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import '../component-styles/TrainerTrainingsLog.css';
import { useAppSelector } from '../redux/Hooks';

interface TrainerTrainingTypeResponseDTO {
  trainingName: string;
  trainingDate: Date;
  trainingType: string;
  duration: Number;
  traineeName: string;
}

const TrainerTrainings: React.FC = () => {
  // const location = useLocation();
  // const [userName, setUserName] = useState(location.state.userName);
  const userName = useAppSelector((state) => state.userData.userName);
  const [traineeName, setTraineeName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [trainingsList, setTrainingsList] = useState<TrainerTrainingTypeResponseDTO[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

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
      <Typography variant="h4">
        <p className="trainer-trainings-heading">Trainer Trainings</p>
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={2.2}>
          <TextField
            type="text"
            value={userName}
            // onChange={(e) => setUserName(e.target.value)}
            fullWidth
            label="User Name"
            style={{marginTop:'20px'}}
            InputProps={{readOnly:true}}
          />
        </Grid>
        <Grid item xs={2.2}>
            <InputLabel className='date-heading' style={{color:'black'}}>Start Date</InputLabel>
            <TextField
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              fullWidth
              // label='From Date : '
            />
          </Grid>
          <Grid item xs={2.2}>
          <InputLabel className='date-heading' style={{color:'black'}}>End Date</InputLabel>
            <TextField
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              fullWidth
              // label='To Date : '
            />
          </Grid>
        <Grid item xs={2.2}>
        <InputLabel className='trainee-name-heading' style={{color:'black'}}>Trainee Name</InputLabel>
          <TextField
            type="text"
            value={traineeName}
            onChange={(e) => setTraineeName(e.target.value)}
            fullWidth
            placeholder="Trainee Name"
          />
        </Grid>
        <Grid item xs={2.2}>
          <Button
            variant="contained"
            onClick={handleSearch}
            fullWidth
            style={{height:'50px',marginTop:'20px'}}
            startIcon={<SearchIcon />}
          >
            Search
          </Button>
        </Grid>
      </Grid>
      <div className="trainer-trainings-log-list">
        <Typography variant="h5"><p className="trainings-list-heading">Trainer Trainings</p></Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Training Date</TableCell>
              <TableCell>Training Name</TableCell>
              <TableCell>Training Type</TableCell>
              <TableCell>Trainee's Name</TableCell>
              <TableCell>Training Duration</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {trainingsList
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((training, index) => (
              <TableRow key={index}>
                <TableCell>{training.trainingDate + ''}</TableCell>
                <TableCell>{training.trainingName}</TableCell>
                <TableCell>{training.trainingType}</TableCell>
                <TableCell>{training.traineeName}</TableCell>
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

export default TrainerTrainings;
