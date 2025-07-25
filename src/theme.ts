import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0071e3', // фирменный синий Apple
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#f5f5f7', // светло-серый фон (например, секции на сайте)
      contrastText: '#000000',
    },
    background: {
      default: '#ffffff',   // основной фон
      paper: '#f5f5f7',     // фон карточек и секций
    },
    text: {
      primary: '#1d1d1f',   // почти чёрный текст
      secondary: '#6e6e73', // серый текст
    },
    divider: 'rgba(0, 0, 0, 0.1)',
    error: {
      main: '#ff3b30',
    },
    warning: {
      main: '#ff9500',
    },
    info: {
      main: '#007aff',
    },
    success: {
      main: '#34c759',
    },
  },
  typography: {
    fontFamily: `"SF Pro Text", "Helvetica Neue", "Segoe UI", Roboto, Arial, sans-serif`,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontSize: 14,
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 20px',
        },
        containedPrimary: {
          backgroundColor: '#0071e3',
          border: 'rgba(0, 113, 227, 0.5) solid 1px',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#005bb5',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          borderRadius: 8,
        },
      },
    },
  },
});

export default theme;
