import { SkillTokenEditor } from '../SkillTokenEditor/SkillTokenEditor';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { setSkillToken } from '../../store/reducers/skillToken/skillTokenReducer';
import { updateUserSkillToken } from '../../store/reducers/user/userSlice';
import { Container, Button, Typography } from '@mui/material';
import { Save } from '@mui/icons-material';
import styles from './SkillToken.module.css';

export const SkillToken = () => {
  const { tokenId } = useParams();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);
  const skillToken = useSelector(state => state.skillToken.token);
  const navigate = useNavigate();

  const handleSave = event => {
    event.preventDefault();
    dispatch(
      updateUserSkillToken({
        id: tokenId,
        token: skillToken
      })
    );
    navigate('/profile');
  };

  useEffect(() => {
    const userSkillToken = user.skillTokens.find(token => token.id === tokenId);
    dispatch(setSkillToken(userSkillToken));
  }, []);

  return (
    <Container component="main" maxWidth="md">
      <form onSubmit={handleSave}>
        <SkillTokenEditor />
        <Button
          className={styles.save}
          color="primary"
          variant="contained"
          startIcon={<Save />}
          type="submit">
          Сохранить
        </Button>
      </form>
    </Container>
  );
};
