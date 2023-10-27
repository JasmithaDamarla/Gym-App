import  '../component-styles/HomeStart.css';

function HomeStart() {
  return (
    <div className="home-content-container">
        <div className="home-content">
          <br></br>
          <br></br>
          <h1 className='home-content-heading'>Welcome to GymApp</h1>
          <b>
          <p className='home-content'>
              Whether you're a fitness enthusiast or just starting your fitness journey,
              GymApp has everything you need to achieve your fitness goals.
          </p>
          <p className='home-content'>
              Explore our training programs, connect with certified trainers, and track
              your progress. It's time to transform your life and get fit!
          </p>
          <p className='home-content'>Get started by signing up or logging in to your account.</p>
          </b>
        </div>
    </div>
  );
}

export default HomeStart;
