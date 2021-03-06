import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../Navbar/Navbar';
import { Container } from '@mui/material';

export const AppLayout = () => {
  return (
    <Container maxWidth={false} sx={{ height: '100%' }} disableGutters>
      <Navbar />
      <Outlet />
    </Container>
  );
};
