import {createContext, useContext} from 'react';
import {useColorScheme} from 'react-native';
import {colors, spacing, fontSizes, radii} from '../../style';

export const ThemeContext = createContext({
  colors: colors.light,
  spacing,
  fontSizes,
  radii,
});

export const useThemeContext = () => {
  const themeContext = useContext(ThemeContext);
  const isDarkMode = true//useColorScheme() === 'dark';
  return {themeContext, isDarkMode};
};
