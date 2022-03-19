import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Grid, Typography, Container, TextField, useMediaQuery } from '@mui/material';
import { useNotification } from '../../hooks/useNotification';
import * as api from '../../api';
import styles from './OpenForm.module.css';
import { SkillTokenEditor } from '../SkillTokenEditor/SkillTokenEditor';
import { useSelector } from 'react-redux';

export const OpenForm = () => {
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const notification = useNotification();
  const isMobile = useMediaQuery('(max-width:600px)');
  const usernameRef = useRef(null);
  const { competences } = useSelector(state => state.skillToken.token);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const data = {
        username: usernameRef.current.value,
        email: emailRef.current.value,
        role: 'employee',
        competences
      };
      console.log(data);
      await api.register(data);
    } catch (err) {
      notification.warning(err.message);
    }
  };

  return (
    <Container component="main" className={styles.openForm} maxWidth="sm">
      <Typography variant="h5" className={styles.title}>
        Компетенции
      </Typography>
      <form className={styles.form} onSubmit={handleSubmit}>
        <SkillTokenEditor />
        <Grid container className={styles.userinfo_wrapper}>
          <TextField
            className={styles.userinfo_input}
            label="Имя пользователя"
            id="username"
            variant="outlined"
            type="text"
            inputRef={usernameRef}
            required
            fullWidth
            autoFocus
          />
          <TextField
            className={styles.userinfo_input}
            label="E-mail адрес"
            id="email"
            variant="outlined"
            type="email"
            inputRef={emailRef}
            required
            fullWidth
            autoFocus
          />
        </Grid>
        <Grid container>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth={isMobile}
            className={styles.button}>
            Отправить
          </Button>
        </Grid>
      </form>
    </Container>
  );
};
