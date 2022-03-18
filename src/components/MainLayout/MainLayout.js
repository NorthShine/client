import React from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from '@mui/material';
import styles from './MainLayout.module.css';

export const MainLayout = () => {
  return (
    <Container maxWidth={false} className={styles.root} disableGutters>
      <Outlet />
    </Container>
  );
};
