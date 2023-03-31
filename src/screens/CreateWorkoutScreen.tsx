import React from 'react';
import Screen from '../components/Screen';
import WorkoutCreation from '../components/WorkoutCreation';
import {useCustomizeContext} from '../contexts/customizeContext';
import {WorkoutInterface} from '../interface';

const CreateWorkoutScreen: React.FC<{navigation: any; route: any}> = ({
  navigation,
  route,
}) => {
  const {saveWorkout, deleteWorkout} = useCustomizeContext();
  const onSave = async (result: WorkoutInterface) => {
    saveWorkout(result);
    navigation.goBack();
  };
  const onDelete = async (result: WorkoutInterface) => {
    deleteWorkout(result);
    navigation.goBack();
  };
  return (
    <Screen>
      <WorkoutCreation navigation={navigation} route={route} onSave={onSave} onDelete={onDelete} />
    </Screen>
  );
};

export default CreateWorkoutScreen;
