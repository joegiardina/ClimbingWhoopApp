import React from 'react';
import Screen from '../components/Screen';
import ComponentCreation from '../components/ComponentCreation';
import {WORKOUT_CREATION_SCREEN} from '../constants/navigation';
import {WorkoutComponentInterface, WorkoutInterface} from '../interface';

const CreateComponentScreen: React.FC<{navigation: any; route: any}> = ({
  navigation,
  route,
}) => {
  const workout: WorkoutInterface = route.params?.workout;
  const workoutComponent: WorkoutComponentInterface =
    route.params?.workoutComponent;
  const onSave = (
    result: WorkoutComponentInterface,
    workout?: WorkoutInterface,
  ) => {
    navigation.navigate(WORKOUT_CREATION_SCREEN, {
      workout,
      workoutComponent: result,
    });
  };
  return (
    <Screen>
      <ComponentCreation
        workout={workout}
        workoutComponent={workoutComponent}
        onSave={onSave}
      />
    </Screen>
  );
};

export default CreateComponentScreen;
