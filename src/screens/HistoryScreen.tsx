import _ from 'lodash';
import React, {useState, useEffect} from 'react';
import {View, FlatList} from 'react-native';
import {useQuery} from 'react-query';
import Text from '../components/Text';
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
            <Text style={{marginBottom: spacing.normal}}>
              {JSON.stringify(item, null, 2)}
            </Text>
          );
        }}
      />
    </Screen>
  );
};

export default HistoryScreen;
