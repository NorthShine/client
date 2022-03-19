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
  useMediaQuery
} from '@mui/material';
import { Edit, ExpandMore } from '@mui/icons-material';
import styles from './Profile.module.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

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
        <Container className={styles.aboutme__wrapper}>
          <Typography className={styles.skill__token} variant="h6">
            О себе
          </Typography>
          <Card className={styles.aboutme__card} variant="outlined">
            <Tooltip title="Редактировать">
              <IconButton className={styles.aboutme__editior} onClick={() => {}}>
                <Edit />
              </IconButton>
            </Tooltip>
          </Card>
        </Container>
        <Container className={styles.card__wrapper}>
          <Typography className={styles.skill__token} variant="h6">
            Skilltokens:
          </Typography>
          {user.skillTokens.map(
            token => (
              <Accordion key={token.id}>
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel1a-content"
                  id={token.id}>
                  <Typography>{token.name}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Stack direction="column">
                    {token.competences.map(item => {
                      return (
                        <Typography variant="p" key={item.id}>
                          {`HTML (${item.level.name})`}
                        </Typography>
                      );
                    })}
                    <Button
                      color="primary"
                      variant="outlined"
                      startIcon={<Edit />}
                      fullWidth={isMobile}
                      onClick={() => navigate(`/token/${token.id}`)}>
                      Редактировать
                    </Button>
                  </Stack>
                </AccordionDetails>
              </Accordion>
            )
            // <Card className={styles.selected__card} key={token.id} variant="outlined">
            //   <Stack className={styles.selected__icon} direction="row" spacing={5}>
            //     <CardTravel />
            //     <Typography className={styles.selected__speciality} variant="h6">
            //       {token.name}
            //     </Typography>
            //     <Tooltip title="Редактировать">
            //       <IconButton onClick={() => navigate(`/token/${token.id}`)}>
            //         <Edit />
            //       </IconButton>
            //     </Tooltip>
            //   </Stack>
            // </Card>
          )}
        </Container>
      </Container>
    </Container>
  );
};
