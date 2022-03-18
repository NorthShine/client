import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  BottomNavigation,
  BottomNavigationAction,
  Paper
} from '@mui/material';
import {
  Menu as MenuIcon,
  MoveToInbox as InboxIcon,
  Mail as MailIcon,
  ChevronLeft as ChevronLeftIcon,
  Restore,
  Favorite,
  Archive
} from '@mui/icons-material';
import styles from './Navbar.module.css';
import useMediaQuery from '@mui/material/useMediaQuery';

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');
  const [value, setValue] = useState(0);

  const toggleSidebar = open => event => {
    if (
      event.type === 'keydown' &&
      'key' in event &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setOpen(open);
  };

  return (
    <div className={styles.root}>
      {isMobile ? (
        <Paper style={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
          <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}>
            <BottomNavigationAction label="Recents" icon={<Restore />} />
            <BottomNavigationAction label="Favorites" icon={<Favorite />} />
            <BottomNavigationAction label="Nearby" icon={<Archive />} />
          </BottomNavigation>
        </Paper>
      ) : (
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={styles.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={toggleSidebar(true)}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={styles.title}>
              App
            </Typography>
            <Button color="inherit">Logout</Button>
          </Toolbar>
          <SwipeableDrawer
            anchor="left"
            open={open}
            onClose={toggleSidebar(false)}
            onOpen={toggleSidebar(true)}
            className={styles.sidebar}
            classes={{
              paper: styles.drawerPaper
            }}>
            <div className={styles.drawerHeader}>
              <IconButton onClick={toggleSidebar(false)}>
                <ChevronLeftIcon />
              </IconButton>
            </div>
            <Divider />
            <List>
              {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                <ListItem button key={text}>
                  <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
            <Divider />
            <List>
              {['All mail', 'Trash', 'Spam'].map((text, index) => (
                <ListItem button key={text}>
                  <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
          </SwipeableDrawer>
        </AppBar>
      )}
    </div>
  );
};