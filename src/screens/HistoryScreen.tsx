import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {useQuery} from 'react-query';
import Text from '../components/Text';
import Screen from '../components/Screen';
import {fetchWorkouts} from '../api';
import tw from 'twrnc';
import Card from '../components/Card';
import {CardComponentInterface} from '../interface'

const HistoryScreen = () => {
  const [exercises, setExercises] = useState<Array<CardComponentInterface>>([]);
  const {data} = useQuery('allWorkouts', fetchWorkouts);

  useEffect(() => {
    if (data) {
      setExercises(data[0].data.exercises);
    }
  }, [data])
  
  return (
    <Screen style={tw`bg-white`} useScrollView>
      <View style={tw`text-base font-semibold leading-6 text-gray-900`}>
          {exercises.map((exercise) => <Card exercise={exercise} key={exercise.name} />)}
      </View>
    </Screen>
  )
};


export default HistoryScreen;