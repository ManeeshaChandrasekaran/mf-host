import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../store';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
} from '@mui/material';
import { 
  Login as LoginIcon, 
  Person as PersonIcon, 
  Event as EventIcon, 
  Add as AddIcon, 
  Assessment as AssessmentIcon 
} from '@mui/icons-material';

const NavigationBar: React.FC = () => {
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const userRole = useSelector((state: RootState) => state.user.role);

  return (
    <AppBar position="static" elevation={3}>
      <Toolbar>
        <Typography 
          variant="h6" 
          component={Link} 
          to="/" 
          sx={{ 
            flexGrow: 1, 
            textDecoration: 'none', 
            color: 'inherit',
            '&:hover': {
              opacity: 0.8
            }
          }}
        >
          MicroFrontend App
        </Typography>
        
        <Button 
          color="inherit" 
          component={Link} 
          to="/auth/login"
          startIcon={<LoginIcon />}
          sx={{ mx: 1 }}
        >
          Login
        </Button>
        
        <Button 
          color="inherit" 
          component={Link} 
          to="/auth/profile"
          startIcon={<PersonIcon />}
          sx={{ mx: 1 }}
        >
          Profile
        </Button>
        
        <Button 
          color="inherit" 
          component={Link} 
          to="/booking/list"
          startIcon={<EventIcon />}
          sx={{ mx: 1 }}
        >
          Bookings
        </Button>
        
        <Button 
          color="inherit" 
          component={Link} 
          to="/booking/new"
          startIcon={<AddIcon />}
          sx={{ mx: 1 }}
        >
          New Booking
        </Button>
        
        {/* Only show Reports button for admin users */}
        {isLoggedIn && userRole === 'admin' && (
          <Button 
            color="inherit" 
            component={Link} 
            to="/reports"
            startIcon={<AssessmentIcon />}
            sx={{ mx: 1 }}
          >
            Reports
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
