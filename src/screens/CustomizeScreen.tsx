import _ from 'lodash';
import React, {useState, useEffect} from 'react';
import {FlatList} from 'react-native';
import {useQuery} from 'react-query';
import Text from '../components/Text';
import View from '../components/View';
import Button from '../components/Button';
import ExerciseCreation from '../components/ExerciseCreation';
import WorkoutCreation from '../components/WorkoutCreation';
import Screen from '../components/Screen';
import {fetchExercises, fetchExerciseProps} from '../api';
import {spacing} from '../../style';
import {CustomizeContext} from '../contexts/customizeContext';
import useCustomize from '../hooks/useCustomize';

const CustomizeScreen = () => {
  const {ready, context} = useCustomize();
  const [creating, setCreating] = useState<
    'exercise' | 'workout' | undefined
  >();

  if (!ready) {
    return;
  }

  return (
    <CustomizeContext.Provider value={context}>
      <Screen>
        <Text large style={{marginBottom: spacing.large}}>
          Customize
        </Text>
        <View row>
          <Button
            text="Add Workout"
            outline
            style={{marginRight: spacing.small}}
            onPress={() => setCreating('workout')}
          />
          <Button
            text="Add Exercise"
            outline
            style={{marginRight: spacing.small}}
            onPress={() => setCreating('exercise')}
          />
          <Button text="Add Property" outline />
        </View>
        {!!creating && (
          <View style={{marginTop: spacing.large, width: '100%'}}>
            {creating === 'exercise' && <ExerciseCreation />}
            {creating === 'workout' && <WorkoutCreation />}
            <Button
              small
              text="Cancel"
              onPress={() => setCreating(undefined)}
              textOnly
            />
          </View>
        )}
      </Screen>
    </CustomizeContext.Provider>
  );
};

export default CustomizeScreen;
