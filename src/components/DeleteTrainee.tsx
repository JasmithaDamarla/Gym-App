import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const DeleteTrainee = () => {
  const [isConfirming, setIsConfirming] = useState(false);

  const handleConfirm = () => {
    fetch('http://localhost:4001/main/trainee/deleteByUserName?username=' + localStorage.getItem('userName'),{
        method:'Delete'
    })
      .then((response) => {
        console.log('User deleted successfully');
        localStorage.removeItem('userName');
        localStorage.removeItem('userType');
        localStorage.removeItem('login');
        window.location.href='/home';
      })
      .catch((error) => {
        console.error('Error deleting user:', error);
      });
    alert('Account deleted successfully');
    setIsConfirming(false);
  };

  const handleCancel = () => {
    setIsConfirming(false);
  };

  return (
    <div>
      {isConfirming ? (
        <Dialog open={isConfirming} onClose={handleCancel}>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete your account?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancel} color="primary">
              Cancel
            </Button>
            <Button onClick={handleConfirm} color="error">
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      ) : (
        <Button variant="contained" color="error" onClick={() => setIsConfirming(true)}>
          Delete Account
        </Button>
      )}
    </div>
  );
};

export default DeleteTrainee;
