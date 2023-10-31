import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Grid,
  TablePagination,
} from '@mui/material';
import '../component-styles/TraineeProfile.css';
import { useAppDispatch, useAppSelector } from '../redux/Hooks';
import { logout } from '../redux/LoginStatus';

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
  address: string;
  isActive: boolean;
  trainersList: Trainer[];
}

const TraineeDetails = () => {
  const [traineeData, setTraineeData] = useState<TraineeDetailsData | null>(null);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);
  
  const userName = useAppSelector((state) => state.userData.userName);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  useEffect(() => {
    fetch('http://localhost:4001/main/trainee/profile?userName=' + userName)//localStorage.getItem('userName'))
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error fetching data');
        }
        return response.json();
      })
      .then((data) => setTraineeData(data))
      .catch((error) => {
        setError(error);
        console.error('Error fetching trainer data:', error);
        // localStorage.setItem('login','0');
        // window.location.href = '/notFound';


        dispatch(logout());
        console.log(userName);
        navigate("/notFound");
      });
  }, []);

  if (!traineeData) {
    if (error) {
      return (
        <div className='error-message'>
          An error occurred: {error}
        </div>
      );
    } else {
      return <div>Loading...</div>;
    }
  }

  return (
    <Container className='trainee-details-box'>
      <Typography variant='h4' style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <p className='traineeProfile-heading'>Trainee Details</p>
        <Link to='/updateTraineeProfile' state={{ traineeData }}>
          <Button variant='contained' color='primary'>
            Update Profile
          </Button>
        </Link>
      </Typography>

      <Paper component='form' className='trainee-details-form'>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <div className='trainee-details-field'>
              <label htmlFor='firstName'>First Name:</label>
              <input type='text' id='firstName' value={traineeData.firstName} readOnly className='input' />
            </div>
            <div className='trainee-details-field'>
              <label htmlFor='lastName'>Last Name:</label>
              <input type='text' id='lastName' value={traineeData.lastName} readOnly className='input' />
            </div>
            <div className='trainee-details-field'>
              <label htmlFor='username'>Username:</label>
              <input type='text' id='username' value={traineeData.userName} readOnly className='input' />
            </div>
            <div className='trainee-details-field'>
              <label htmlFor='dob'>DOB:</label>
              <input type='text' id='dob' value={traineeData.dob + ''} readOnly className='input' />
            </div>
            <div className='trainee-details-field'>
              <label htmlFor='address'>Address:</label>
              <input type='text' id='address' value={traineeData.address} readOnly className='input' />
            </div>
            <div className='trainee-details-field'>
              <label htmlFor='isActive'>Is Active:</label>
              <input type='text' id='isActive' value={traineeData.isActive ? 'Yes' : 'No'} readOnly className='input' />
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className='trainee-details-trainees'>
              <label className="trainers-label">Trainers List:</label>
              <Table className='trainee-table'>
                <TableHead>
                  <TableRow>
                    <TableCell>First Name</TableCell>
                    <TableCell>Last Name</TableCell>
                    <TableCell>Specialization</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {traineeData.trainersList
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((trainer, index) => (
                      <TableRow key={index}>
                        <TableCell>{trainer.firstName}</TableCell>
                        <TableCell>{trainer.lastName}</TableCell>
                        <TableCell>{trainer.specialization}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
            <TablePagination
              component="div"
              count={traineeData.trainersList.length}
              page={page}
              onPageChange={handleChangePage as any}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={(event) => setRowsPerPage(parseInt(event.target.value, 10))}
            />
          </Grid>
        </Grid>
        <div className='trainee-button-container'>
          <Link to='/deleteTrainee'>
            <Button variant='contained' color='error' fullWidth>
              Delete Account
            </Button>
          </Link>
        </div>
      </Paper>
    </Container>
  );
};

export default TraineeDetails;
