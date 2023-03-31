import React from 'react';
import {ScrollView, ViewStyle} from 'react-native';
import View, {ViewProps} from './View';
import {spacing} from '../../style';
import {useThemeContext} from '../contexts/themeContext';

type ScreenProps = ViewProps & {
  useScrollView?: boolean;
};

const Screen: React.FC<ScreenProps> = ({children, ...props}) => {
  const {themeContext} = useThemeContext();
  const {backgroundColor} = themeContext.colors;

  const style: ViewStyle = {
    backgroundColor,
    height: '100%',
    padding: spacing.normal,
  };

  if (props.useScrollView) {
    return (
      <ScrollView contentContainerStyle={[style, props.style]} {...props}>
        {children}
      </ScrollView>
    );
  }

  return (
    <View {...props} style={style}>
      {children}
    </View>
  );
};

export default Screen;
