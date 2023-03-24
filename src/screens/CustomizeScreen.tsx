import _ from 'lodash';
import React from 'react';
import {View} from 'react-native';
import {useQuery} from 'react-query';
import Text from '../components/Text';
import Screen from '../components/Screen';
import {fetchExercises} from '../api';
import {spacing} from '../../style';

const CustomizeScreen = () => {
  const {data} = useQuery('all_exercises', fetchExercises);
  return (
    <Screen useScrollView>
      <View style={{flex: 1}}>
        {_.map(data, (v, k) => <Text key={k} style={{marginBottom: spacing.large}}>{k}: {Object.keys(v).join(', ')}</Text>)}
      </View>
    </Screen>
  )
};

export default CustomizeScreen;