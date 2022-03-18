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
  MenuItem,
  IconButton,
  Tooltip,
  useMediaQuery
} from '@mui/material';
import { Delete } from '@mui/icons-material';
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
  const isMobile = useMediaQuery('(max-width:600px)');
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
        if (item.id === +event.target.name) {
          item.level = event.target.value;
        }
        return item;
      });
    });
  };

  const addCompetence = () => {
    setCompetences(items => {
      const newCompetence = {
        id: items.length,
        name: '',
        level: 'junior',
        access: ''
      };
      items.push(newCompetence);
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
          const id = String(item.id);
          return (
            <Container key={id} className={styles.competences}>
              <TextField
                className={styles.input}
                label="Название компетенции"
                id={id}
                variant="outlined"
                type="email"
                onChange={handleCompetencyNameChange}
                fullWidth
                autoFocus
              />
              <Container disableGutters className={styles.selectWrapper}>
                <FormControl fullWidth>
                  <InputLabel id="select-label">Уровень</InputLabel>
                  <Select
                    className={styles.select}
                    labelId="level"
                    id={id}
                    name={id}
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
            className={styles.add_competence}
            onClick={addCompetence}>
            Добавить компетенцию
          </Button>
        </Grid>
      </form>
    </Container>
  );
};
