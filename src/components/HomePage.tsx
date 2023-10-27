import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { faDumbbell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'font-awesome/css/font-awesome.min.css';
import '../component-styles/HomePage.css'; 

const Header: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('login') === '1');

  useEffect(() => {
    const loginStatus = localStorage.getItem('login') === '1';
    setIsLoggedIn(loginStatus);
  }, []);

  const onLogout = () => {
    localStorage.removeItem('login');
    localStorage.removeItem('userName');
    window.location.href = '/home';
  };

  return (
    <nav className="navbar bg-black">
      <div className="container-fluid">
        <div className="nav-content">
          <div className="nav-title">
            <FontAwesomeIcon icon={faDumbbell} className="gym-icon" />
            <b className="gymapp-title">GYMAPP</b>
          </div>
          <div className="nav-links">
            {isLoggedIn ? (
              <div className="user-menu">
                <div className="user-menu-dropdown">
                  
                  <Link to="/home" onClick={onLogout}>Log Out</Link>
                </div>
              </div>
            ) : (
              <>
                <Link to="/Home">Home</Link>
                <Link to="/TraineeRegistration">Trainee-Registration</Link>
                <Link to="/TrainerRegistration">Trainer-Registration</Link>
                <Link to="/login">Login</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
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
  // return (
  //   <nav className="footer-navbar bg-black">
  //     <div className="footer-links">
  //       <Link to="/about">About Us</Link>
  //       <Link to="/contact">Contact Us</Link>
  //       <Link to="/terms">Terms Of Use</Link>
  //     </div>
  //   </nav>
  );
}

export function AboutUs() {
  return (
    <div className="about-page">
      <h2 className="page-title">About Us</h2>
      <p className="page-content">
        Welcome to GymApp, the ultimate platform for gym enthusiasts, both trainees and trainers. Our application empowers trainees and trainers to create and manage their profiles effortlessly. Trainees can even select one or more trainers to guide them on their fitness journey.
        Keep track of your fitness activities and access them from both the trainer and trainee perspectives. GymApp also offers the flexibility to modify profile information and activate or deactivate profiles as needed.
        Please note that to access most features of the application, you'll need to log in with your credentials, ensuring a secure and personalized experience for both trainers and trainees.
        For trainers, we provide valuable insights into your trainees' progress by calculating training duration on a weekly basis.
        Join GymApp today and take control of your fitness goals with a user-friendly and comprehensive platform.
      </p>

    </div>
  );
};

export function TermsConditions(){
  return (
    <div className="terms-page">
      <p className="page-content">
        <u><h2>Terms and Conditions</h2></u>

        <h3>1. Acceptance of Terms</h3>
        By using the GymApp application, you agree to comply with and be bound by these terms and conditions. If you do not agree to these terms, please refrain from using the application.

        <h3>2. User Registration</h3>
        To access the full range of features in GymApp, users must register and provide accurate information. User data will be handled as per our Privacy Policy.

        <h3>3. User Profiles</h3>
        Trainees and trainers can create, modify, and deactivate their profiles as needed. User-generated content should adhere to community guidelines.

        <h3>4. Activities Logging</h3>
        Users can log their gym activities, which will be viewable by both trainers and trainees. Accuracy and honesty in activity logging are encouraged.

        <h3>5. Privacy</h3>
        Protecting user privacy is our top priority. Personal information and data will be handled in accordance with our Privacy Policy.

        <h3>6. Login Credentials</h3>
        Login credentials (username and password) must be kept confidential. Users are responsible for all actions performed under their account.

        <h3>7. Trainers' Insights</h3>
        Trainers can access calculated insights on trainee activities, particularly weekly training duration, to offer more personalized guidance.

        <h3>8. Modifications</h3>
        GymApp reserves the right to modify or discontinue any part of the application. Users will be notified of significant changes.

        <h3>9. Termination</h3>
        GymApp may terminate or suspend user accounts if violations of these terms are detected.

        <h3>10. Contact Us</h3>
        If you have questions or concerns about these terms and conditions, please contact us at support@gymapp.com.

        By using GymApp, you agree to abide by these terms and conditions and any updates or changes to them. Please review this document periodically for any modifications.
      </p>

    </div>
  );
};


export function ContactUs () {
  return (
    <div className="contact-us-container">
      <h2>Contact Us</h2>
      <p>If you have any questions or need assistance, you can contact us through the following channels:</p>
      <ul className="contact-list">
        <li>
          <a href="mailto:contact@gymapp.com">
            <i className="fa fa-envelope"></i> Email: contact@gymapp.com
          </a>
        </li>
        <li>
          <a href="https://www.facebook.com/gymapp" target="_blank" rel="noopener noreferrer">
            <i className="fa fa-facebook"></i> Facebook: GymApp
          </a>
        </li>
        <li>
          <a href="https://www.instagram.com/gymapp" target="_blank" rel="noopener noreferrer">
            <i className="fa fa-instagram"></i> Instagram: @gymapp
          </a>
        </li>
        <li>
          <a href="https://wa.me/" target="_blank" rel="noopener noreferrer">
            <i className="fa fa-whatsapp"></i> WhatsApp: +1234567890
          </a>
        </li>
        <li>
          <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
            <i className="fa fa-twitter"></i> Twitter: @gymapp
          </a>
        </li>
      </ul>
    </div>
  );
};



export default Header;
