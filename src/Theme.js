import { createTheme } from '@mui/material/styles';

export const Theme = createTheme({
  palette: {
    primary: {
      light: '#8a87f6',
      main: '#6d6af4',
      dark: '#4c4aaa',
      contrastText: '#fff'
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000'
    }
  },
  typography: {
    fontFamily: 'Inter'
  }
});
