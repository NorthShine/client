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
  ListItemText
} from '@mui/material';
import { Edit, ExpandMore, CheckCircle, Link as LinkIcon, Delete, Add } from '@mui/icons-material';
import styles from './UserNotifications.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { addUserSkillToken, removeUserSkillToken } from '../../store/reducers/user/userSlice';
import { createSkilltoken } from '../../utils';
import * as api from '../../api';

export const UserNotifications = () => {
  const user = useSelector(state => state.user.user);
  const isMobile = useMediaQuery('(max-width:600px)');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <Container className={styles.root} component="main" maxWidth="md">
      <Container className={styles.wrapper}>
        {/* <List dense={dense}>
          {generate(
            <ListItem
              secondaryAction={
                <IconButton edge="end" aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              }>
              <ListItemAvatar>
                <Avatar>
                  <FolderIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Single-line item"
                secondary={secondary ? 'Secondary text' : null}
              />
            </ListItem>
          )}
        </List> */}
      </Container>
    </Container>
  );
};
