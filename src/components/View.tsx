import _ from 'lodash';
import React from 'react';
import {View as RNView, ViewProps as RNViewProps} from 'react-native';
import {fontSizes} from '../../style';
import {useThemeContext} from '../contexts/themeContext';

interface ViewProps extends RNViewProps {
  row?: boolean;
}

const View: React.FC<ViewProps> = props => {
  const {children, row, style, ...passThroughProps} = props;
  return (
    <RNView
      style={[row && {flexDirection: 'row'}, style]}
      {...passThroughProps}>
      {children}
    </RNView>
  );
};
export default View;
