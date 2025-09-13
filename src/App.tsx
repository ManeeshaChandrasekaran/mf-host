import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Provider } from 'react-redux';
import { loadRemoteComponent } from "./remoteLoader";
import ErrorBoundary from './components/ErrorBoundary';
import { store } from './store';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  ThemeProvider,
  createTheme,
  CssBaseline
} from '@mui/material';
import { 
  Login as LoginIcon, 
  Person as PersonIcon, 
  Event as EventIcon, 
  Add as AddIcon, 
  Assessment as AssessmentIcon 
} from '@mui/icons-material';

// Create Material-UI theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#667eea',
      light: '#9bb5ff',
      dark: '#4c63d2',
    },
    secondary: {
      main: '#764ba2',
      light: '#a574c4',
      dark: '#5a3570',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    h6: {
      fontWeight: 700,
    },
  },
  shape: {
    borderRadius: 8,
  },
});

// Lazy-load microfrontend components
const Login = React.lazy(() => loadRemoteComponent("auth_app", "./Login"));
const UserProfile = React.lazy(() => loadRemoteComponent("auth_app", "./UserProfile"));
const BookingList = React.lazy(() => loadRemoteComponent("booking_app", "./BookingList"));
const BookingForm = React.lazy(() => loadRemoteComponent("booking_app", "./BookingForm"));
const ReportDashboard = React.lazy(() => loadRemoteComponent("reporting_app", "./ReportDashboard"));

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Box sx={{ flexGrow: 1 }}>
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
                
                <Button 
                  color="inherit" 
                  component={Link} 
                  to="/reports"
                  startIcon={<AssessmentIcon />}
                  sx={{ mx: 1 }}
                >
                  Reports
                </Button>
              </Toolbar>
            </AppBar>
            
            <Container maxWidth="lg" sx={{ mt: 3, mb: 3 }}>
              <ErrorBoundary>
                <Suspense fallback={
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
                    <Typography variant="h6" color="text.secondary">
                      Loading module...
                    </Typography>
                  </Box>
                }>
                  <Routes>
                    {/* Auth routes */}
                    <Route path="/auth/login" element={<Login />} />
                    <Route path="/auth/profile" element={<UserProfile />} />

                    {/* Booking routes */}
                    <Route path="/booking/list" element={<BookingList />} />
                    <Route path="/booking/new" element={<BookingForm />} />

                    {/* Reporting routes */}
                    <Route path="/reports" element={<ReportDashboard />} />

                    {/* Default route */}
                    <Route path="*" element={
                      <Box sx={{ textAlign: 'center', mt: 4 }}>
                        <Typography variant="h4" gutterBottom>
                          Welcome to the Host App
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                          Select a navigation item above to get started.
                        </Typography>
                      </Box>
                    } />
                  </Routes>
                </Suspense>
              </ErrorBoundary>
            </Container>
          </Box>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

