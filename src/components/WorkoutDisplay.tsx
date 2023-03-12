import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import _ from 'lodash';
import {fontSizes, spacing, radii} from '../../style';
import {WorkoutInterface, WorkoutComponentInterface, ExerciseType} from '../interface';

const WorkoutDisplay: React.FC<{workout:WorkoutInterface, completed?:WorkoutComponentInterface[], onPress?:Function}> = ({workout, completed, onPress}) => {
  const {exertion, components} = workout;
  const textColor = 'white';
  const regularTextStyle = {color: textColor, fontSize: fontSizes.normal};
  const headerStyle = {...regularTextStyle, fontSize: fontSizes.medium};
  const [modalData, setModalData] = useState<ExerciseType | undefined>();

  const Modal = () => {
    const {exercises} = modalData;
    const exerciseNames = _.map(exercises, 'name');
    return (
      <TouchableOpacity
        onPress={() => setModalData(undefined)}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          padding: spacing.normal,
          alignItems: 'center'}}>
        <View style={{width: '100%', margin: spacing.large * 2, padding: spacing.normal, backgroundColor: 'white', borderRadius: radii.normal}}>
          <Text style={{fontSize: fontSizes.medium, marginBottom: spacing.normal}}>Choose an Exercise:</Text>
          <View style={{paddingLeft: spacing.small}}>
            {exerciseNames.map(name => (
              <TouchableOpacity
                key={name}
                onPress={() => {
                  if (onPress) {
                    onPress({...modalData, exercises: [_.find(exercises, {name})]})
                  }
                  setModalData(undefined);
                }}
                style={{marginBottom: spacing.small}}>
                <Text>{name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </TouchableOpacity>
    )
  };

  if (!workout || !workout.exertion) return null;
  return (
    <>
      <View style={{flex: 1, width: '100%'}}>
        <View style={{flexDirection: 'row', justifyContent: 'center', marginBottom: spacing.large}}>
          <Text style={headerStyle}>Exertion:</Text>
          <Text style={headerStyle}>{Array.isArray(exertion) ? exertion.join(' / ') : exertion}</Text>
        </View>

        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1}}>
            {components?.map((workoutComponent, key) => {
              const {name, min, max} = workoutComponent;
              return (
                <View key={key} style={{flexDirection: 'row', marginBottom: spacing.large}}>
                  <View style={{flex: 1}}>
                    <Text style={{...regularTextStyle, color: _.find(completed, {name}) ? 'green' : textColor}}>{name}</Text>
                    <Text style={regularTextStyle}>{min !== max ? `${min} to ${max} minutes` : `${min} minutes`}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => setModalData(workoutComponent)}
                    style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginHorizontal: spacing.large}}>
                    <Text style={{...regularTextStyle, color: 'green', fontSize: fontSizes.large}}>+</Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </View>

      </View>
      {!!modalData && <Modal />}
    </>
  );
}

export default WorkoutDisplay;
  