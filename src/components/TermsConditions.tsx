import { Typography, Box } from "@mui/material";
import { Container } from "react-bootstrap";

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
  