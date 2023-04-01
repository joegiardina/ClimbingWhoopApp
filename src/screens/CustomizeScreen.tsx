import React, {useState} from 'react';
import Text from '../components/Text';
import View from '../components/View';
import Button from '../components/Button';
import ExerciseCreation from '../components/ExerciseCreation';
import WorkoutList from '../components/WorkoutList';
import Screen from '../components/Screen';
import {spacing} from '../../style';
import {WORKOUT_CREATION_SCREEN} from '../constants/navigation';
import {useCustomizeContext} from '../contexts/customizeContext';
import {WorkoutInterface} from '../interface';

const CustomizeScreen: React.FC<{navigation: any}> = ({navigation}) => {
  const customizeContext = useCustomizeContext();
  const {workoutList} = customizeContext;
  const [creating, setCreating] = useState<
    'exercise' | 'workout' | undefined
  >();
  return (
    <Screen>
      <Text large style={{marginBottom: spacing.large}}>
        Customize
      </Text>
      <WorkoutList
        workoutList={workoutList}
        navigation={navigation}
        showAdd
        onPress={(item: WorkoutInterface) =>
          navigation.navigate(WORKOUT_CREATION_SCREEN, {workout: item})
        }
      />
      {!!creating && (
        <View style={{marginTop: spacing.large, width: '100%'}}>
          {creating === 'exercise' && <ExerciseCreation />}
          <Button
            small
            text="Cancel"
            onPress={() => setCreating(undefined)}
            textOnly
          />
        </View>
      )}
      <View expand />
      <View centered>
        <Button
          text="Add Exercise"
          outline
          style={{marginRight: spacing.small}}
          onPress={() => setCreating('exercise')}
        />
      </View>
    </Screen>
  );
};

export default CustomizeScreen;
