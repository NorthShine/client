import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export const EmployerElement = ({ element }) => {
  const user = useSelector(state => state.user.user);

  return user.role === 'EMPLOYER' ? element : <Navigate to={'/home'} replace />;
};
