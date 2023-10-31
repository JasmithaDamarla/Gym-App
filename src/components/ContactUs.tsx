import { Typography, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TwitterIcon from '@mui/icons-material/Twitter';

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
  
  