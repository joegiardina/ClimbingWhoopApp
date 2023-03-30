import React, {useState} from 'react';
import {View} from 'react-native';
import Button from '../components/Button';
import Text from '../components/Text';
import Screen from '../components/Screen';
import WorkoutList from '../components/WorkoutList';
import {WorkoutInterface} from '../interface';

import {spacing} from '../../style';
import {WORKOUT_SCREEN} from '../constants/navigation';
import WorkoutDisplay from '../components/WorkoutDisplay';
import {useCustomizeContext} from '../contexts/customizeContext';

// TODO: properly type navigation
const Home: React.FC<{navigation: any}> = ({navigation}) => {
  const [workout, setWorkout] = useState<WorkoutInterface | undefined>();
  const {workoutList} = useCustomizeContext();

  const buttonDisabled = !workout;

  return (
    <Screen>
      <View style={{alignSelf: 'flex-start'}}>
        <Text large>Today's Workout</Text>
      </View>
      <WorkoutList
        workoutList={workoutList}
        onPress={item => setWorkout(item)}
      />
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          width: '100%',
          paddingTop: spacing.large,
        }}>
        {!!workout && (
          <>
            <Text medium style={{marginBottom: spacing.normal}}>
              Workout Info
            </Text>
            <WorkoutDisplay workout={workout} displayOnly />
          </>
        )}
      </View>
      <View style={{flex: 1}}>
        <Button
          text="Start Workout"
          onPress={() => navigation.navigate(WORKOUT_SCREEN, {workout})}
          disabled={buttonDisabled}
          style={{
            width: '80%',
          }}
        />
      </View>
    </Screen>
  );
};

export default Home;
