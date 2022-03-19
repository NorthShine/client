import { SkillTokenEditor } from '../SkillTokenEditor/SkillTokenEditor';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

export const SkillToken = () => {
  const { tokenId } = useParams();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  useEffect(() => {
    dispatch(setSkillToken(user.skillTokens));
  }, []);

  return <SkillTokenEditor />;
};
