import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {useQuery} from 'react-query';
import tw from 'twrnc';
import WorkoutPicker from '../components/WorkoutPicker';
import Button from '../components/Button';
import Screen from '../components/Screen';
import {WorkoutInterface} from '../interface';
import {fetchPlan} from '../api';

import {fontSizes} from '../../style';
import {useThemeContext} from '../contexts/themeContext';
import {WORKOUT_SCREEN} from '../constants/navigation';

// TODO: properly type navigation
const Home: React.FC<{navigation: any}> = ({navigation}) => {
  const {themeContext} = useThemeContext();
  const {backgroundColor, textColor} = themeContext.colors;
  const [workout, setWorkout] = useState<WorkoutInterface | undefined>();

  const {data} = useQuery('plan', fetchPlan);

  const buttonDisabled = !workout;

  return (
    <Screen>
      <View style={tw`p-2 m-2 bg-blue-900 rounded-xl`}>
        <Text style={{color: 'white', fontSize: fontSizes.large}}>
          Daily Workout
        </Text>
      </View>
      <WorkoutPicker
        textColor={textColor}
        data={data}
        setWorkout={setWorkout}
      />
      <Button
        text="Start Workout"
        onPress={() => navigation.navigate(WORKOUT_SCREEN, {workout})}
        disabled={buttonDisabled}
        style={{
          marginTop: 'auto',
          width: '80%',
        }}
      />
    </Screen>
  );
};

export default Home;
