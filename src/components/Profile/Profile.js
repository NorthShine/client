import {
  Container,
  Typography,
  Card,
  Stack,
  Tooltip,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  useMediaQuery,
  List,
  ListItem,
  ListItemIcon,
  ListItemButton,
  ListItemText
} from '@mui/material';
import { Edit, ExpandMore, CheckCircle, Link as LinkIcon, Delete, Add } from '@mui/icons-material';
import styles from './Profile.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { addUserSkillToken, removeUserSkillToken } from '../../store/reducers/user/userSlice';

export const Profile = () => {
  const user = useSelector(state => state.user.user);
  const isMobile = useMediaQuery('(max-width:600px)');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddSkillToken = () => {
    dispatch(addUserSkillToken());
  };

  const handleRemoveSkillToken = id => {
    dispatch(removeUserSkillToken(id));
  };

  return (
    <Container className={styles.root} component="main" maxWidth="md">
      <Container className={styles.wrapper}>
        <img src={user.avatar} />
      </Container>
      <Container className={styles.wrapper}>
        <Typography variant="h5">{user.name}</Typography>
      </Container>
      <Container className={styles.wrapper}>
        <Container className={styles.info}>
          <Box className={styles.bio_wrapper}>
            <Typography className={styles.bio} variant="p" sx={{ marginBottom: '2rem' }}>
              {user.description}
            </Typography>
          </Box>
          {user.links.map(link => (
            <a key={link.id} className={styles.link} href={link.value} target="_blank">
              <Box className={styles.link_wrapper}>
                <LinkIcon className={styles.link_icon} />
                <Typography variant="p">{link.value}</Typography>
              </Box>
            </a>
          ))}
          <Button
            color="primary"
            variant="outlined"
            fullWidth={isMobile}
            onClick={() => navigate('/profile/edit')}>
            Редактировать профиль
          </Button>
        </Container>
        <Container className={styles.skillTokens}>
          <Typography className={styles.skillToken_title} variant="h6">
            Скилл-токены:
          </Typography>
          {user.skilltokens.map(token => (
            <Accordion className={`${styles.min_height} ${styles.accordion}`} key={token.id}>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id={token.id}>
                <Typography variant="h6">{token.name}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Stack direction="column" className={styles.list}>
                  <List>
                    {token.competences.map(item => (
                      <ListItem key={item.id} disablePadding>
                        <ListItemButton>
                          <ListItemIcon>
                            <CheckCircle />
                          </ListItemIcon>
                          <ListItemText primary={`${item.name} (${item.level.name})`} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                  <Stack
                    direction={isMobile ? 'column' : 'row'}
                    className={styles.actions}
                    spacing={2}>
                    <Button
                      color="primary"
                      variant="outlined"
                      startIcon={<Edit />}
                      fullWidth={isMobile}
                      onClick={() => navigate(`/token/${token.id}`)}>
                      Редактировать
                    </Button>
                    <Button
                      color="secondary"
                      variant="outlined"
                      startIcon={<Delete />}
                      fullWidth={isMobile}
                      onClick={() => handleRemoveSkillToken(token.id)}>
                      Удалить
                    </Button>
                  </Stack>
                </Stack>
              </AccordionDetails>
            </Accordion>
          ))}
          <Button
            color="primary"
            variant="outlined"
            startIcon={<Add />}
            fullWidth={isMobile}
            onClick={handleAddSkillToken}>
            Добавить
          </Button>
        </Container>
      </Container>
    </Container>
  );
};
