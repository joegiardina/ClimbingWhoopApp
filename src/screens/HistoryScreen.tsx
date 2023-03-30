import React from 'react';
import {FlatList} from 'react-native';
import {useQuery} from 'react-query';
import Text from '../components/Text';
import View from '../components/View';
import Screen from '../components/Screen';
import {fetchWorkouts} from '../api';
import {spacing} from '../../style';

const HistoryScreen = () => {
  const {data} = useQuery('allHistoricalWorkouts', fetchWorkouts);
  return (
    <Screen>
      <FlatList
        data={data}
        renderItem={({item}) => {
          return (
            <View>
              <Text style={{marginBottom: spacing.normal}}>
                {JSON.stringify(item, null, 2)}
              </Text>
            </View>
          );
        }}
      />
    </Screen>
  );
};

export default HistoryScreen;
