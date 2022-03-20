import {
  Button,
  Grid,
  Container,
  TextField,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  IconButton,
  Tooltip,
  useMediaQuery,
  Autocomplete,
  Chip
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeCompetenceName,
  setCompetenceLevel,
  addCompetence,
  removeCompetence,
  updateSkillTokenName,
  updateSkillTokenTags
} from '../../store/reducers/skillToken/skillTokenReducer';
import styles from './FilterForm.module.css';

export const FilterForm = () => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const { competences, name, tags } = useSelector(state => state.skillToken.token);
  const dispatch = useDispatch();

  return (
    <>
      <TextField
        className={styles.name}
        label="Название скилл-токена"
        variant="outlined"
        type="text"
        required
        fullWidth
        autoFocus
      />
      <TextField
        className={styles.name}
        label="Название компетенции"
        variant="outlined"
        type="text"
        fullWidth
        autoFocus
      />
      <Autocomplete
        multiple
        id="tags-filled"
        freeSolo
        options={[]}
        value={tags}
        onChange={(event, value) => {
          dispatch(updateSkillTokenTags(value));
        }}
        renderTags={(value, getTagProps) => {
          return value.map((option, index) => (
            <Chip variant="outlined" label={option} {...getTagProps({ index })} />
          ));
        }}
        renderInput={params => (
          <TextField {...params} variant="outlined" label="Теги" placeholder="Добавьте теги" />
        )}
      />
    </>
  );
};
