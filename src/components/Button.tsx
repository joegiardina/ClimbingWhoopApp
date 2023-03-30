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
}

const Button: React.FC<ButtonProps> = ({
  text,
  disabled,
  onPress,
  style,
  outline,
  largeText,
  textOnly,
  small,
}) => {
  const {themeContext} = useThemeContext();
  const {textColor, backgroundColor} = themeContext.colors;
  const buttonColor = outline ? backgroundColor : disabled ? 'gray' : 'green';
  const buttonTextColor = outline ? textColor : 'white';

  return (
    <TouchableOpacity
      disabled={!!disabled}
      onPress={onPress}
      style={[
        {
          backgroundColor: !textOnly && buttonColor,
          borderRadius: radii.normal,
          borderColor: !textOnly && outline && buttonTextColor,
          borderWidth: !textOnly && outline && 1,
          paddingVertical: !small ? spacing.normal : spacing.small,
          paddingHorizontal: spacing.small,
          minWidth: !small && 80,
          alignItems: 'center',
          justifyContent: 'center',
        },
        style,
      ]}>
      <Text large={!!largeText} style={{color: buttonTextColor}}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
