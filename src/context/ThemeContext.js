import React from 'react';
import { ThemeProvider as MUIThemeProvider, createTheme, StyledEngineProvider } from '@mui/material/styles';

export const ThemeContext = React.createContext({
  theme: () => {},
  setTheme: () => {},
});
