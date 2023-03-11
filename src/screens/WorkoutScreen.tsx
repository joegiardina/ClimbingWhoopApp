import React, {useState, useEffect, useCallback} from 'react';
import uuid from 'react-native-uuid';
import {useColorScheme} from 'react-native';
import _ from 'lodash';
import {View, TouchableOpacity, Text} from 'react-native';
import WorkoutDisplay from '../components/WorkoutDisplay';
import {spacing} from '../../style';
import {WorkoutComponentInterface} from '../interface';
import {postCompleted} from '../api';

// TODO: properly type navigation and route
const Workout: React.FC<{navigation:any, route:any}> = ({navigation, route}) => {
  const {workout, result} = route.params;
  const isDarkMode = useColorScheme() === 'dark';
  const [completed, setCompleted] = useState<Array<WorkoutComponentInterface>>([]);
  const [error, setError] = useState<string>('');
  console.log('workout', JSON.stringify(workout, null, 2));
  useEffect(() => {
    setCompleted(
      _.compact(
        _.uniqBy([result, ...completed], 'name')
      )
    );
  }, [result]);
  
  const onPressComponent = useCallback((workoutComponent: WorkoutComponentInterface) => {
    navigation.navigate('WorkoutComponent', {workoutComponent, workout, completed});
    // console.log('onPress', workoutComponent);
  }, [completed]);
  
  if (!workout) return null;
  const buttonDisabled = completed.length !== workout.components.length

  return (
    <View
    style={{
      backgroundColor: isDarkMode ? 'black' : 'white',
      display: 'flex',
      height: '100%',
      alignItems: 'center',
      paddingVertical: spacing.large,
    }}>
      <WorkoutDisplay workout={workout} completed={completed} onPress={onPressComponent} />
      <TouchableOpacity
        onPress={async () => {
          const data = {id: uuid.v4(), data: completed};
          console.log('complete workout', JSON.stringify(data, null, 2));
          const result = await postCompleted(data);
          if (result.success) {
            navigation.goBack();
          } else {
            setError('Something went wrong.');
          }
        }}
        disabled={buttonDisabled}
        style={{
          marginTop: 'auto',
          marginBottom: spacing.large,
          width: '80%',
          backgroundColor: buttonDisabled ? 'gray' : 'green',
          borderRadius: 6,
          padding: 12,
        }}>
        <Text style={{textAlign: 'center', color: 'white'}}>Complete Workout</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Workout;