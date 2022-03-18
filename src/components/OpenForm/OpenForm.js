import { useState, useRef, useEffect } from 'react';
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
  MenuItem
} from '@mui/material';
import { useNotification } from '../../hooks/useNotification';
import { useAuth } from '../../hooks/useAuth';
import * as api from '../../api';
import styles from './OpenForm.module.css';

export const OpenForm = () => {
  const navigate = useNavigate();
  const { isAuth } = useAuth();
  const emailRef = useRef(null);
  const [role, setRole] = useState('employee');
  const notification = useNotification();
  const [competences, setCompetences] = useState([
    {
      id: 0,
      name: '',
      level: 'junior',
      access: ''
    }
  ]);

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

  const handleCompetencyNameChange = event => {
    setCompetences(items => {
      return items.map(item => {
        if (item.id === +event.target.id) {
          item.name = event.target.value;
        }
        return item;
      });
    });
  };

  const handleLevelSelect = event => {
    setCompetences(items => {
      return items.map(item => {
        console.log(item.id === +event.target.name);
        if (item.id === +event.target.name) {
          item.level = event.target.value;
        }
        return item;
      });
    });
  };

  return (
    <Container component="main" className={styles.openForm} maxWidth="sm">
      <Typography variant="h5" className={styles.title}>
        Вход / Регистрация
      </Typography>
      <form className={styles.form} onSubmit={handleSubmit}>
        {competences.map(item => {
          return (
            <Container key={item.id} className={styles.competences}>
              <TextField
                className={styles.input}
                label="Название компетенции"
                id={String(item.id)}
                variant="outlined"
                type="email"
                onChange={handleCompetencyNameChange}
                fullWidth
                autoFocus
              />
              <FormControl>
                <InputLabel id="select-label">Уровень</InputLabel>
                <Select className={styles.select__lvl}
                  labelId="level"
                  id={String(item.id)}
                  name={String(item.id)}
                  value={item.level}
                  label="Уровень"
                  onChange={handleLevelSelect}>
                  <MenuItem value="junior">Junior</MenuItem>
                  <MenuItem value="middle">Middle</MenuItem>
                  <MenuItem value="senior">Senior</MenuItem>
                </Select>
              </FormControl>
            </Container>
          );
        })}
        <Grid container>
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
