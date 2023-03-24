import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {useQuery} from 'react-query';
import Text from '../components/Text';
import Screen from '../components/Screen';
import {fetchWorkouts} from '../api';

const HistoryScreen = () => {
  const {data} = useQuery('allWorkouts', fetchWorkouts);
  return (
    <Screen useScrollView>
      <View>
        <Text>{JSON.stringify(data, null, 2)}</Text>
      </View>
    </Screen>
  )
};

export default HistoryScreen;