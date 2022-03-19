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
  useMediaQuery
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeCompetenceName,
  setCompetenceLevel,
  addCompetence,
  removeCompetence,
  updateSkillTokenName,
  updateSkillTokenDescription
} from '../../store/reducers/skillToken/skillTokenReducer';
import styles from './SkillTokenEditor.module.css';

export const SkillTokenEditor = () => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const { competences, name, description } = useSelector(state => state.skillToken.token);
  const dispatch = useDispatch();

  const handleCompetencyNameChange = event => {
    const { id, value } = event.target;
    dispatch(changeCompetenceName({ id, value }));
  };

  const handleLevelSelect = event => {
    const { name, value } = event.target;
    dispatch(setCompetenceLevel({ name, value }));
  };

  const handleAddCompetence = () => {
    dispatch(addCompetence());
  };

  const handleRemoveCompetence = id => {
    dispatch(removeCompetence({ id }));
  };

  const handleTokenNameChange = event => {
    dispatch(updateSkillTokenName({ value: event.target.value }));
  };

  return (
    <>
      <TextField
        className={styles.competences2}
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
      {competences.map(item => {
        return (
          <Container key={item.id} className={styles.competences}>
            <TextField
              className={styles.input}
              label="Название компетенции"
              id={item.id}
              variant="outlined"
              type="text"
              value={item.name}
              onChange={handleCompetencyNameChange}
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
      <Grid container>
        <Button
          variant="outlined"
          color="primary"
          fullWidth={isMobile}
          className={styles.button}
          onClick={handleAddCompetence}>
          Добавить компетенцию
        </Button>
      </Grid>
    </>
  );
};
