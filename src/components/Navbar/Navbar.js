import { useState } from 'react';
import { NavLink } from 'react-router-dom';
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
  Person,
  FactCheck,
  Settings,
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon
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

  const menuItems = [
    {
      name: 'Профиль',
      icon: <Person />,
      link: '/profile'
    },
    {
      name: 'Заявки',
      icon: <FactCheck />,
      link: '/tokens'
    },
    {
      name: 'Настройки',
      icon: <Settings />,
      link: '/settings'
    }
  ];

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
            {menuItems.map(item => (
              <BottomNavigationAction
                key={item.name}
                label={item.name}
                icon={item.icon}
                showLabel
                component={NavLink}
                to={item.link}
              />
            ))}
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
              {menuItems.map(item => (
                <ListItem button key={item.name} component={NavLink} to={item.link}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItem>
              ))}
            </List>
          </SwipeableDrawer>
        </AppBar>
      )}
    </div>
  );
};
