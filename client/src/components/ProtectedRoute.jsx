import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useContext(AuthContext);

  // console.log('ProtectedRoute State:', { isAuthenticated, loading });

  if (loading) {
    return <div className="text-white text-center mt-20">Loading...</div>; // Spinner can be added here
  }

  if (!isAuthenticated) {
    // console.log('ProtectedRoute: Not authenticated, redirecting...');
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
