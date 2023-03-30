import React, {useState, useEffect, useCallback} from 'react';
import _ from 'lodash';
import WorkoutDisplay from '../components/WorkoutDisplay';
import Screen from '../components/Screen';
import Button from '../components/Button';
import {WorkoutComponentInterface} from '../interface';
import {useQuery, useQueryClient} from 'react-query';
import {saveWorkout, fetchTodaysWorkout} from '../api';
import {WORKOUT_COMPONENT_SCREEN} from '../constants/navigation';

// TODO: properly type navigation and route
const Workout: React.FC<{navigation: any; route: any}> = ({
  navigation,
  route,
}) => {
  const {workout, result} = route.params;
  const [completed, setCompleted] = useState<Array<WorkoutComponentInterface>>(
    [],
  );
  console.log(workout);
  const queryClient = useQueryClient();
  const {data} = useQuery('todaysWorkout', fetchTodaysWorkout);
  useEffect(() => {
    if (data?.data?.exercises) {
      setCompleted(data.data.exercises);
    }
  }, [data]);

  useEffect(() => {
    if (result) {
      setCompleted(_.compact(_.uniqBy([result, ...completed], 'name')));
    }
  }, [result]);

  const onPressComponent = useCallback(
    (workoutComponent: WorkoutComponentInterface) => {
      navigation.navigate(WORKOUT_COMPONENT_SCREEN, {
        workoutComponent,
        workout,
        completed,
      });
    },
    [completed],
  );

  if (!workout) {
    return null;
  }
  const buttonDisabled = completed.length === 0;

  return (
    <Screen>
      <WorkoutDisplay
        workout={workout}
        completed={completed}
        onPress={onPressComponent}
      />
      <Button
        text="Save Workout"
        onPress={async () => {
          const result = await saveWorkout({exercises: completed});
          if (result.success) {
            queryClient.invalidateQueries('allHistoricalWorkouts');
            navigation.goBack();
          }
        }}
        disabled={buttonDisabled}
        style={{
          marginTop: 'auto',
          width: '80%',
        }}
      />
    </Screen>
  );
};

export default Workout;
