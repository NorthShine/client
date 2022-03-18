import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Grid, Typography, Container, Tabs, Tab, Box } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import TextField from '@mui/material/TextField';
import { useNotification } from '../../hooks/useNotification';
import { useAuth } from '../../hooks/useAuth';
import styles from './Login.module.css';

export const Login = () => {
  const navigate = useNavigate();
  const { setAuth, isAuth } = useAuth();
  const emailRef = useRef(null);
  const [value, setValue] = useState('1');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (isAuth) navigate('/');
    // eslint-disable-next-line
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    // signin logic
  };

  return (
    <Container component="main" className={styles.loginBox} maxWidth="xs">
      <Typography variant="h5">Войти</Typography>
      <form className={styles.form} onSubmit={handleSubmit}>
        <TabContext value={value}>
          <Box>
            <TabList
              className={styles.tabs}
              onChange={handleChange}
              aria-label="lab API tabs example">
              <Tab label="Специалист" value="1" />
              <Tab label="Заказчик" value="2" />
            </TabList>
          </Box>
        </TabContext>
        <Grid container>
          <TextField
            className={styles.input}
            label="Email Address"
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
