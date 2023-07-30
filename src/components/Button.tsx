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
  const {backgroundColor} = themeContext.colors;

  let buttonColor = themeContext.colors.favorable;
  let buttonTextColor = 'white';
  let borderWidth = 1;
  if (disabled) {
    buttonColor = 'gray';
    buttonTextColor = 'white';
  } else if (unfavorable) {
    buttonColor = themeContext.colors.unfavorable;
    buttonTextColor = 'white';
  }

  let borderColor = buttonColor;
  if (outline) {
    borderColor = buttonColor;
    buttonTextColor = buttonColor;
    buttonColor = backgroundColor;
  } else if (textOnly) {
    borderWidth = 0;
    buttonTextColor = buttonColor;
    buttonColor = backgroundColor;
  }

  return (
    <TouchableOpacity
      disabled={!!disabled}
      onPress={onPress}
      style={[
        {
          backgroundColor: buttonColor,
          borderRadius: radii.normal,
          borderColor: borderColor,
          borderWidth: borderWidth,
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
