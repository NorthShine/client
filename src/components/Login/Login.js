import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Grid, Typography, Container, Tab, Box } from '@mui/material';
import { TabContext, TabList } from '@mui/lab';
import TextField from '@mui/material/TextField';
import { useNotification } from '../../hooks/useNotification';
import { useAuth } from '../../hooks/useAuth';
import * as api from '../../api';
import styles from './Login.module.css';

export const Login = () => {
  const navigate = useNavigate();
  const { isAuth } = useAuth();
  const emailRef = useRef(null);
  const [role, setRole] = useState('1');
  const notification = useNotification();

  const handleRoleChange = (event, value) => {
    setRole(value);
  };

  useEffect(() => {
    if (isAuth) navigate('/');
    // eslint-disable-next-line
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const data = {
        email: emailRef.current.value,
        role
      };
      await api.signin(data);
    } catch (err) {
      notification.warning(err.message);
    }
  };

  return (
    <Container component="main" className={styles.loginBox} maxWidth="xs">
      <Typography variant="h5" className={styles.tittle}>Вход / Регистрация </Typography>
      <form className={styles.form} onSubmit={handleSubmit}>
        <TabContext value={value}>
          <Box>
            <TabList
              className={styles.tabs}
              onChange={handleRoleChange}
              aria-label="lab API tabs example">
              <Tab label="Специалист" value="1" />
              <Tab label="Заказчик" value="2" />
            </TabList>
          </Box>
        </TabContext>
        <Grid container>
          <TextField
            className={styles.input}
            label="Email - адрес"
            id="email"
            variant="outlined"
            type="email"
            inputRef={emailRef}
            fullWidth
            autoFocus
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={styles.submit}>
            Sign in
          </Button>
        </Grid>
      </form>
    </Container>
  );
};
