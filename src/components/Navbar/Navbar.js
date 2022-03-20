import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
  Box,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  Tooltip,
  IconButton,
  Avatar
} from '@mui/material';
import { Person, FactCheck, Settings, Search } from '@mui/icons-material';
import styles from './Navbar.module.css';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useSelector } from 'react-redux';

export const Navbar = () => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const user = useSelector(state => state.user.user);
  const [value, setValue] = useState(0);

  const menuItems = [
    {
      name: 'Профиль',
      icon: <Person />,
      link: '/profile',
      access: ['EMPLOYER', 'EMPLOYEE']
    },
    {
      name: 'Заявки',
      icon: <FactCheck />,
      link: '/tokens',
      access: ['EMPLOYEE']
    },
    {
      name: 'Поиск',
      icon: <Search />,
      link: '/search',
      access: ['EMPLOYER']
    }
  ];

  return (
    <div className={styles.root}>
      {isMobile ? (
        <Paper
          style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: '9999' }}
          elevation={3}>
          <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}>
            {menuItems
              .filter(item => item.access.includes(user.role))
              .map(item => (
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
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}>
                SkillsCloud
              </Typography>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                SkillsCloud
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {menuItems
                  .filter(item => item.access.includes(user.role))
                  .map(item => (
                    <Button
                      component={NavLink}
                      to={item.link}
                      key={item.name}
                      sx={{ my: 2, color: 'white', display: 'block' }}>
                      {item.name}
                    </Button>
                  ))}
              </Box>
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" src={user.avatar} />
                  </IconButton>
                </Tooltip>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      )}
    </div>
  );
};
