import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Box, Typography, Alert } from '@mui/material';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'user' | 'admin';
  fallback?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole = 'user',
  fallback 
}) => {
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const userRole = useSelector((state: RootState) => state.user.role);

  // If user is not logged in
  if (!isLoggedIn) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Alert severity="warning" sx={{ mb: 2 }}>
          Please log in to access this page.
        </Alert>
      </Box>
    );
  }

  // If user doesn't have the required role
  if (requiredRole === 'admin' && userRole !== 'admin') {
    return fallback || (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          Access Denied: Admin privileges required.
        </Alert>
        <Typography variant="body1" color="text.secondary">
          You need administrator access to view this page.
        </Typography>
      </Box>
    );
  }

  // If user has required role or no specific role required
  return <>{children}</>;
};

export default ProtectedRoute;
