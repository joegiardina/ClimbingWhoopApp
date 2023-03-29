import React from 'react';
import {FlatList, TouchableOpacity} from 'react-native';
import View from './View';
import Text from './Text';
import {spacing} from '../../style';
import {WorkoutInterfaceList, WorkoutInterface} from '../interface';

type WorkoutListInput = {
  workoutList: WorkoutInterfaceList;
  onPress: (item: WorkoutInterface) => void;
};

const WorkoutList: React.FC<WorkoutListInput> = ({workoutList, onPress}) => {
  return (
    <View style={{alignSelf: 'flex-start', marginTop: spacing.large, flex: 1}}>
      <Text medium style={{marginBottom: spacing.small}}>
        Workouts
      </Text>
      <FlatList
        data={workoutList}
        renderItem={({item, index}) => (
          <TouchableOpacity
            key={index}
            style={{marginBottom: spacing.small}}
            onPress={() => onPress(item)}>
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default WorkoutList;
