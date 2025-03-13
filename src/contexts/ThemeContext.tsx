import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material';
import { createTheme, PaletteColor } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    easter: PaletteColor;
  }
  interface PaletteOptions {
    easter?: PaletteColor;
  }
}

type ThemeContextType = {
  isDarkMode: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};

type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev: boolean) => !prev);
  };

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
      primary: {
        main: isDarkMode ? '#8B4513' : '#3E2723',
        light: isDarkMode ? '#A0522D' : '#6D4C41',
        dark: isDarkMode ? '#654321' : '#1B0000',
        contrastText: '#FFFFFF',
      },
      secondary: {
        main: isDarkMode ? '#D2691E' : '#795548',
        light: isDarkMode ? '#CD853F' : '#A1887F',
        dark: isDarkMode ? '#8B4513' : '#4B2C20',
        contrastText: '#FFFFFF',
      },
      easter: {
        main: isDarkMode ? '#8B7355' : '#BCAAA4',
        light: isDarkMode ? '#A39480' : '#D7CCC8',
        dark: isDarkMode ? '#6F5B3E' : '#8C7B75',
        contrastText: isDarkMode ? '#FFFFFF' : '#000000',
      },
      background: {
        default: isDarkMode ? '#121212' : '#EFEBE9',
        paper: isDarkMode ? '#1E1E1E' : '#FFFFFF',
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

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
