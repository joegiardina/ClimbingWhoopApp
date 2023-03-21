import React from 'react';
import {Text as RNText, TextProps as RNTextProps} from 'react-native';
import {useThemeContext} from '../contexts/themeContext';

interface TextProps extends RNTextProps {
  inputStyle?: object;
}

const Text: React.FC<TextProps> = (props) => {
  const {themeContext} = useThemeContext();
  const {children, inputStyle, ...passThroughProps} = props;
  return (
    <RNText
      style={{
        color: themeContext.colors.textColor,
        ...(!!inputStyle && inputStyle),
      }}
      {...passThroughProps}>
      {children}
    </RNText>
  );
}
export default Text;