import React from 'react';
import Screen from '../components/Screen';
import WorkoutCreation from '../components/WorkoutCreation';
import {useCustomizeContext} from '../contexts/customizeContext';
import {WorkoutInterface} from '../interface';

const CreateWorkoutScreen: React.FC<{navigation: any; route: any}> = ({
  navigation,
  route,
}) => {
  const {saveCustomWorkout} = useCustomizeContext();
  const onSave = async (result: WorkoutInterface) => {
    saveCustomWorkout(result);
    navigation.goBack();
  };
  return (
    <Screen>
      <WorkoutCreation navigation={navigation} route={route} onSave={onSave} />
    </Screen>
  );
};

export default CreateWorkoutScreen;
