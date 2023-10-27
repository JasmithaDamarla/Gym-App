import { useState } from 'react';
import '../component-styles/Login.css';
import Header from './HomePage';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    userType:'trainee',
    captcha: '',
  });
  const [isLoggedin, setIsLoggedin] = useState(false);
  // const [loggedInUsername, setLoggedInUsername] = useState('');
  // const handleLogout = () => {
  //   setIsLoggedin(false);
  // };

  const [systemGeneratedCaptcha, setSystemGeneratedCaptcha] = useState(generateCaptcha());

  function generateCaptcha() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const captcha = Array.from({ length: 6 }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join('');
    return captcha;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const reloadCaptcha = () => {
    setSystemGeneratedCaptcha(generateCaptcha());
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { username, password,userType,captcha } = formData;
    // const history = useHistory();
    const requestData = {
      userName: username,
      password: password,
    };
    
    if (username.length > 3 && password.length >= 8 && captcha === systemGeneratedCaptcha) {
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
            // setLoggedInUsername(username); 
            localStorage.setItem('userName',username);
            // setIsLoggedin(true);
            // history.push('/userHome');
            setIsLoggedin(true);
            localStorage.setItem('login','1');
            console.log(userType);
            if (userType === 'trainee') {
              console.log('trainee');
              window.location.href = '/traineeProfile';
            } else if (userType === 'trainer') {
              console.log('trainer');
              window.location.href = '/trainerProfile';
            }
          } else {
            // setIsLoggedin(true);
            // localStorage.setItem('login','0');
            console.log('Login failed');
            
          }
        })
        .catch((error) => {
          console.error('Error while logging in:', error);
        });
    } else {
      console.log('Form data is invalid');
    }
  };

  return (
    <div className="center-box">

      {isLoggedin ? (
              // <LoginHeader username={loggedInUsername} onLogout={handleLogout} />
              <Header/>
            ) : (

      <div className="login-container">
        <h1 className="login-heading">LOGIN</h1>
        <form onSubmit={handleFormSubmit} className="login-form">
          <div className="login-form-group">
            <label className="login-label" htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username" 
              className='login-input'
              value={formData.username}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="login-form-group">
            <label className="login-label" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className='login-input'
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
              
          <div className="login-form-group">
            <label className="login-label" htmlFor="userType">User Type</label>
            <select
              id="userType"
              name="userType"
              className="login-input"
              value={formData.userType}
              onChange={handleInputChange}
              required
            >
              <option value="trainee">Trainee</option>
              <option value="trainer">Trainer</option>
            </select>
          </div>
    

          <div className="login-form-group">
            <div className="captcha-box">
              <input
                type="text"
                className="login-captcha-input"
                value={systemGeneratedCaptcha}
                readOnly
              />
              <button
                type="button"
                onClick={reloadCaptcha}
                className="login-reload-button"
              >
                {/* symbol for reload */}
                &#8635; 
              </button>
            </div>
            <label className="login-label" htmlFor="captcha">Enter CAPTCHA</label>
            <input
              type="text"
              id="captcha"
              name="captcha"
              className='login-input'
              value={formData.captcha}
              onChange={handleInputChange}
              required
            />
          </div>

          <button className="login-button" type="submit">Login</button>
        </form>
      </div>
      )}
    </div>
  );
};

export default Login;
