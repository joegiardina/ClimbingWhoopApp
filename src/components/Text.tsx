import _ from 'lodash';
import React from 'react';
import {Text as RNText, TextProps as RNTextProps} from 'react-native';
import {fontSizes} from '../../style';
import {useThemeContext} from '../contexts/themeContext';

interface TextProps extends RNTextProps {
  color?: string;
  bold?: Boolean;
  small?: Boolean;
  medium?: Boolean;
  style?: object;
  large?: Boolean;
  extraLarge?: Boolean;
  huge?: Boolean;
  favorable?: Boolean;
  unfavorable?: Boolean;
}

const FONT_SIZES = _.keys(fontSizes);

const Text: React.FC<TextProps> = props => {
  const {themeContext} = useThemeContext();
  const {children, style, bold, ...passThroughProps} = props;
  const fontSizeProp = _.intersection(FONT_SIZES, _.keys(props))[0];
  let fontSize = fontSizes.normal;
  if (fontSizeProp && _.get(props, fontSizeProp)) {
    fontSize = _.get(fontSizes, fontSizeProp);
  }
  let textColor = themeContext.colors.textColor;
  if (props.favorable) {
    textColor = themeContext.colors.favorable;
  } else if (props.unfavorable) {
    textColor = themeContext.colors.unfavorable;
  }
  const color = props.color || textColor;
  return (
    <RNText
      style={[
        {
          color,
          fontSize,
        },
        bold && {
          fontWeight: 600,
        },
        style,
      ]}
      {...passThroughProps}>
      {children}
    </RNText>
  );
};
export default Text;
