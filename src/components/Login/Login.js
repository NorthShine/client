import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Grid, Typography, Container } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useNotification } from '../../hooks/useNotification';
import { useAuth } from '../../hooks/useAuth';
import { PasswordInput } from '../PasswordInput/PasswordInput';
import styles from './Login.module.css';

export const Login = () => {
  const navigate = useNavigate();
  const { setAuth, isAuth } = useAuth();
  const [email, setEmail] = useState({
    name: 'email',
    inputRef: useRef(null),
    value: '',
    checked: false,
    exists: false
  });
  const [password, setPassword] = useState({
    name: 'password',
    inputRef: useRef(null),
    error: false
  });
  const [passwordRepeat, setPasswordRepeat] = useState({
    name: 'password_repeat',
    inputRef: useRef(null),
    error: false
  });

  useEffect(() => {
    if (isAuth) navigate('/');
    // eslint-disable-next-line
  }, []);

  const getValue = input => input.inputRef.current?.value ?? '';

  const handleSubmit = async e => {
    e.preventDefault();
    // signin logic
  };

  const handleChange = () => {
    const isEqual =
      (password.error || passwordRepeat.error) && getValue(password) === getValue(passwordRepeat);
    const passwordErrorCallback = prev => ({ ...prev, error: isEqual });
    setPassword(passwordErrorCallback);
    setPasswordRepeat(passwordErrorCallback);
  };

  return (
    <Container component="main" className={styles.loginBox} maxWidth="xs">
      <Typography variant="h5">Signup / Login</Typography>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Grid container>
          <TextField
            label="Email Address"
            id={email.name}
            className={styles.input}
            variant="outlined"
            type="email"
            inputRef={email.inputRef}
            onChange={handleChange}
            fullWidth
            autoFocus
          />
          <PasswordInput onChange={handleChange} {...password} />
          {email.checked && !email.exists && (
            <PasswordInput onChange={handleChange} {...passwordRepeat} />
          )}
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
