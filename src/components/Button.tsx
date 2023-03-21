import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {spacing, radii} from '../../style';

interface ButtonProps {
  text: string,
  disabled?: boolean,
  onPress?: () => any,
  style?: any,
  outline?: boolean,
}

const Button: React.FC<ButtonProps> = ({text, disabled, onPress, style}) => {
  return (
    <TouchableOpacity
      disabled={!!disabled}
      onPress={onPress}
      style={[style, {
        backgroundColor: disabled ? 'gray' : 'green',
        borderRadius: radii.normal,
        paddingVertical: spacing.normal,
        paddingHorizontal: spacing.small,
      }]}
    >
      <Text style={{textAlign: 'center', color: 'white'}}>{text}</Text>
    </TouchableOpacity>
  )
};

export default Button;