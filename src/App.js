import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { NotificationProvider } from './providers/NotificationProvider';
import { LoaderProvider } from './providers/LoaderProvider';
import combineProviders from './utils/combine-providers';
// import { AuthProvider } from './providers/AuthProvider';
import { Theme } from './Theme';
import { store } from './store';
import { Provider as StateProvider } from 'react-redux';
import { Routes } from './routing/Routes';
import { StyledEngineProvider } from '@mui/material/styles';
import '@fontsource/inter';
import './styles.css';

const App = () => {
  const Providers = combineProviders([
    // AuthProvider,
    NotificationProvider,
    [StateProvider, { store }],
    LoaderProvider,
    [ThemeProvider, { theme: Theme }]
  ]);

  return (
    <Router>
      <StyledEngineProvider injectFirst>
        <Providers>
          <Routes />
        </Providers>
      </StyledEngineProvider>
    </Router>
  );
};

export default App;
