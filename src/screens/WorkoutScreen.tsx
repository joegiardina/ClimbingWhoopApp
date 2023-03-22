import React, {useState, useEffect, useCallback} from 'react';
import uuid from 'react-native-uuid';
import _ from 'lodash';
import {View} from 'react-native';
import WorkoutDisplay from '../components/WorkoutDisplay';
import Button from '../components/Button';
import {spacing} from '../../style';
import {WorkoutComponentInterface} from '../interface';
import {postCompleted} from '../api';
import {useThemeContext} from '../contexts/themeContext';

// TODO: properly type navigation and route
const Workout: React.FC<{navigation:any, route:any}> = ({navigation, route}) => {
  const {workout, result} = route.params;
  const {themeContext} = useThemeContext();
  const [completed, setCompleted] = useState<Array<WorkoutComponentInterface>>([]);
  useEffect(() => {
    setCompleted(
      _.compact(
        _.uniqBy([result, ...completed], 'name')
      )
    );
  }, [result]);
  
  const onPressComponent = useCallback((workoutComponent: WorkoutComponentInterface) => {
    navigation.navigate('WorkoutComponent', {workoutComponent, workout, completed});
  }, [completed]);
  
  if (!workout) return null;
  const buttonDisabled = completed.length !== workout.components.length

  return (
    <View
      style={{
        backgroundColor: themeContext.colors.backgroundColor,
        height: '100%',
        alignItems: 'center',
      }}>
      <WorkoutDisplay workout={workout} completed={completed} onPress={onPressComponent} />
      <Button
        text="Complete Workout"
        onPress={async () => {
          const data = {id: uuid.v4(), data: completed};
          const result = await postCompleted(data);
          if (result.success) {
            navigation.goBack();
          }
        }}
        disabled={buttonDisabled}
        style={{
          marginTop: 'auto',
          width: '80%',
        }} />
    </View>
  );
}

export default Workout;