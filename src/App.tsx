import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import { loadRemoteComponent } from "./remoteLoader";
import ErrorBoundary from './components/ErrorBoundary';
import ProtectedRoute from './components/ProtectedRoute';
import NavigationBar from './components/NavigationBar';
import { store } from './store';
import {
  Container,
  Box,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Typography
} from '@mui/material';

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
            <NavigationBar />
            
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

                    {/* Reporting routes - Admin only */}
                    <Route 
                      path="/reports" 
                      element={
                        <ProtectedRoute requiredRole="admin">
                          <ReportDashboard />
                        </ProtectedRoute>
                      } 
                    />

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

