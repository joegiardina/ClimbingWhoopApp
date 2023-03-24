import React, {useState, useEffect, useCallback} from 'react';
import _ from 'lodash';
import WorkoutDisplay from '../components/WorkoutDisplay';
import Screen from '../components/Screen';
import Button from '../components/Button';
import {WorkoutComponentInterface} from '../interface';
import useUser from '../hooks/useUser';
import {saveWorkout} from '../api';
import {useThemeContext} from '../contexts/themeContext';
import {WORKOUT_COMPONENT_SCREEN} from '../constants/navigation';

// TODO: properly type navigation and route
const Workout: React.FC<{navigation: any; route: any}> = ({
  navigation,
  route,
}) => {
  const {workout, result} = route.params;
  const {user} = useUser();
  const [completed, setCompleted] = useState<Array<WorkoutComponentInterface>>(
    [],
  );
  useEffect(() => {
    setCompleted(_.compact(_.uniqBy([result, ...completed], 'name')));
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
  const buttonDisabled = completed.length !== workout.components.length;

  return (
    <Screen>
      <WorkoutDisplay
        workout={workout}
        completed={completed}
        onPress={onPressComponent}
      />
      <Button
        text="Complete Workout"
        onPress={async () => {
          const result = await saveWorkout({exercises: completed});
          if (result.success) {
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
