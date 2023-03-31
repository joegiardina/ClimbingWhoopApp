import React, {useState} from 'react';
import {FlatList, TouchableOpacity} from 'react-native';
import View from './View';
import Text from './Text';
import WorkoutDisplay from './WorkoutDisplay';
import {WorkoutInterfaceList, WorkoutInterface} from '../interface';
import { useThemeContext } from '../contexts/themeContext';
import Button from './Button';
import { WORKOUT_CREATION_SCREEN, CUSTOMIZE_SCREEN } from '../constants/navigation';

type WorkoutListInput = {
  workoutList: WorkoutInterfaceList;
  onPress: (item: WorkoutInterface) => void;
  navigation: any;
  showAdd?: boolean;
};

const WorkoutList: React.FC<WorkoutListInput> = ({workoutList, onPress, navigation, showAdd}) => {
  const {themeContext} = useThemeContext();
  const {spacing} = themeContext;
  return (
    <View container>
      <Text medium bold style={{marginBottom: spacing.normal}}>
        Workouts
      </Text>
      <View row style={{paddingLeft: spacing.small}}>
        <FlatList
          data={workoutList}
          renderItem={({item, index}) => (
            <TouchableOpacity
              key={index}
              style={{marginBottom: spacing.small}}
              onPress={() => onPress(item)}>
                <View row style={{alignItems: 'flex-end'}}>
                  <Text style={{flex: 1}}>{item.name}</Text>
                </View>
            </TouchableOpacity>
          )}
        />
        {showAdd && (
          <View>
            <Button small text="Workout +" onPress={() => navigation.navigate(WORKOUT_CREATION_SCREEN)} />
          </View>
        )}
      </View>
    </View>
  );
};

export default WorkoutList;
