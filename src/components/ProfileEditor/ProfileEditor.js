import { useRef } from 'react';
import { Button, Grid, Container, TextField, useMediaQuery } from '@mui/material';
import { useNotification } from '../../hooks/useNotification';
import * as api from '../../api';
import styles from './OpenForm.module.css';
import { useSelector } from 'react-redux';

export const ProfileEditor = () => {
  const emailRef = useRef(null);
  const notification = useNotification();
  const isMobile = useMediaQuery('(max-width:600px)');
  const usernameRef = useRef(null);
  const descriptionRef = useRef(null);
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
      await api.register(data);
    } catch (err) {
      notification.warning(err.message);
    }
  };

  return (
    <Container component="main" className={styles.openForm} maxWidth="sm">
      <form className={styles.form} onSubmit={handleSubmit}>
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
            label="О себе"
            id="description"
            variant="outlined"
            type="text"
            inputRef={descriptionRef}
            required
            fullWidth
            autoFocus
          />
          {user.links.map(item => (
            <Container key={item} className={styles.competences}>
              <TextField
                className={styles.input}
                label="Название компетенции"
                id={item}
                variant="outlined"
                type="text"
                value={item}
                onChange={handleLinkChange}
                required
                fullWidth
                autoFocus
              />
              <Container disableGutters className={styles.selectWrapper}>
                <FormControl fullWidth>
                  <InputLabel id="select-label">Уровень</InputLabel>
                  <Select
                    className={styles.select}
                    labelId="level"
                    id={item.id}
                    name={item.id}
                    value={item.level.name}
                    label="Уровень"
                    spacing={2}
                    onChange={handleLevelSelect}>
                    <MenuItem value="Junior">Junior</MenuItem>
                    <MenuItem value="Middle">Middle</MenuItem>
                    <MenuItem value="Senior">Senior</MenuItem>
                  </Select>
                </FormControl>
              </Container>
              {isMobile ? (
                <Button
                  color="secondary"
                  variant="outlined"
                  startIcon={<Delete />}
                  fullWidth
                  onClick={() => handleRemoveCompetence(item.id)}>
                  Удалить
                </Button>
              ) : (
                <Tooltip title="Удалить">
                  <IconButton onClick={() => handleRemoveCompetence(item.id)}>
                    <Delete />
                  </IconButton>
                </Tooltip>
              )}
            </Container>
          ))}
        </Grid>
        <Grid container>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth={isMobile}
            className={styles.button}>
            Сохранить
          </Button>
        </Grid>
      </form>
    </Container>
  );
};
