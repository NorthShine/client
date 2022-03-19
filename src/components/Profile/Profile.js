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
import { Edit, ExpandMore, CheckCircle, Link } from '@mui/icons-material';
import styles from './Profile.module.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';

export const Profile = () => {
  const user = useSelector(state => state.user.user);
  const isMobile = useMediaQuery('(max-width:600px)');
  const navigate = useNavigate();

  return (
    <Container className={styles.root}>
      <Container className={styles.image_wrapper}>
        <img src={user.avatar} />
      </Container>
      <Container className={styles.image_wrapper}>
        <Typography variant="h5">{user.name}</Typography>
      </Container>
      <Container className={styles.image_wrapper}>
        <Typography sx={{ color: 'gray' }} variant="h6">
          Enthusiast, inspiration seeker
        </Typography>
      </Container>
      <Container className={styles.image_wrapper}>
        <Container sx={{ paddingBottom: '2rem' }}>
          <Typography className={styles.skill__token} variant="h6">
            О себе
          </Typography>
          <Typography className={styles.typography__bio} variant="p" sx={{ marginBottom: '2rem' }}>
            {user.description}
          </Typography>
          {user.links.map(link => (
            <Box key={link.id} className={styles.box__links}>
              <Link className={styles.box__icon} />
              <Typography variant="p">{link.value}</Typography>
            </Box>
          ))}
        </Container>
        <Container className={styles.card__wrapper}>
          <Typography className={styles.skill__token} variant="h6">
            Скилл-токены:
          </Typography>
          {user.skillTokens.map(token => (
            <Accordion className={`${styles.min_height} ${styles.accord__style}`} key={token.id}>
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
                  <Button
                    className={styles.edit}
                    color="primary"
                    variant="contained"
                    startIcon={<Edit />}
                    fullWidth={isMobile}
                    onClick={() => navigate(`/token/${token.id}`)}>
                    Редактировать
                  </Button>
                </Stack>
              </AccordionDetails>
            </Accordion>
          ))}
        </Container>
      </Container>
    </Container>
  );
};
