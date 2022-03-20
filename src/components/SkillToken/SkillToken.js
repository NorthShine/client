import { SkillTokenEditor } from '../SkillTokenEditor/SkillTokenEditor';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { setSkillToken } from '../../store/reducers/skillToken/skillTokenReducer';
import { updateUserSkillToken } from '../../store/reducers/user/userSlice';
import { Container, Button, useMediaQuery } from '@mui/material';
import { Save } from '@mui/icons-material';
import styles from './SkillToken.module.css';

export const SkillToken = () => {
  const { tokenId } = useParams();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);
  const skillToken = useSelector(state => state.skillToken.token);
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:600px)');

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
    const userSkillToken = user.skilltokens.find(token => token.id === tokenId);
    if (userSkillToken) dispatch(setSkillToken(userSkillToken));
  }, []);

  return (
    <Container className={styles.root} component="main" maxWidth="md">
      <form className={styles.form} onSubmit={handleSave}>
        <SkillTokenEditor />
        <Button
          className={styles.save}
          color="primary"
          variant="contained"
          startIcon={<Save />}
          fullWidth={isMobile}
          type="submit">
          Сохранить
        </Button>
      </form>
    </Container>
  );
};
