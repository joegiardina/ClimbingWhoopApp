import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {useQuery} from 'react-query';
import Text from '../components/Text';
import Screen from '../components/Screen';
import {fetchWorkouts} from '../api';
import tw from 'twrnc';
import Card from '../components/Card';
import {CardComponentInterface} from '../interface'
import key_maker from '../common/key_maker';

const HistoryScreen = () => {
  const [exercises, setExercises] = useState<Array<CardComponentInterface>>([]);
  let count = 0
  const {data} = false
  const objects = 
  [{"name": "Mobility and Flexibility", "result": {"Stretching": {"Duration (min)": 99}}},
  {"name": "Mobility and Flexibility", "result": {"Stretching": {"Duration (min)": 30}}},
  {"name": "Mobility and Flexibility", "result": {"Stretching": {"Duration (min)": 60}}}]
  
  useEffect(() => {
    if (data) {
      setExercises(data[0].data.exercises);
    } else {
      setExercises(objects);
    }
  }, [data])
  
  return (
    <Screen style={tw`bg-white`} useScrollView>
      <View style={tw`text-base font-semibold leading-6 text-gray-900`}>
          {exercises.map((item) => <Card item={item} key={key_maker(item)} />)}
      </View>
    </Screen>
  )
};


export default HistoryScreen;