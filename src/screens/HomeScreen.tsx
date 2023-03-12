import React, {useState, useEffect} from 'react';
import {
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
} from 'react-native';
import {useQuery} from 'react-query'
import WorkoutPicker from '../components/WorkoutPicker';
import {WorkoutInterface} from '../interface';
import {fetchPlan} from '../api';

import {spacing, fontSizes, radii} from '../../style';

const DAYS = ['M', 'T', 'W', 'Th', 'F', 'Sa', 'Su'];

// TODO: properly type navigation
const Home: React.FC<{navigation:any}> = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [backgroundColor] = useState(isDarkMode ? 'black' : 'white');
  const [textColor] = useState(isDarkMode ? 'white' : 'black')
  const [workout, setWorkout] = useState<WorkoutInterface>({});

  const {data} = useQuery('plan', fetchPlan);

  return (
    <View
      style={{
        backgroundColor,
        display: 'flex',
        height: '100%',
        alignItems: 'center',
        paddingVertical: spacing.large,
      }}>
      <View style={{alignItems: 'center', marginBottom: 12}}>
        <Text style={{color: textColor, fontSize: fontSizes.large}}>Daily Workout</Text>
      </View>
      <WorkoutPicker
        textColor={textColor}
        data={data}
        setWorkout={setWorkout}
      />
      {/* <View style={{margin: spacing.normal}}>
        <Calendar textColor={'white'} backgroundColor={'black'} />
      </View> */}
      <TouchableOpacity
        onPress={() => navigation.navigate('WorkoutScreen', {workout})}
        style={{
          marginTop: 'auto',
          marginBottom: spacing.large,
          width: '80%',
          backgroundColor: 'green',
          borderRadius: radii.normal,
          padding: 12,
        }}>
        <Text style={{textAlign: 'center', color: 'white'}}>Start Workout</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Home;
