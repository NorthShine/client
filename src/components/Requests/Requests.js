import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Grid, Typography, Container, Tab, Box, TextField } from '@mui/material';
import { TabContext, TabList } from '@mui/lab';
import { useNotification } from '../../hooks/useNotification';
import { useAuth } from '../../hooks/useAuth';
import * as api from '../../api';
import styles from './Requests.module.css';
import { useDispatch } from 'react-redux';
import { getUserAction } from '../../store/reducers/user/actionCreators';

export const Requests = () => {
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const [feedType, setFeedType] = useState('incoming');
  const notification = useNotification();

  const handleFeedtypeChange = (event, value) => {
    setFeedType(value);
  };

  return (
    <Container component="main" className={styles.loginBox} maxWidth="xs">
      <Typography variant="h5" className={styles.title}>
        Вход / Регистрация
      </Typography>
      <TabContext value={feedType}>
        <Box>
          <TabList
            className={styles.tabs}
            onChange={handleFeedtypeChange}
            aria-label="lab API tabs example">
            <Tab label="Входящие" value="incoming" />
            <Tab label="Исходящие" value="outcoming" />
          </TabList>
        </Box>
      </TabContext>
    </Container>
  );
};
