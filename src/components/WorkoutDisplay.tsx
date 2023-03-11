import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import _ from 'lodash';
import {fontSizes, spacing} from '../../style';
import {WorkoutInterface, WorkoutComponentInterface} from '../interface';

const WorkoutDisplay: React.FC<{workout:WorkoutInterface, completed?:WorkoutComponentInterface[], onPress?:Function}> = ({workout, completed, onPress}) => {
  const {exertion, components} = workout;
  const textColor = 'white';
  const regularTextStyle = {color: textColor, fontSize: fontSizes.normal};
  const exertionTextStyle = {...regularTextStyle, marginRight: spacing.small, fontSize: fontSizes.medium};

  if (!workout || !workout.exertion) return null;
  return (
    <View style={{alignItems: 'flex-start', width: '100%', paddingLeft: spacing.normal}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', marginVertical: spacing.normal}}>
        <Text style={exertionTextStyle}>Exertion:</Text>
        <Text style={exertionTextStyle}>{Array.isArray(exertion) ? exertion.join(' / ') : exertion}</Text>
      </View>
      <View style={{paddingLeft: spacing.normal}}>
        {components?.map((workoutComponent, key) => {
          const {name, min, max, exercises} = workoutComponent;
          console.log(name, completed)
          return (
            <TouchableOpacity
              key={key}
              onPress={() => !!onPress && onPress(workoutComponent)}
              style={{
                marginBottom: spacing.normal,
                borderWidth: 1,
                borderRadius: 10,
                padding: spacing.small,
                borderColor: _.find(completed, {name}) ? 'green' : 'white'
              }}>
              <Text style={regularTextStyle}>{name}</Text>
              <Text style={regularTextStyle}>{min !== max ? `${min} to ${max} minutes` : `${min} minutes`}</Text>
              <Text style={regularTextStyle}>{JSON.stringify(exercises?.map(exercise => exercise.name))}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

export default WorkoutDisplay;
  