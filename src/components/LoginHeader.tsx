import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import { faRightLong } from '@fortawesome/free-solid-svg-icons';

interface LoggedInHeaderProps {
  username: string;
  onLogout: () => void;
}

const LoginHeader: React.FC<LoggedInHeaderProps> = ({ username, onLogout }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <nav className={'navbar bg-black'}>
      <div className="container-fluid">
        <div className="nav-content">
          <div className="nav-links">
            <div className="user-menu-dropdown">
              <Button
                id="user-menu-button"
                aria-controls={open ? 'user-menu' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
              >
                <span style={{ color: 'white', textAlign: 'end' }}>Welcome, {username}</span>
              </Button>
              <Menu
                id="user-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <MenuItem onClick={handleClose}>
                  <Link to="/traineeProfile">Profile</Link>
                </MenuItem>
                <MenuItem onClick={onLogout}>Log Out</MenuItem>
              </Menu>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default LoginHeader;
