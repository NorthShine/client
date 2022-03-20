import {
  Container,
  Typography,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  useMediaQuery,
  List,
  ListItem,
  ListItemIcon,
  ListItemButton,
  ListItemText,
  ListItemAvatar,
  Avatar
} from '@mui/material';
import { Edit, ExpandMore, CheckCircle, Link as LinkIcon, Delete, Add } from '@mui/icons-material';
import styles from './UserNotifications.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { addUserSkillToken, removeUserSkillToken } from '../../store/reducers/user/userSlice';
import { createSkilltoken } from '../../utils';
import * as api from '../../api';
import { useEffect, useState } from 'react';

export const UserNotifications = () => {
  const user = useSelector(state => state.user.user);
  const isMobile = useMediaQuery('(max-width:600px)');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    api
      .getNotification()
      .then(res => {
        console.log(res.data);
        setNotifications(
          Array.from({ length: 5 }, async (_, id) => {
            return {
              id,
              message: 'Hello! Please accept my request!'
            };
          })
        );
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <Container className={styles.root} component="main" maxWidth="md">
      <Container className={styles.wrapper}>
        <List fullWidth sx={{ width: '100% !important' }}>
          {notifications.map(item => {
            console.log(item);
            return (
              <ListItem
                key={item.message}
                secondaryAction={
                  <Button variant="contained" color="primary" fullWidth>
                    Ответить
                  </Button>
                }>
                <ListItemAvatar>
                  <Avatar src={user.avatar} />
                </ListItemAvatar>
                <ListItemText primary={item.message} />
              </ListItem>
            );
          })}
        </List>
      </Container>
    </Container>
  );
};
