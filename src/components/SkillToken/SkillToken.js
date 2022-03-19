import { SkillTokenEditor } from '../SkillTokenEditor/SkillTokenEditor';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setSkillToken } from '../../store/reducers/skillToken/skillTokenReducer';

export const SkillToken = () => {
  const { tokenId } = useParams();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);

  useEffect(() => {
    const skillToken = user.skillTokens.find(token => token.id === tokenId);
    dispatch(setSkillToken(skillToken));
  }, []);

  return <SkillTokenEditor />;
};
