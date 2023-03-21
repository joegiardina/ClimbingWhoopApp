import React, {useState} from 'react';
import {
  Text,
  View,
} from 'react-native';
import {useQuery} from 'react-query';
import tw from 'twrnc';
import WorkoutPicker from '../components/WorkoutPicker';
import Button from '../components/Button';
import {WorkoutInterface} from '../interface';
import {fetchPlan} from '../api';

import {spacing, fontSizes, radii} from '../../style';
import { useThemeContext } from '../contexts/themeContext';


// TODO: properly type navigation
const Home: React.FC<{navigation:any}> = ({navigation}) => {
  const {themeContext} = useThemeContext();
  const {backgroundColor, textColor} = themeContext.colors;
  const [workout, setWorkout] = useState<WorkoutInterface | undefined>();

  const {data} = useQuery('plan', fetchPlan);

  const buttonDisabled = !workout;
  
  return (
    <View
      style={{
        backgroundColor,
        display: 'flex',
        height: '100%',
        alignItems: 'center',
        paddingVertical: spacing.large,
      }}>
      <View style={tw`p-2 m-2 bg-blue-900 rounded-xl`}>
        <Text style={{color: textColor, fontSize: fontSizes.large}}>Daily Workout</Text>
      </View>
      <WorkoutPicker
        textColor={textColor}
        data={data}
        setWorkout={setWorkout}
      />
      <Button
        text="Start Workout"
        onPress={() => navigation.navigate('WorkoutScreen', {workout})}
        disabled={buttonDisabled}
        style={{
          marginTop: 'auto',
          width: '80%',
        }} />
    </View>
  );
}

export default Home;
