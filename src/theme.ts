import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    easter: {
      main: string;
      light: string;
      dark: string;
      contrastText: string;
    };
  }
  interface PaletteOptions {
    easter: {
      main: string;
      light: string;
      dark: string;
      contrastText: string;
    };
  }
}

export const theme = createTheme({
  palette: {
    primary: {
      main: '#9575cd', // Soft purple representing Easter eggs
      light: '#c7a4ff',
      dark: '#65499c',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#81c784', // Fresh spring green
      light: '#b2f2b6',
      dark: '#519657',
      contrastText: '#000000',
    },
    easter: {
      main: '#ffb74d', // Warm orange for carrots/Easter themes
      light: '#ffe97d',
      dark: '#c88719',
      contrastText: '#000000',
    },
    background: {
      default: '#fafafa',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          padding: '8px 16px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        },
      },
    },
  },
});
