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
import styles from './SkillTokenEditor.module.css';
import * as api from '../../api';
import { createCompetence } from '../../utils';

export const SkillTokenEditor = () => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const { competencies, name, tags } = useSelector(state => state.skillToken.token);
  const dispatch = useDispatch();

  const handleCompetenceNameChange = event => {
    const { id, value } = event.target;
    dispatch(changeCompetenceName({ id, value }));
  };

  const handleLevelSelect = event => {
    const { name, value } = event.target;
    dispatch(setCompetenceLevel({ name, value }));
  };

  const handleAddCompetence = async () => {
    try {
      const competence = createCompetence();
      // await api.addCompetence(competence);
      dispatch(addCompetence(competence));
    } catch (err) {
      console.log(err);
    }
  };

  const handleRemoveCompetence = id => {
    dispatch(removeCompetence({ id }));
  };

  const handleTokenNameChange = event => {
    dispatch(updateSkillTokenName({ value: event.target.value }));
  };

  return (
    <>
      <Container className={styles.competencies}>
        <TextField
          className={styles.name}
          label="Название скилл-токена"
          id={name}
          variant="outlined"
          type="text"
          value={name}
          onChange={handleTokenNameChange}
          required
          fullWidth
          autoFocus
        />
        <Container disableGutters className={styles.selectWrapper}>
          <FormControl fullWidth className={styles.work__experience}>
            <InputLabel id="select-label">Опыт работы</InputLabel>
            <Select
              className={styles.select}
              labelId="experience"
              label="Опыт работы"
              spacing={2}
              onChange={handleLevelSelect}>
              <MenuItem value="Without_experience">Без опыта</MenuItem>
              <MenuItem value="1year">1 год</MenuItem>
              <MenuItem value="2years">2 года</MenuItem>
              <MenuItem value="3years">3 года</MenuItem>
              <MenuItem value="4years">4 года</MenuItem>
              <MenuItem value="5years">5 лет</MenuItem>
              <MenuItem value="10years">10 лет</MenuItem>
              <MenuItem value="20years">20 лет и более</MenuItem>
            </Select>
          </FormControl>
        </Container>
      </Container>
      {competencies.map(item => {
        return (
          <Container key={item.id} className={styles.competencies}>
            <TextField
              className={styles.input}
              label="Название компетенции"
              variant="outlined"
              type="text"
              value={item.name}
              id={item.id}
              onChange={handleCompetenceNameChange}
              required
              fullWidth
              autoFocus
            />

            <Container disableGutters className={styles.selectWrapper}>
              <FormControl fullWidth>
                <InputLabel id="select-label">Уровень</InputLabel>
                <Select
                  className={styles.select}
                  labelId="level"
                  id={item.id}
                  name={item.id}
                  value={item.level.name}
                  label="Уровень"
                  spacing={2}
                  onChange={handleLevelSelect}>
                  <MenuItem value="Junior">Junior</MenuItem>
                  <MenuItem value="Middle">Middle</MenuItem>
                  <MenuItem value="Senior">Senior</MenuItem>
                </Select>
              </FormControl>
            </Container>
            {isMobile ? (
              <Button
                color="secondary"
                variant="outlined"
                startIcon={<Delete />}
                fullWidth
                onClick={() => handleRemoveCompetence(item.id)}>
                Удалить
              </Button>
            ) : (
              <Tooltip title="Удалить">
                <IconButton onClick={() => handleRemoveCompetence(item.id)}>
                  <Delete />
                </IconButton>
              </Tooltip>
            )}
          </Container>
        );
      })}
      <Grid container className={styles.addCompetence_wrapper}>
        <Button
          variant="outlined"
          color="primary"
          fullWidth={isMobile}
          className={styles.button}
          onClick={handleAddCompetence}>
          Добавить компетенцию
        </Button>
      </Grid>
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
