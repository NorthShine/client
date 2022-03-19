import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export const EmployeeElement = ({ element }) => {
  const user = useSelector(state => state.user.user);

  return user.role === 'EMPLOYEE' ? element : <Navigate to={'/home'} replace />;
};
