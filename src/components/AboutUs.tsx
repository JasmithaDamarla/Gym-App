import { Typography } from "@mui/material";
import { Container } from "react-bootstrap";

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
    );
  };