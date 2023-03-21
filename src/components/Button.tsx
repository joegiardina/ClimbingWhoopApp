import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {radii} from '../../style';

interface ButtonProps {
  text: string,
  disabled?: Boolean,
  onPress?: () => any,
  style?: any,
}

const Button: React.FC<ButtonProps> = ({text, disabled, onPress, style}) => {
  return (
    <TouchableOpacity
      disabled={!!disabled}
      onPress={onPress}
      style={[style, {
        backgroundColor: disabled ? 'gray' : 'green',
        borderRadius: radii.normal,
        padding: 12,
      }]}
    >
      <Text style={{textAlign: 'center', color: 'white'}}>{text}</Text>
    </TouchableOpacity>
  )
};

export default Button;