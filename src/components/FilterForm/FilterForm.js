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

export const FilterForm = ({ name, setName, tags }) => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const dispatch = useDispatch();

  const handleChange = event => {
    setName(event.target.value);
  };

  return (
    <>
      <TextField
        className={styles.name}
        label="Название скилл-токена"
        variant="outlined"
        type="text"
        value={name}
        onChange={handleChange}
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
      <Autocomplete className={styles.tags__custom}
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
