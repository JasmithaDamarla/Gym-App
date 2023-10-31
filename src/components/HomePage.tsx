import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell } from '@fortawesome/free-solid-svg-icons';
import '../component-styles/HomePage.css';
import { AccountCircle } from '@mui/icons-material';
import { login, logout, selectIsLogIn } from '../redux/LoginStatus';
import { removeUserName, removeUserType} from '../redux/UserData';
import { useAppSelector, useAppDispatch } from '../redux/Hooks';

const Header: React.FC = () => {
  // const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('login') === '1');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); 
  const dispatch = useAppDispatch();
  
  const userName = useAppSelector((state) => state.userData.userName);
  const userType = useAppSelector((state) => state.userData.userType);
  const loginStatus = useAppSelector(selectIsLogIn);
  

  useEffect(() => {
    // const loginStatus = localStorage.getItem('login') === '1';
    
    // setIsLoggedIn(loginStatus);
    dispatch(login());

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); 
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const renderUserActions = () => {
    // const userType = localStorage.getItem('userType');
    // const userName = localStorage.getItem('userName');
    
    if (userType === 'trainee') {
      return (
          <>
            <MenuItem component={Link} to="/traineeProfile">
              Profile
            </MenuItem>
            <MenuItem component={Link} to="/traineeTrainingsLog" state={{ userName: userName }}>
              View Trainings
            </MenuItem>
            <MenuItem component={Link} to="/changePassword" state={{ userName: userName }}>
              Change Password
            </MenuItem>
            <MenuItem component={Link} to="/addTraining">
              Add-Training
            </MenuItem>
            <MenuItem component={Link} to="/home" onClick={onLogout}>
              Log-out
            </MenuItem>
          </>
        );
      } else if (userType === 'trainer') {
        return (
          <>
            <MenuItem component={Link} to="/trainerProfile">
              Profile
            </MenuItem>
            <MenuItem component={Link} to="/trainerTrainingsLog" state={{ userName: userName }}>
              View Trainings
            </MenuItem>
            <MenuItem component={Link} to="/changePassword" state={{ userName: userName }}>
              Change Password
            </MenuItem>
            <MenuItem component={Link} to="/home" onClick={onLogout}>
              Log-out
            </MenuItem>
          </>
        );
      } else {
      return (
        <>
          <MenuItem component={Link} to="/home" onClick={onLogout}>
            Log-out
          </MenuItem>
        </>
      );
      }
    
    };

  const onLogout = () => {
    // localStorage.removeItem('login');
    // localStorage.removeItem('userName');
    // localStorage.removeItem('userType');
    dispatch(logout());
    dispatch(removeUserName());
    dispatch(removeUserType());
    // window.location.href = '/home';
  };

  return (
    <AppBar position="static" style={{ background: '#1c1b1c',width:'100%' }}>
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between' ,width:'100%', background: '#1c1b1c' }}>
        <Typography variant="h6" component="div" style={{ fontWeight: 'bold', fontSize: '20px', color: 'white' }}>
          <FontAwesomeIcon icon={faDumbbell} style={{ fontSize: '24px', marginRight: '10px', color: 'white' }} />
          GYMAPP
        </Typography>
        {isMobile ? (  
          <>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={(event) => setAnchorEl(event.currentTarget)}
              style={{ color: 'white' }}
            > 
              <MenuIcon />
              
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
              style={{ right: 0 }}
            >
              {renderUserActions()}
            </Menu>
          </>

        ) : (
          <div className="nav-links">
            {loginStatus ? (
              <>
                <IconButton
                  style={{fontSize:'15px',marginRight:'20px'}}
                  color="inherit"
                  onClick={(event) => setAnchorEl(event.currentTarget)}
                  >Welcome, {userName} &nbsp;
                {/* space break */}
                {/* {localStorage.getItem('userName')}  */}
                  <AccountCircle />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={() => setAnchorEl(null)}
                    style={{ right: 0 }}
                  >
                    {renderUserActions()}
                  </Menu>
                </>
            ) : (

              <>
                <MenuItem component={Link} to="/Home">
                  Home
                </MenuItem>
                <MenuItem component={Link} to="/TraineeRegistration">
                  Trainee-Registration
                </MenuItem>
                <MenuItem component={Link} to="/TrainerRegistration">
                  Trainer-Registration
                </MenuItem>
                <MenuItem component={Link} to="/login">
                  Login
                </MenuItem>
            </>
              
            )}
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
  <footer className="footer-container">
      <div className="footer-navbar bg-black">
        <div className="footer-links">
          <Link to="/aboutUs">About Us</Link>
          <Link to="/contactUs">Contact Us</Link>
          <Link to="/termsAndConditions">Terms Of Use</Link>
        </div>
      </div>
      <div className="copyright">
        &copy; {currentYear} GymApp. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Header;
