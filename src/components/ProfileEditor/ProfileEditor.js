import {
  Button,
  Grid,
  Container,
  TextField,
  useMediaQuery,
  Tooltip,
  IconButton,
  Typography
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useNotification } from '../../hooks/useNotification';
import * as api from '../../api';
import styles from './ProfileEditor.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateUserLink,
  addUserLink,
  removeUserLink,
  updateUserName,
  updateUserDescription
} from '../../store/reducers/user/userSlice';
import { useNavigate } from 'react-router-dom';

export const ProfileEditor = () => {
  const dispatch = useDispatch();
  const isMobile = useMediaQuery('(max-width:600px)');
  const navigate = useNavigate();
  const user = useSelector(state => state.user.user);

  const handleSubmit = async e => {
    e.preventDefault();
    navigate('/profile');
  };

  const handleUpdateLink = event => {
    const { id, value } = event.target;
    dispatch(updateUserLink({ id, value }));
  };

  const handleRemoveLink = id => {
    dispatch(removeUserLink({ id }));
  };

  const handleAddLink = () => {
    dispatch(addUserLink());
  };

  const handleUpdateUsername = event => {
    dispatch(updateUserName({ value: event.target.value }));
  };

  const handleUpdateDescription = event => {
    dispatch(updateUserDescription({ value: event.target.value }));
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
            value={user.name}
            onChange={handleUpdateUsername}
            required
            fullWidth
            autoFocus
          />
          <TextField
            className={styles.userinfo_input}
            onChange={handleUpdateDescription}
            label="О себе"
            id="about"
            variant="outlined"
            type="text"
            value={user.about}
            required
            fullWidth
            autoFocus
            multiline
          />
          <Typography className={styles.typography__link} variant="h6">Ссылки</Typography>
          {user.links.map(item => (
            <Container key={item.id} className={styles.competencies}>
              <TextField
                className={styles.input}
                label="Название компетенции"
                id={item.id}
                variant="outlined"
                type="text"
                value={item.value}
                onChange={handleUpdateLink}
                required
                fullWidth
                autoFocus
              />
              {isMobile ? (
                <Button
                  color="secondary"
                  variant="outlined"
                  startIcon={<Delete />}
                  fullWidth
                  onClick={() => handleRemoveLink(item.id)}>
                  Удалить
                </Button>
              ) : (
                <Tooltip title="Удалить">
                  <IconButton onClick={() => handleRemoveLink(item.id)}>
                    <Delete />
                  </IconButton>
                </Tooltip>
              )}
            </Container>
          ))}
          <Grid container>
            <Button
              variant="outlined"
              color="primary"
              fullWidth={isMobile}
              className={styles.button}
              onClick={handleAddLink}>
              Добавить ссылку
            </Button>
          </Grid>
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
