import React, { useState } from 'react';
import Header from './HomePage';
import { TextField, Button, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import '../component-styles/Login.css';
import { useSelector } from 'react-redux';
import { setUserName, setUserType } from '../redux/UserData';
import { login } from '../redux/LoginStatus';
import { useAppDispatch } from '../redux/Hooks';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    userType: 'trainee',
    captcha: '',
  });
  // const [isLoggedin, setIsLoggedin] = useState(false);
  const {isLoggedin} = useSelector((state: any)=>state.loginStatus.isLogIn);
  const [systemGeneratedCaptcha, setSystemGeneratedCaptcha] = useState(generateCaptcha());
  const [warningMessage, setWarningMessage] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function generateCaptcha() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const captcha = Array.from({ length: 6 }, () =>
      characters.charAt(Math.floor(Math.random() * characters.length))
    ).join('');
    return captcha;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUserTypeChange = (event: SelectChangeEvent<string>) => {
    setFormData({ ...formData, userType: event.target.value });
  };

  const reloadCaptcha = () => {
    setSystemGeneratedCaptcha(generateCaptcha());
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { username, password, userType, captcha } = formData;
    const requestData = {
      userName: username,
      password: password,
    };

    if (username.length > 3 && password.length >= 8) {
      
      if (captcha === systemGeneratedCaptcha) {
        console.log(formData);
        fetch('http://localhost:4001/main/user/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        })
          .then((response) => {
            if (response.ok) {
              console.log('Logged in successfully');
              // localStorage.setItem('userName', username);
              // localStorage.setItem('userType',userType);
              dispatch(setUserName(username));
              dispatch(setUserType(userType));
              // setIsLoggedin(true);
              // localStorage.setItem('login', '1');
              dispatch(login());
              console.log("after dispatch");
              if (userType === 'trainee') {
                window.location.href = '/traineeProfile';
                // navigate("/traineeProfile");
                /*
                difference between navigate() and window.location.href is that 
                  when i used navigate(), menu items are automatically openning without click
                    the menu items are being popped up
                  which is not happening with "window.location.href"
                */
              } else if (userType === 'trainer') {
                //navigate('/trainerProfile');
                window.location.href = '/trainerProfile';
              } 
            } else {
              console.log('Login failed');
              setWarningMessage('Invalid username or password.');
            }
          })
          .catch((error) => {
            console.error('Error while logging in:', error);
            setWarningMessage('There is an error occured. Please try again');
          });
        } else {
          console.log('Captcha did not matched');
          setWarningMessage('Captcha not matched. Please try again.');
        }
    } else {
      console.log('Form data is invalid');
      setWarningMessage('Did not meet credentials requirement.Please check it again');
    }
  };

  return (
    <div className="center-box">
      {isLoggedin ? (
        <Header />
      ) : (
        <div className="login-container">
          <div className="login-image-container">
            <img
              src="src\images\gym-login.PNG"
              alt="Login Image"
              className="login-image"
            />
          </div>
          <div className="login-form-container">
            <h1 className="login-heading">LOGIN</h1>
            {/* <p> */}
              {warningMessage && (
                <div className="warning-message">
                  {warningMessage}
                </div>
              )}
              {/* </p> */}
            <form onSubmit={handleFormSubmit} className="login-form">
              <div className="login-form-group">
                <label className="login-label" htmlFor="username">
                  Username
                </label>
                <TextField
                  type="text"
                  id="username"
                  name="username"
                  className="login-input"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                  inputProps={{ style: { backgroundColor: 'whitesmoke',color:'black' } }}
                  InputLabelProps={{ style: { color: 'black' } }}
                />
              </div>
              <div className="login-form-group">
                <label className="login-label" htmlFor="password">
                  Password
                </label>
                <TextField
                  type="password"
                  id="password"
                  name="password"
                  className="login-input"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  inputProps={{ style: { backgroundColor: 'whitesmoke',color:'black' } }}
                  InputLabelProps={{ style: { color: 'black' } }}
                />
              </div>
              <div className="login-form-group">
                <label className="login-label" htmlFor="userType">
                  User Type
                </label>
                <Select
                  id="userType"
                  name="userType"
                  className="login-input"
                  value={formData.userType}
                  onChange={handleUserTypeChange}
                  required
                >
                  <MenuItem value="trainee">Trainee</MenuItem>
                  <MenuItem value="trainer">Trainer</MenuItem>
                </Select>
              </div>
              <div className="login-form-group">
                <div className="captcha-box" style={{ display: 'flex', alignItems: 'center' }}>
                  <TextField
                    type="text"
                    variant="standard"
                    className="login-captcha-input"
                    value={systemGeneratedCaptcha}
                    InputProps={{
                      readOnly: true,
                      style: { backgroundColor: 'whitesmoke', color: 'black',alignItems: 'center' },
                    }}
                    inputProps={{ style: { backgroundColor: 'whitesmoke',color:'black'} }}
                    InputLabelProps={{ style: { color: 'black' } }}
                  />
                  <Button
                    type="button"
                    onClick={reloadCaptcha}
                    className="login-reload-button"
                    style={{
                      backgroundColor: "#242628",
                      color: "#bdacac",
                      border: "none",
                      width: "40px",
                      height: "40px",
                      cursor: "pointer",
                      marginLeft: "5px",
                    }}
                  >
                    &#8635; {/* Reload symbol */}
                  </Button>
                </div>

                <label className="login-label" htmlFor="captcha">
                  Enter CAPTCHA
                </label>
                <TextField
                  type="text"
                  id="captcha"
                  name="captcha"
                  className="login-input"
                  value={formData.captcha}
                  onChange={handleInputChange}
                  required
                  inputProps={{ style: { backgroundColor: 'whitesmoke' ,color:'black'} }}
                  InputLabelProps={{ style: { color: 'black' } }}
                />
              </div>
              <Button className="login-button" type="submit">
                Login
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
