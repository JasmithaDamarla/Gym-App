import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Paper,
  Grid,
  TablePagination
} from '@mui/material';
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
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };
  useEffect(() => {
    fetch('http://localhost:4001/main/trainer/getTrainerProfile?userName=' + localStorage.getItem('userName'))
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error fetching data');
        }
        return response.json();
      })
      .then((data) => setTrainerData(data))
      .catch((error) => {
        console.error('Error fetching trainer data:', error);
        window.location.href = '/notFound';
      });
  }, []);

  if (!trainerData) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="trainer-details-box">
      <Typography variant='h4' style={{ display: 'flex', marginLeft:'40px',alignItems: 'center', justifyContent: 'space-between' }}>
        <p className='trainerProfile-heading'>Trainer Details</p>
        <Link to='/updateTrainerProfile' state={{ trainerData }}>
          <Button variant='contained' color='primary'>
            Update Profile
          </Button>
        </Link>
      </Typography>
      <Paper component='form' className='trainer-details' style={{maxHeight:'500px'}}>
        <Grid container spacing={3}>
      <form className="trainer-details-form">
        <div className="trainer-details-field">
          <label className='trainer-profile' htmlFor="firstName">First Name:</label>
          <div className="trainer-input-container">
            <input type="text" id="firstName" value={trainerData.firstName} readOnly style={{backgroundColor: '#f0f0f0'}} className="input-class" />
          </div>
        </div>
        <div className="trainer-details-field">
          <label className='trainer-profile' htmlFor="lastName">Last Name:</label>
          <div className="trainer-input-container">
            <input type="text" id="lastName" value={trainerData.lastName} readOnly style={{backgroundColor: '#f0f0f0'}} className="input-class" />
          </div>
        </div>
        <div className="trainer-details-field">
          <label className='trainer-profile' htmlFor="username">Username:</label>
          <div className="trainer-input-container">
            <input type="text" id="username" value={trainerData.username} readOnly style={{backgroundColor: '#f0f0f0'}} className="input-class" />
          </div>
        </div>
        <div className="trainer-details-field">
          <label className='trainer-profile' htmlFor="specialization">Specialization:</label>
          <div className="trainer-input-container">
            <input type="text" id="specialization" value={trainerData.specialization} style={{backgroundColor: '#f0f0f0'}} readOnly className="input-class" />
          </div>
        </div>
        <div className="trainer-details-field">
          <label className='trainer-profile' htmlFor="isActive">Is Active:</label>
          <div className="trainer-input-container">
            <input type="text" id="isActive" value={trainerData.isActive ? 'Yes' : 'No'} readOnly style={{backgroundColor: '#f0f0f0'}} className="input-class" />
          </div>
        </div>
      </form>

      <div className="trainer-details-trainees">
        <label className="trainees-label">Trainees List:</label>
          <Table className="trainer-table">
            <TableHead>
              <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {trainerData.trainees
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((trainee, index) => (
                <TableRow key={index}>
                  <TableCell>{trainee.firstName}</TableCell>
                  <TableCell>{trainee.lastName}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
              component="div"
              count={trainerData.trainees.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={(event) => setRowsPerPage(parseInt(event.target.value, 10))}
            />
      </div>
      </Grid>
      </Paper>
    </Container>
  );
};

export default TrainerDetails;