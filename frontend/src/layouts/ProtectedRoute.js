import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function PublicRoute({ children }) {
  const { token } = useAuth();
  return !token
    ? children
    : <Navigate to="/" replace />;
}
