import lightTheme, { darkTheme } from './palette';
import typography from './typography';
import componentsOverride from './overrides';
import lightShadows, { darkShadows, customLightShadows, customDarkShadows } from './shadows';

const lightThemeOption = () => ({
  palette: lightTheme,
  shape: { borderRadius: 8 },
  typography,
  shadows: lightShadows,
  customShadows: customLightShadows,
});

export default lightThemeOption;

export const darkThemeOption = () => ({
  palette: darkTheme,
  shape: { borderRadius: 8 },
  typography,
  shadows: darkShadows,
  customShadows: customDarkShadows,
});
