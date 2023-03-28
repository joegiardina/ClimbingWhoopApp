import _ from 'lodash';
import React, {useState} from 'react';
import Text from '../components/Text';
import View from '../components/View';
import Button from '../components/Button';
import {FlatList, TouchableOpacity} from 'react-native';
import ExerciseCreation from '../components/ExerciseCreation';
import WorkoutCreation from '../components/WorkoutCreation';
import Screen from '../components/Screen';
import {spacing} from '../../style';
import {WORKOUT_CREATION_SCREEN} from '../constants/navigation';
import {useCustomizeContext} from '../contexts/customizeContext';

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
      <View row>
        <Button
          text="Add Workout"
          outline
          style={{marginRight: spacing.small}}
          onPress={() => navigation.navigate(WORKOUT_CREATION_SCREEN)}
        />
        <Button
          text="Add Exercise"
          outline
          style={{marginRight: spacing.small}}
          onPress={() => setCreating('exercise')}
        />
        {/* <Button text="Add Property" outline /> */}
      </View>
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
      <View style={{alignSelf: 'flex-start', marginTop: spacing.large}}>
        <Text medium style={{marginBottom: spacing.small}}>
          Workouts
        </Text>
        <FlatList
          data={workoutList}
          renderItem={({item, index}) => {
            const onPress = () =>
              navigation.navigate(WORKOUT_CREATION_SCREEN, {workout: item});
            return (
              <TouchableOpacity
                key={index}
                style={{marginBottom: spacing.small}}
                onPress={onPress}>
                <Text>{item.name}</Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </Screen>
  );
};

export default CustomizeScreen;
