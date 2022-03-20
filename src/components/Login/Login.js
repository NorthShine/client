import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Grid, Typography, Container, Tab, Box, TextField } from '@mui/material';
import { TabContext, TabList } from '@mui/lab';
import { useNotification } from '../../hooks/useNotification';
import { useAuth } from '../../hooks/useAuth';
import * as api from '../../api';
import styles from './Login.module.css';
import { useDispatch } from 'react-redux';
import { getUserAction } from '../../store/reducers/user/actionCreators';

export const Login = () => {
  const navigate = useNavigate();
  const { setAuth, isAuth } = useAuth();
  const emailRef = useRef(null);
  const [role, setRole] = useState('EMPLOYEE');
  const notification = useNotification();
  const dispatch = useDispatch();

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
      await api.register(data);
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(getUserAction({ email: emailRef.current.value }))
        .unwrap()
        .then(() => {
          setAuth(true);
        })
        .catch(err => {
          notification.error(err.message);
          setAuth(false);
        })
        .finally(() => navigate('/profile'));
    }
  };

  return (
    <Container component="main" className={styles.loginBox} maxWidth="xs">
      <Typography variant="h5" className={styles.title}>
        Вход / Регистрация
      </Typography>
      <form className={styles.form} onSubmit={handleSubmit}>
        <TabContext value={role}>
          <Box>
            <TabList
              className={styles.tabs}
              onChange={handleRoleChange}
              aria-label="lab API tabs example">
              <Tab label="Специалист" value="EMPLOYEE" />
              <Tab label="Заказчик" value="EMPLOYER" />
            </TabList>
          </Box>
        </TabContext>
        <Grid container>
          <TextField
            className={styles.input}
            label="E-mail адрес"
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
            Вход
          </Button>
        </Grid>
      </form>
    </Container>
  );
};
