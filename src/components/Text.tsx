import _ from 'lodash';
import React from 'react';
import {Text as RNText, TextProps as RNTextProps} from 'react-native';
import {fontSizes} from '../../style';
import {useThemeContext} from '../contexts/themeContext';

interface TextProps extends RNTextProps {
  inputStyle?: object;
  small?: boolean;
  medium?: boolean;
  large?: boolean;
  favorable?: boolean;
  unfavorable?: boolean;
}

const FONT_SIZES = _.keys(fontSizes);

const Text: React.FC<TextProps> = props => {
  const {themeContext} = useThemeContext();
  const {children, inputStyle, ...passThroughProps} = props;
  const fontSizeProp = _.intersection(FONT_SIZES, _.keys(props))[0];
  let fontSize = fontSizes.normal;
  if (fontSizeProp) {
    fontSize = _.get(fontSizes, fontSizeProp);
  }
  let color = themeContext.colors.textColor;
  if (props.favorable) {
    color = themeContext.colors.favorable;
  } else if (props.unfavorable) {
    color = themeContext.colors.unfavorable;
  }
  return (
    <RNText
      style={{
        color,
        fontSize,
        ...(!!inputStyle && inputStyle),
      }}
      {...passThroughProps}>
      {children}
    </RNText>
  );
};
export default Text;
