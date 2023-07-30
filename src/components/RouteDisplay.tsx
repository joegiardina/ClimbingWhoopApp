import _ from 'lodash';
import React, {useState} from 'react';
import Text from '../components/Text';
import View from '../components/View';
import { TouchableOpacity } from 'react-native';

import {spacing} from '../../style';

const keys = [
  'Route Type',
  'Style',
  'Lead Style',
  'Notes',
  'Location',
];

const RouteDisplay = ({route}) => {
  const [selected, setSelected] = useState(false);
  const onPress = () => setSelected(sel => !sel);
  return (
    <TouchableOpacity onPress={onPress}>
      <View container style={{marginBottom: spacing.normal}}>
        <View row style={{justifyContent: 'space-between'}}>
          <Text medium>{route.Route}</Text>
          <View>
            <Text small>{route.Date}</Text>
            <Text>{route.Rating}</Text>
          </View>
        </View>
        <View>
          {selected && _.map(keys, (key, i) => !!route[key] && (
            <Text key={i}>{key}: {route[key]}</Text>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default RouteDisplay;