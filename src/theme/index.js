import PropTypes from 'prop-types';
import { useMemo, useState, useEffect, createContext, useContext } from 'react';

// material
import { CssBaseline } from '@mui/material';
import { ThemeProvider as MUIThemeProvider, createTheme, StyledEngineProvider } from '@mui/material/styles';

//

import componentsOverride from './overrides';
import lightThemeOption, { darkThemeOption } from './option';

// ----------------------------------------------------------------------

import { ThemeContext } from '../context/ThemeContext';

ThemeProvider.propTypes = {
  children: PropTypes.node,
};

export default function ThemeProvider({ children }) {
  const light = useMemo(lightThemeOption);
  const dark = useMemo(darkThemeOption);

  const [theme, setTheme] = useState(createTheme(light));

  const themeChange = { theme, setTheme };

  useEffect(() => {
    let themeMode = null;

    if (localStorage.getItem('theme_mode') === 'light') {
      themeMode = createTheme(light);
      themeMode.components = componentsOverride(themeMode);
    } else if (localStorage.getItem('theme_mode') === 'dark') {
      themeMode = createTheme(dark);
      themeMode.components = componentsOverride(themeMode);
    } else {
      // default
      themeMode = createTheme(light);
      themeMode.components = componentsOverride(themeMode);
    }

    setTheme(themeMode);
  }, []);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeContext.Provider value={themeChange}>
        <MUIThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </MUIThemeProvider>
      </ThemeContext.Provider>
    </StyledEngineProvider>
  );
}
