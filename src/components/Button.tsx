import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {spacing, radii} from '../../style';

interface ButtonProps {
  text: string;
  disabled?: boolean;
  onPress?: () => any;
  style?: any;
  outline?: boolean;
  small?: boolean;
}

const Button: React.FC<ButtonProps> = ({text, disabled, onPress, style, outline, small}) => {
  return (
    <TouchableOpacity
      disabled={!!disabled}
      onPress={onPress}
      style={[
        style,
        {
          backgroundColor: disabled ? 'gray' : 'green',
          borderRadius: radii.normal,
          paddingVertical: !small ? spacing.normal : spacing.small,
          paddingHorizontal: spacing.small,
          minWidth: !small && 100,
        },
      ]}>
      <Text style={{textAlign: 'center', color: 'white'}}>{text}</Text>
    </TouchableOpacity>
  );
};

export default Button;
