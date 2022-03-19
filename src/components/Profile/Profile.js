import { Container, Typography, Card, Stack, Tooltip, IconButton } from '@mui/material';
import { Edit, CardTravel } from '@mui/icons-material';
import styles from './Profile.module.css';
import DefaultAvatar from '../../assets/images/avatar.png';


export const Profile = () => {
  const user = {
    avatar: DefaultAvatar,
    name: 'John Doe',
    tokens: [
      {
        id: 0,
        name: 'Default'
      }
    ]
  };
  return (
    <Container className={styles.root}>
      <Container grid className={styles.image_wrapper}>
        <img src={user.avatar} />
      </Container>
      <Container grid className={styles.image_wrapper}>
        <Typography variant="h5">{user.name}</Typography>
      </Container>
      <Container grid className={styles.image_wrapper}>
        <Container gtid className={styles.card__wrapper}>
      <Typography className={styles.skill__token} variant="h6">Skilltokens:</Typography>

        {user.tokens.map(token => (
          
          <Card className={styles.selected__card} key={token.id} variant="outlined">
            
            <Stack className={styles.selected__icon} direction="row" spacing={5}>
            <CardTravel />
              <Typography className={styles.selected__speciality} variant="h6">{token.name}</Typography>
              <Tooltip  title="Редактировать">
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
