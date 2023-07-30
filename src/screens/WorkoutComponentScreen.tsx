import React, {useState} from 'react';
import _ from 'lodash';
import {ScrollView} from 'react-native';
import Screen from '../components/Screen';
import Button from '../components/Button';
import Text from '../components/Text';
import ExerciseDisplay from '../components/ExerciseDisplay';
import {ExerciseInterface} from '../interface';
import {WORKOUT_SCREEN} from '../constants/navigation';

// TODO: properly type route
const WorkoutComponent: React.FC<{route: any; navigation: any}> = ({
  route,
  navigation,
}) => {
  const {workoutComponent, completed} = route.params;
  const {name, min, max, exercises} = workoutComponent;
  const [result, setResult] = useState({});

  if (!workoutComponent) {
    return null;
  }

  return (
    <Screen>
      <ScrollView contentContainerStyle={{width: '100%', alignItems: 'center'}}>
        <Text large>{name}</Text>
        {(min || max) && (
          <Text medium>
            Duration:{' '}
            {min !== max ? `${min} to ${max} minutes` : `${min} minutes`}
          </Text>
        )}
        {exercises?.map((exercise: ExerciseInterface, key: number) => (
          <ExerciseDisplay
            key={key}
            result={result}
            setResult={setResult}
            exercise={exercise}
            completed={_.find(completed, {name})?.result}
            navigation={navigation}
          />
        ))}
        <Button
          text="Save"
          onPress={() =>
            navigation.navigate(WORKOUT_SCREEN, {
              ...route.params,
              result: {name, result},
            })
          }
        />
      </ScrollView>
    </Screen>
  );
};

export default WorkoutComponent;
