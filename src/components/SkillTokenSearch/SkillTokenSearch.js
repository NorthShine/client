import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Grid,
  Paper,
  Container,
  TextField,
  useMediaQuery,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Stack,
  Typography
} from '@mui/material';
import { SignalCellular4Bar, SignalCellular3Bar, SignalCellular1Bar } from '@mui/icons-material';
import { useNotification } from '../../hooks/useNotification';
import * as api from '../../api';
import styles from './SkillTokenSearch.module.css';
import { FilterForm } from '../FilterForm/FilterForm';

export const SkillTokenSearch = () => {
  const notification = useNotification();
  const isMobile = useMediaQuery('(max-width:600px)');
  const [competence, setCompetence] = useState('');
  const [tags, setTags] = useState([]);
  const [skillTokens, setSkillTokens] = useState([]);

  // Array.from({ length: 20 }, () => ({
  //   name: 'Designer',
  //   id: '0',
  //   tags: ['HTML', 'CSS', 'Python'],
  //   competences: [
  //     {
  //       id: '6989724c-47a5-499a-aa61-2b6ec8c24af8',
  //       name: 'Figma',
  //       level: {
  //         name: 'Junior'
  //       }
  //     },
  //     {
  //       id: '6989724c-47a5-499a-aa61-2b6ec8c24af8',
  //       name: 'HTML',
  //       level: {
  //         name: 'Middle'
  //       }
  //     },
  //     {
  //       id: '4148d6fd-ac15-4251-907e-d05d21f5e488',
  //       name: 'CSS',
  //       level: {
  //         name: 'Senior'
  //       }
  //     }
  //   ]
  // }))

  useEffect(() => {
    api
      .fetchSkillTokens({
        tags,
        competence
      })
      .then(res => {
        setSkillTokens(res.data);
      })
      .catch(err => notification.error(err.message));
  }, [competence, tags]);

  const handleSubmit = async e => {
    e.preventDefault();
  };

  const levelIcons = {
    Junior: <SignalCellular1Bar className={styles.icon} />,
    Middle: <SignalCellular3Bar className={styles.icon} />,
    Senior: <SignalCellular4Bar className={styles.icon} />
  };

  return (
    <Container component="main" className={styles.search} maxWidth={false}>
      <Grid container spacing={3}>
        <Grid item xs={4} md={3}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <FilterForm />
            <Grid container>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Отправить
              </Button>
            </Grid>
          </form>
        </Grid>
        <Grid item xs={8} md={9}>
          <Grid container spacing={2}>
            {skillTokens.map(token => {
              return (
                <Grid key={token.id} item xs={6} lg={4}>
                  <Paper elevation={1}>
                    <Container className={styles.skills_wrapper}>
                      <Typography variant="h6">{token.name}</Typography>
                      <List>
                        {token.competences.slice(0, 5).map(item => {
                          return (
                            <ListItem
                              key={item.id}
                              secondaryAction={levelIcons[item.level.name]}
                              disablePadding>
                              <ListItemButton className={styles.list_item}>
                                <ListItemText primary={item.name} />
                              </ListItemButton>
                            </ListItem>
                          );
                        })}
                      </List>
                      <Stack direction="row" spacing={1}>
                        <Button variant="contained" color="primary" fullWidth>
                          Откликнуться
                        </Button>
                        <Button variant="outlined" color="primary" fullWidth>
                          Подробнее
                        </Button>
                      </Stack>
                    </Container>
                  </Paper>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};
