import React, {useState, useEffect, useCallback} from 'react';
import _ from 'lodash';
import {View} from 'react-native';
import WorkoutDisplay from '../components/WorkoutDisplay';
import Button from '../components/Button';
import {WorkoutComponentInterface} from '../interface';
import useUser from '../hooks/useUser';
import {postCompleted} from '../api';
import {useThemeContext} from '../contexts/themeContext';
import {WORKOUT_COMPONENT_SCREEN} from '../constants/navigation';

// TODO: properly type navigation and route
const Workout: React.FC<{navigation: any; route: any}> = ({
  navigation,
  route,
}) => {
  const {workout, result} = route.params;
  const {user} = useUser();
  const {themeContext} = useThemeContext();
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
    <View
      style={{
        backgroundColor: themeContext.colors.backgroundColor,
        height: '100%',
        alignItems: 'center',
      }}>
      <WorkoutDisplay
        workout={workout}
        completed={completed}
        onPress={onPressComponent}
      />
      <Button
        text="Complete Workout"
        onPress={async () => {
          const result = await postCompleted({exercises: completed, user});
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
    </View>
  );
};

export default Workout;
