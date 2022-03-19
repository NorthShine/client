import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Grid,
  Typography,
  Container,
  TextField,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  IconButton,
  Tooltip,
  useMediaQuery
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useNotification } from '../../hooks/useNotification';
import * as api from '../../api';
import { v4 as uuid } from 'uuid';
import styles from './OpenForm.module.css';

const createCompetence = () => ({
  id: uuid(),
  name: '',
  level: 'junior',
  access: ''
});

export const OpenForm = () => {
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const notification = useNotification();
  const isMobile = useMediaQuery('(max-width:600px)');
  const [competences, setCompetences] = useState([createCompetence()]);
  const usernameRef = useRef(null);

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
      await api.signin(data);
    } catch (err) {
      notification.warning(err.message);
    }
  };

  const handleCompetencyNameChange = event => {
    setCompetences(items => {
      return items.map(item => {
        if (item.id === event.target.id) {
          item.name = event.target.value;
        }
        return item;
      });
    });
  };

  const handleLevelSelect = event => {
    setCompetences(items => {
      return items.map(item => {
        if (item.id === event.target.name) {
          item.level = event.target.value;
        }
        return item;
      });
    });
  };

  const addCompetence = () => {
    setCompetences(items => {
      items.push(createCompetence());
      return [...items];
    });
  };

  const removeCompetence = id => {
    if (competences.length > 1)
      setCompetences(items => {
        const newCompetences = items.filter(item => item.id !== id);
        return [...newCompetences];
      });
  };

  return (
    <Container component="main" className={styles.openForm} maxWidth="sm">
      <Typography variant="h5" className={styles.title}>
        Компетенции
      </Typography>
      <form className={styles.form} onSubmit={handleSubmit}>
        {competences.map(item => {
          return (
            <Container key={item.id} className={styles.competences}>
              <TextField
                className={styles.input}
                label="Название компетенции"
                id={item.id}
                variant="outlined"
                type="text"
                onChange={handleCompetencyNameChange}
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
                    value={item.level}
                    label="Уровень"
                    onChange={handleLevelSelect}>
                    <MenuItem value="junior">Junior</MenuItem>
                    <MenuItem value="middle">Middle</MenuItem>
                    <MenuItem value="senior">Senior</MenuItem>
                  </Select>
                </FormControl>
              </Container>
              {isMobile ? (
                <Button
                  color="secondary"
                  variant="outlined"
                  startIcon={<Delete />}
                  fullWidth
                  onClick={() => removeCompetence(item.id)}>
                  Удалить
                </Button>
              ) : (
                <Tooltip title="Удалить">
                  <IconButton onClick={() => removeCompetence(item.id)}>
                    <Delete />
                  </IconButton>
                </Tooltip>
              )}
            </Container>
          );
        })}
        <Grid container>
          <Button
            variant="outlined"
            color="primary"
            fullWidth={isMobile}
            className={styles.button}
            onClick={addCompetence}>
            Добавить компетенцию
          </Button>
        </Grid>
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
