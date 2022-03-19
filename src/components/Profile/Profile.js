import { Container, Typography, Card, Stack, Tooltip, IconButton } from '@mui/material';
import { Edit, CardTravel } from '@mui/icons-material';
import styles from './Profile.module.css';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export const Profile = () => {
  const user = useSelector(state => state.user.user);
  return (
    <Container className={styles.root}>
      <Container className={styles.image_wrapper}>
        <img src={user.avatar} />
      </Container>
      <Container className={styles.image_wrapper}>
        <Typography variant="h5">{user.name}</Typography>
      </Container>
      <Container className={styles.image_wrapper}>
        <Container className={styles.card__wrapper}>
          <Typography className={styles.skill__token} variant="h6">
            Skilltokens:
          </Typography>
          {user.skillTokens.map(token => (
            <Card className={styles.selected__card} key={token.id} variant="outlined">
              <Stack className={styles.selected__icon} direction="row" spacing={5}>
                <CardTravel />
                <Typography className={styles.selected__speciality} variant="h6">
                  {token.name}
                </Typography>
                <Tooltip title="Редактировать">
                  <IconButton onClick={() => {}}>
                    <Edit />
                  </IconButton>
                </Tooltip>
              </Stack>
            </Card>
          ))}
        </Container>
      </Container>
    </Container>
  );
};
