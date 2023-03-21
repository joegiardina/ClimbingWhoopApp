import {createContext, useContext} from 'react';
import {useColorScheme} from 'react-native';
import theme, {colors} from '../../style';

export const ThemeContext = createContext({...theme, colors: colors.light});

export const useThemeContext = () => {
  const themeContext = useContext(ThemeContext);
  const isDarkMode = useColorScheme() === 'dark';
  return {themeContext, isDarkMode};
};
