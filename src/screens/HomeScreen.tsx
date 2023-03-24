import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {useQuery} from 'react-query';
import Button from '../components/Button';
import Text from '../components/Text';
import Screen from '../components/Screen';
import {WorkoutInterface} from '../interface';
import {fetchPlan} from '../api';

import {spacing} from '../../style';
import {useThemeContext} from '../contexts/themeContext';
import {WORKOUT_SCREEN} from '../constants/navigation';
import WorkoutDisplay from '../components/WorkoutDisplay';

// this is dumb, just getting something to work
const JS_DAYS = ['Su', 'M', 'T', 'W', 'Th', 'F', 'Sa']
const DAYS = ['M', 'T', 'W', 'Th', 'F', 'Sa', 'Su'];
function getTodaysWorkout(data: any) {
  const today = new Date();
  const day = JS_DAYS[today.getDay()];
  const phase = 2;
  return data[phase][DAYS.indexOf(day)]
}
///////////////

// TODO: properly type navigation
const Home: React.FC<{navigation: any}> = ({navigation}) => {
  const {themeContext} = useThemeContext();
  const [workout, setWorkout] = useState<WorkoutInterface | undefined>();

  const {data} = useQuery('plan', fetchPlan);

  const buttonDisabled = !workout;

  useEffect(() => {
    if (data) {
      setWorkout(getTodaysWorkout(data))
    }
  }, [data])

  return (
    <Screen>
      <View style={{alignSelf: 'flex-start'}}>
        <Text large>
          Today's Workout
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          width: '100%',
          paddingTop: spacing.large,
        }}>
        {!!workout && (
          <WorkoutDisplay
            workout={workout}
            displayOnly
          />
        )}
      </View>
      <Button
        text="Start Workout"
        onPress={() => navigation.navigate(WORKOUT_SCREEN, {workout})}
        disabled={buttonDisabled}
        style={{
          width: '80%',
        }}
      />
    </Screen>
  );
};

export default Home;
