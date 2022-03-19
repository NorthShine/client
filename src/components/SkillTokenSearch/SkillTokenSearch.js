import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Grid, Typography, Container, TextField, useMediaQuery } from '@mui/material';
import { useNotification } from '../../hooks/useNotification';
import * as api from '../../api';
import styles from './SkillTokenSearch.module.css';
import { SkillTokenEditor } from '../SkillTokenEditor/SkillTokenEditor';
import { useSelector } from 'react-redux';

export const SkillTokenSearch = () => {
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const notification = useNotification();
  const isMobile = useMediaQuery('(max-width:600px)');
  const usernameRef = useRef(null);
  const { competences } = useSelector(state => state.skillToken.token);

  const handleSubmit = async e => {
    e.preventDefault();
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
          <Button type="submit" variant="contained" color="primary" fullWidth={isMobile}>
            Отправить
          </Button>
        </Grid>
      </form>
    </Container>
  );
};
