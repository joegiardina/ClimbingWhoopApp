import React, {useState} from 'react';
import _ from 'lodash';
import {TouchableOpacity, Text, ScrollView, useColorScheme} from 'react-native';
import ExerciseDisplay from '../components/ExerciseDisplay';
import {spacing, fontSizes, radii} from '../../style';
import {ExerciseType} from '../interface';
import {WORKOUT_SCREEN} from '../constants/navigation';

// TODO: properly type route
const WorkoutComponent: React.FC<{route: any; navigation: any}> = ({
  route,
  navigation,
}) => {
  const {workoutComponent, completed} = route.params;
  const isDarkMode = useColorScheme() === 'dark';
  const textColor = isDarkMode ? 'white' : 'black';
  const {name, min, max, exercises} = workoutComponent;
  const [result, setResult] = useState({});

  if (!workoutComponent) {
    return null;
  }

  return (
    <ScrollView
      contentContainerStyle={{
        backgroundColor: isDarkMode ? 'black' : 'white',
        alignItems: 'center',
        paddingVertical: spacing.large,
        padding: spacing.normal,
      }}>
      <Text style={{fontSize: fontSizes.large, color: textColor}}>{name}</Text>
      <Text
        style={{
          margin: spacing.normal,
          fontSize: fontSizes.medium,
          color: textColor,
        }}>
        Duration: {min !== max ? `${min} to ${max} minutes` : `${min} minutes`}
      </Text>
      {exercises?.map((exercise: ExerciseType, key: number) => (
        <ExerciseDisplay
          key={key}
          result={result}
          setResult={setResult}
          exercise={exercise}
          completed={_.find(completed, {name})?.result}
          navigation={navigation}
        />
      ))}
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(WORKOUT_SCREEN, {
            ...route.params,
            result: {name, result},
          })
        }
        style={{
          marginBottom: spacing.large,
          width: '80%',
          backgroundColor: 'green',
          borderRadius: radii.normal,
          padding: 12,
        }}>
        <Text style={{textAlign: 'center', color: 'white'}}>Save</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default WorkoutComponent;
