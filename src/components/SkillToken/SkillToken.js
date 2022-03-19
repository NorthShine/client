import { SkillTokenEditor } from '../SkillTokenEditor/SkillTokenEditor';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setSkillToken } from '../../store/reducers/skillToken/skillTokenReducer';
import { updateUserSkillToken } from '../../store/reducers/user/userSlice';
import { Container, Button } from '@mui/material';
import { Save } from '@mui/icons-material';

export const SkillToken = () => {
  const { tokenId } = useParams();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);
  const skillToken = useSelector(state => state.skillToken.token);

  const handleSave = () => {
    dispatch(
      updateUserSkillToken({
        id: tokenId,
        token: skillToken
      })
    );
  };

  useEffect(() => {
    const userSkillToken = user.skillTokens.find(token => token.id === tokenId);
    dispatch(setSkillToken(userSkillToken));
  }, []);

  return (
    <Container>
      <SkillTokenEditor />
      <Button
        color="primary"
        variant="contained"
        startIcon={<Save />}
        fullWidth
        onClick={handleSave}>
        Сохранить
      </Button>
    </Container>
  );
};
