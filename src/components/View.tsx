import React from 'react';
import {View as RNView, ViewProps as RNViewProps} from 'react-native';
import { useThemeContext } from '../contexts/themeContext';

export interface ViewProps extends RNViewProps {
  expand?: Boolean;
  row?: Boolean;
  container?: Boolean;
  centered?: Boolean;
  fullWidth?: Boolean;
}

const View: React.FC<ViewProps> = ({children, ...props}) => {
  const {
    expand,
    row,
    container,
    centered,
    fullWidth,
    style,
    ...passThroughProps
  } = props;
  const {themeContext} = useThemeContext();
  const {radii, spacing, colors} = themeContext;
  return (
    <RNView
      style={[
        expand && {flex: 1},
        fullWidth && {width: '100%'},
        row && {flexDirection: 'row'},
        centered && {justifyContent: 'center', alignItems: 'center'},
        container && {
          backgroundColor: colors.containerBackground,
          borderRadius: radii.normal,
          width: '100%',
          padding: spacing.normal,
        },
        style,
      ]}
      {...passThroughProps}>
      {children}
    </RNView>
  );
};
export default View;
