import { Grid, Typography } from '@mui/material';
import '../component-styles/HomeStart.css';

function HomeStart() {
  return (
    <Grid container className="home-content-container">
      <Grid item xs={6}>
        <div className="home-content">
          <Typography variant="h4" >
            <p className="home-content-heading">Welcome to GymApp</p>
          </Typography>
          <Typography variant="body1">
            Whether you're a fitness enthusiast or just starting your fitness journey,
            GymApp has everything you need to achieve your fitness goals.
            Explore our training programs, connect with certified trainers, and track
            your progress. It's time to transform your life and get fit!
          </Typography>
          <Typography variant="body1" style={{fontWeight:'bold'}}>Get started by signing up or logging in to your account.</Typography>
        </div>
      </Grid>

      <Grid item xs={6}>
        <img src="src\images\gym-home.PNG" alt="Gym" className="home-image" />
      </Grid>
    </Grid>
  );
}

export default HomeStart;
