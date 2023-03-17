import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import _ from 'lodash';
import {fontSizes, spacing, radii} from '../../style';
import {WorkoutInterface, WorkoutComponentInterface, ExerciseType} from '../interface';
import Timer from './Timer';

const WorkoutDisplay: React.FC<{workout:WorkoutInterface, completed?:WorkoutComponentInterface[], onPress?:Function}> = ({workout, completed, onPress}) => {
  const {exertion, components} = workout;
  const textColor = 'white';
  const regularTextStyle = {color: textColor, fontSize: fontSizes.normal};
  const headerStyle = {...regularTextStyle, fontSize: fontSizes.medium};
  const [selectedExercise, setSelectedExercise] = useState<ExerciseType | undefined>();
  const [modalData, setModalData] = useState<ExerciseType | undefined>();
  const [timerDuration, setTimerDuration] = useState<number | undefined>();

  const Modal = () => {
    const {exercises} = modalData;
    const exerciseNames = _.map(exercises, 'name');
    const buttonDisabled = !selectedExercise;
    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedExercise(undefined);
          setModalData(undefined)
        }}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          padding: spacing.normal,
          alignItems: 'center'}}>
        <View style={{
          width: '100%',
          margin: spacing.large * 2,
          padding: spacing.normal,
          backgroundColor: 'white',
          borderRadius: radii.normal,
        }}>
          <Text style={{fontSize: fontSizes.large, marginBottom: spacing.normal}}>Choose an Exercise:</Text>
          <View style={{paddingLeft: spacing.small}}>
            {exerciseNames.map(name => (
              <TouchableOpacity
                key={name}
                onPress={() => {
                  setSelectedExercise(_.find(exercises, {name}));
                }}
                style={{marginBottom: spacing.normal}}>
                <Text style={{fontSize: fontSizes.medium}}>{name}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity
            onPress={() => {
              if (onPress) {
                onPress({...modalData, exercises: [selectedExercise]});
              }
              setModalData(undefined);
              setSelectedExercise(undefined);
            }}
            style={{
              width: '80%',
              backgroundColor: buttonDisabled ? 'gray' : 'green',
              borderRadius: radii.normal,
              padding: 12,
              alignSelf: 'center',
            }}
          >
            <Text style={{textAlign: 'center', color: 'white'}}>Continue</Text>
          </TouchableOpacity>
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
        <View style={{margin: spacing.large, flex: 1}}>
        {!timerDuration ? (
          <>
            <Text style={{alignSelf: 'center', fontSize: fontSizes.large, color: textColor, marginBottom: spacing.medium}}>Rest</Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <TouchableOpacity
                onPress={() => setTimerDuration(3)}
                style={{padding: spacing.small, justifyContent: 'center', alignItems: 'center', borderColor: textColor, borderWidth: 1, borderRadius: radii.normal}}>
                <Text style={{...regularTextStyle, color: textColor, fontSize: fontSizes.large}}>1 min</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setTimerDuration(180)}
                style={{padding: spacing.small, justifyContent: 'center', alignItems: 'center', borderColor: textColor, borderWidth: 1, borderRadius: radii.normal}}>
                <Text style={{...regularTextStyle, color: textColor, fontSize: fontSizes.large}}>3 min</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setTimerDuration(300)}
                style={{padding: spacing.small, justifyContent: 'center', alignItems: 'center', borderColor: textColor, borderWidth: 1, borderRadius: radii.normal}}>
                <Text style={{...regularTextStyle, color: textColor, fontSize: fontSizes.large}}>5 min</Text>
              </TouchableOpacity>
            </View>
          </>
          ) : (
            <Timer onFinish={() => setTimerDuration(undefined)} durationPrep={2} durationWork={2} durationRest={2} reps={2} sets={2} autoStart />
          )}
        </View>

      </View>
      {!!modalData && <Modal />}
    </>
  );
}

export default WorkoutDisplay;
  