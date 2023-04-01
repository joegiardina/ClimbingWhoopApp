import React from 'react';
import {TouchableOpacity} from 'react-native';
import {spacing, radii} from '../../style';
import Text from './Text';
import {useThemeContext} from '../contexts/themeContext';

interface ButtonProps {
  text: string;
  largeText?: boolean;
  textOnly?: boolean;
  disabled?: boolean;
  onPress?: () => any;
  style?: any;
  outline?: boolean;
  small?: boolean;
  unfavorable?: Boolean;
}

const Button: React.FC<ButtonProps> = ({
  text,
  disabled,
  onPress,
  style,
  outline,
  largeText,
  small,
  unfavorable,
  textOnly,
}) => {
  const {themeContext} = useThemeContext();
  const {textColor, backgroundColor} = themeContext.colors;

  let buttonColor = themeContext.colors.favorable;
  let buttonTextColor = 'white';
  let borderColor = buttonColor;
  if (disabled) {
    buttonColor = 'gray';
    buttonTextColor = 'white';
    borderColor = buttonColor;
  } else if (unfavorable) {
    buttonColor = themeContext.colors.unfavorable;
    buttonTextColor = 'white';
    borderColor = buttonColor;
  } else if (outline) {
    buttonColor = backgroundColor;
    buttonTextColor = textColor;
    borderColor = textColor;
  } else if (textOnly) {
    buttonColor = backgroundColor;
    borderColor = buttonColor;
  }


  return (
    <TouchableOpacity
      disabled={!!disabled}
      onPress={onPress}
      style={[
        {
          backgroundColor: buttonColor,
          borderRadius: radii.normal,
          borderColor: borderColor || backgroundColor,
          borderWidth: 1,
          paddingVertical: !small ? spacing.normal : spacing.small,
          paddingHorizontal: spacing.normal,
          minWidth: !small && 80,
          alignItems: 'center',
          justifyContent: 'center',
        },
        style,
      ]}>
      <Text bold large={!!largeText} style={{color: buttonTextColor}}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
