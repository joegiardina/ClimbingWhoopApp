import React from 'react';
import {View} from 'react-native';
import {ViewProps} from 'react-native/types';
import {spacing} from '../../style';
import {useThemeContext} from '../contexts/themeContext';

const Screen: React.FC<ViewProps> = ({children, ...props}) => {
  const {themeContext} = useThemeContext();
  const {backgroundColor} = themeContext.colors;
  return (
    <View
      {...props}
      style={{
        backgroundColor,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: spacing.normal,
      }}>
      {children}
    </View>
  );
};

export default Screen;
