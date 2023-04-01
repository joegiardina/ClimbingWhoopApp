import React, {useState, useEffect} from 'react';
import Button from '../components/Button';
import Text from '../components/Text';
import View from '../components/View';
import Screen from '../components/Screen';
import WorkoutList from '../components/WorkoutList';
import {WorkoutInterface} from '../interface';

import {spacing} from '../../style';
import {WORKOUT_SCREEN} from '../constants/navigation';
import {useCustomizeContext} from '../contexts/customizeContext';

// TODO: properly type navigation
const Home: React.FC<{navigation: any}> = ({navigation}) => {
  const [workout, setWorkout] = useState<WorkoutInterface | undefined>();
  const {workoutList} = useCustomizeContext();

  useEffect(() => {
    setWorkout(undefined);
  }, [workoutList]);

  const buttonDisabled = !workout;

  return (
    <Screen>
      <Text large style={{marginBottom: spacing.large}}>
        Welcome
      </Text>
      <View style={{marginBottom: spacing.normal}}>
        <WorkoutList
          workoutList={workoutList}
          onPress={item => setWorkout(item)}
          navigation={navigation}
        />
      </View>
      <View expand>
        {!!workout && (
          <View container>
            <Text
              medium
              bold
              style={{alignSelf: 'flex-start', marginBottom: spacing.normal}}>
              Selected Workout
            </Text>
            <View
              fullWidth
              style={{alignSelf: 'flex-start', paddingLeft: spacing.small}}>
              <View row fullWidth>
                <View expand centered>
                  <Text bold>{workout.name}</Text>
                </View>
                <View expand>
                  <Text bold>Components:</Text>
                  {workout.components.map(({name}, key) => (
                    <Text key={key}>- {name}</Text>
                  ))}
                </View>
              </View>
            </View>
          </View>
        )}
      </View>
      <View centered>
        <Button
          text="Start Workout"
          onPress={() => navigation.navigate(WORKOUT_SCREEN, {workout})}
          disabled={buttonDisabled}
        />
      </View>
    </Screen>
  );
};

export default Home;
