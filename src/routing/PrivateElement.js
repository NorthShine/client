import React from 'react';
import { Navigate } from 'react-router-dom';
import { Loader } from '../components/Loader/Loader';
import { useAuth } from '../hooks/useAuth';

export const PrivateElement = ({ element }) => {
  const { isAuth, status } = useAuth();

  return isAuth ? element : status === 'ready' ? <Navigate to={'/login'} replace /> : <Loader />;
};
