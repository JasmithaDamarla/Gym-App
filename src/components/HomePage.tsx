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
import { Box, Container, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TwitterIcon from '@mui/icons-material/Twitter';

const Header: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('login') === '1');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); 

  useEffect(() => {
    const loginStatus = localStorage.getItem('login') === '1';
    setIsLoggedIn(loginStatus);

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); 
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const renderUserActions = () => {
    const userType = localStorage.getItem('userType');
    const userName = localStorage.getItem('userName');
  
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
      }
      return null;
    
    };

  const onLogout = () => {
    localStorage.removeItem('login');
    localStorage.removeItem('userName');
    localStorage.removeItem('userType');
    window.location.href = '/home';
  };

  return (
    <AppBar position="static" style={{ background: '#1c1b1c',width:'100%' }}>
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between' ,width:'100%', background: '#1c1b1c' }}>
        <Typography variant="h6" component="div" style={{ fontWeight: 'bold', fontSize: '20px', color: 'white' }}>
          <FontAwesomeIcon icon={faDumbbell} style={{ fontSize: '24px', marginRight: '10px', color: 'white' }} />
          GYMAPP
        </Typography>
        {isMobile ? (  
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={(event) => setAnchorEl(event.currentTarget)}
            style={{ color: 'white' }}
          >
            <MenuIcon />
            
          </IconButton>
        ) : (
          <div className="nav-links">
            {isLoggedIn ? (
              <>
                <IconButton
                  style={{fontSize:'15px'}}
                  color="inherit"
                  onClick={(event) => setAnchorEl(event.currentTarget)}
                >Welcome, {localStorage.getItem('userName')} 
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
  //   <AppBar position="static" color="primary">
  //   <Toolbar>
  //     <div className="footer-navbar bg-black">
  //       <div className="footer-links">
  //         <Link to="/aboutUs" color="inherit">
  //           About Us
  //         </Link>
  //         <Link to="/contactUs" color="inherit">
  //           Contact Us
  //         </Link>
  //         <Link to="/termsAndConditions" color="inherit">
  //           Terms Of Use
  //         </Link>
  //       </div>
  //     </div>
  //     <div className="copyright">
  //       &copy; {currentYear} GymApp. All Rights Reserved.
  //     </div>
  //   </Toolbar>
  // </AppBar>
  );
}

export function AboutUs() {
  return (
    <Container className='about-page'>
      <Typography variant="h4" component="h2" className="page-title" gutterBottom>
        About Us
      </Typography>
      <Typography variant="body1" paragraph>
        Welcome to GymApp, the ultimate platform for gym enthusiasts, both trainees and trainers. Our application empowers trainees and trainers to create and manage their profiles effortlessly. Trainees can even select one or more trainers to guide them on their fitness journey.
      </Typography>
      <Typography variant="body1" paragraph>
        Keep track of your fitness activities and access them from both the trainer and trainee perspectives. GymApp also offers the flexibility to modify profile information and activate or deactivate profiles as needed.
      </Typography>
      <Typography variant="body1" paragraph>
        Please note that to access most features of the application, you'll need to log in with your credentials, ensuring a secure and personalized experience for both trainers and trainees.
      </Typography>
      <Typography variant="body1" paragraph>
        For trainers, we provide valuable insights into your trainees' progress by calculating training duration on a weekly basis.
      </Typography>
      <Typography variant="body1" paragraph>
        Join GymApp today and take control of your fitness goals with a user-friendly and comprehensive platform.
      </Typography>
    </Container>

    // <div className="about-page">
    //   <h2 className="page-title">About Us</h2>
    //   <p className="page-content">
    //     Welcome to GymApp, the ultimate platform for gym enthusiasts, both trainees and trainers. Our application empowers trainees and trainers to create and manage their profiles effortlessly. Trainees can even select one or more trainers to guide them on their fitness journey.
    //     Keep track of your fitness activities and access them from both the trainer and trainee perspectives. GymApp also offers the flexibility to modify profile information and activate or deactivate profiles as needed.
    //     Please note that to access most features of the application, you'll need to log in with your credentials, ensuring a secure and personalized experience for both trainers and trainees.
    //     For trainers, we provide valuable insights into your trainees' progress by calculating training duration on a weekly basis.
    //     Join GymApp today and take control of your fitness goals with a user-friendly and comprehensive platform.
    //   </p>

    // </div>
  );
};

export function TermsConditions() {

  const headingStyle = {
    marginTop: '16px',
    marginBottom: '8px',
  };

  return (
    <Container className='terms-page'>
      <Typography variant="h4" component="h2" gutterBottom>
        <u>Terms and Conditions</u>
      </Typography>
      <Box>
        <Typography variant="h6" component="h3" style={headingStyle}>
          1. Acceptance of Terms
        </Typography>
        <Typography variant="body1" paragraph>
          By using the GymApp application, you agree to comply with and be bound by these terms and conditions. If you do not agree to these terms, please refrain from using the application.
        </Typography>
      </Box>
      <Box>
        <Typography variant="h6" component="h3" style={headingStyle}>
          2. User Registration
        </Typography>
        <Typography variant="body1" paragraph>
          To access the full range of features in GymApp, users must register and provide accurate information. User data will be handled as per our Privacy Policy.
        </Typography>
      </Box>
      <Box>
        <Typography variant="h6" component="h3" style={headingStyle}>
          3. User Profiles
        </Typography>
        <Typography variant="body1" paragraph>
          Trainees and trainers can create, modify, and deactivate their profiles as needed. User-generated content should adhere to community guidelines.
        </Typography>
      </Box>
      <Box>
        <Typography variant="h6" component="h3" style={headingStyle}>
          4. Activities Logging
        </Typography>
        <Typography variant="body1" paragraph>
          Users can log their gym activities, which will be viewable by both trainers and trainees. Accuracy and honesty in activity logging are encouraged.
        </Typography>
      </Box>
      <Box>
        <Typography variant="h6" component="h3" style={headingStyle}>
          5. Privacy
        </Typography>
        <Typography variant="body1" paragraph>
          Protecting user privacy is our top priority. Personal information and data will be handled in accordance with our Privacy Policy.
        </Typography>
      </Box>
      <Box>
        <Typography variant="h6" component="h3" style={headingStyle}>
          6. Login Credentials
        </Typography>
        <Typography variant="body1" paragraph>
          Login credentials (username and password) must be kept confidential. Users are responsible for all actions performed under their account.
        </Typography>
      </Box>
      <Box>
        <Typography variant="h6" component="h3" style={headingStyle}>
          7. Trainers' Insights
        </Typography>
        <Typography variant="body1" paragraph>
          Trainers can access calculated insights on trainee activities, particularly weekly training duration, to offer more personalized guidance.
        </Typography>
      </Box>
      <Box>
        <Typography variant="h6" component="h3" style={headingStyle}>
          8. Modifications
        </Typography>
        <Typography variant="body1" paragraph>
          GymApp reserves the right to modify or discontinue any part of the application. Users will be notified of significant changes.
        </Typography>
      </Box>
      <Box>
        <Typography variant="h6" component="h3" style={headingStyle}>
          9. Termination
        </Typography>
        <Typography variant="body1" paragraph>
          GymApp may terminate or suspend user accounts if violations of these terms are detected.
        </Typography>
      </Box>
      <Box>
        <Typography variant="h6" component="h3" style={headingStyle}>
          10. Contact Us
        </Typography>
        <Typography variant="body1" paragraph>
          If you have questions or concerns about these terms and conditions, please contact us at support@gymapp.com.
        </Typography>
      </Box>
      <Typography variant="body1" paragraph>
        By using GymApp, you agree to abide by these terms and conditions and any updates or changes to them. Please review this document periodically for any modifications.
      </Typography>
    </Container>
  );
};


export function ContactUs () {
  return (
    <Container className="contact-us-container">
      <Typography variant="h4" component="h2" gutterBottom>
        Contact Us
      </Typography>
      <Typography variant="body1" paragraph>
        If you have any questions or need assistance, you can contact us through the following channels:
      </Typography>
      <List className="contact-list">
        <ListItem>
          <ListItemIcon>
            <EmailIcon />
          </ListItemIcon>
          <ListItemText>
            <Link to="mailto:contact@gymapp.com">Email: contact@gymapp.com</Link>
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <FacebookIcon />
          </ListItemIcon>
          <ListItemText>
            <Link to="https://www.facebook.com/gymapp" target="_blank" rel="noopener noreferrer">Facebook: GymApp</Link>
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <InstagramIcon />
          </ListItemIcon>
          <ListItemText>
            <Link to="https://www.instagram.com/gymapp" target="_blank" rel="noopener noreferrer">Instagram: @gymapp</Link>
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <WhatsAppIcon />
          </ListItemIcon>
          <ListItemText>
            <Link to="https://wa.me/" target="_blank" rel="noopener noreferrer">WhatsApp: +1234567890</Link>
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <TwitterIcon />
          </ListItemIcon>
          <ListItemText>
            <Link to="https://twitter.com/" target="_blank" rel="noopener noreferrer">Twitter: @gymapp</Link>
          </ListItemText>
        </ListItem>
      </List>
    </Container>
  );
};



export default Header;
