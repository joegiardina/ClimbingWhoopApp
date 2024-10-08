import React, {useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import _ from 'lodash';
import {spacing, radii} from '../../style';
import {
  WorkoutInterface,
  WorkoutComponentInterface,
  ExerciseInterface,
} from '../interface';
import Timer from './Timer';
import Text from './Text';
import Button from './Button';
import {useThemeContext} from '../contexts/themeContext';

interface ModalProps {
  modalData: any;
  setModalData: any;
  selectedExercise: any;
  setSelectedExercise: any;
  backgroundColor: string;
  textColor: string;
  onPress?: Function;
}

const Modal: React.FC<ModalProps> = ({
  modalData,
  setModalData,
  selectedExercise,
  setSelectedExercise,
  backgroundColor,
  textColor,
  onPress,
}) => {
  const {exercises} = modalData;
  const exerciseNames = _.map(exercises, 'name');
  const buttonDisabled = !selectedExercise;
  return (
    <TouchableOpacity
      onPress={() => {
        setSelectedExercise(undefined);
        setModalData(undefined);
      }}
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        padding: spacing.normal,
        alignItems: 'center',
      }}>
      <View
        style={{
          width: '100%',
          margin: spacing.large * 2,
          padding: spacing.normal,
          backgroundColor,
          borderRadius: radii.normal,
          borderWidth: 1,
          borderColor: textColor,
        }}>
        <Text large style={{marginBottom: spacing.normal}}>
          Choose an Exercise:
        </Text>
        <View style={{paddingLeft: spacing.small}}>
          {exerciseNames.map(name => (
            <TouchableOpacity
              key={name}
              onPress={() => setSelectedExercise(_.find(exercises, {name}))}
              style={{marginBottom: spacing.normal}}>
              <Text favorable={selectedExercise?.name === name} medium>
                {name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <Button
          text="Continue"
          disabled={buttonDisabled}
          onPress={() => {
            if (onPress) {
              onPress({...modalData, exercises: [selectedExercise]});
            }
            setModalData(undefined);
            setSelectedExercise(undefined);
          }}
        />
      </View>
    </TouchableOpacity>
  );
};

const WorkoutDisplay: React.FC<{
  workout: WorkoutInterface;
  completed?: WorkoutComponentInterface[];
  onPress?: Function;
  displayOnly?: boolean;
}> = ({workout, completed, onPress, displayOnly}) => {
  const {exertion, components} = workout;
  const {themeContext} = useThemeContext();
  const {textColor, backgroundColor} = themeContext.colors;
  const [selectedExercise, setSelectedExercise] = useState<
    ExerciseInterface | undefined
  >();
  const [modalData, setModalData] = useState<ExerciseInterface | undefined>();
  const [timerDuration, setTimerDuration] = useState<number | undefined>();

  if (!workout) {
    return null;
  }

  return (
    <>
      <View style={{flex: 1, width: '100%'}}>
        {!!workout.exertion && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginBottom: spacing.large,
            }}>
            <Text medium>Exertion:</Text>
            <Text medium>
              {Array.isArray(exertion) ? exertion.join(' / ') : exertion}
            </Text>
          </View>
        )}

        <Text large>Components</Text>
        <View style={{marginTop: spacing.normal, flexDirection: 'row'}}>
          <View style={{flex: 1}}>
            {components?.map((workoutComponent, key) => {
              const {name, min, max} = workoutComponent;
              const isCompleted = !!_.find(completed, {name});
              return (
                <View
                  key={key}
                  style={{flexDirection: 'row', marginBottom: spacing.large}}>
                  <View style={{flex: 1}}>
                    <Text medium bold={isCompleted} favorable={isCompleted}>
                      {name}
                    </Text>
                    {min && max && (
                      <Text favorable={isCompleted}>
                        {min !== max
                          ? `${min} to ${max} minutes`
                          : `${min} minutes`}
                      </Text>
                    )}
                  </View>
                  {!displayOnly && (
                    <TouchableOpacity
                      onPress={() => setModalData(workoutComponent)}
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'flex-end',
                        marginHorizontal: spacing.large,
                      }}>
                      <Text large>+</Text>
                    </TouchableOpacity>
                  )}
                </View>
              );
            })}
          </View>
        </View>
        {!displayOnly && (
          <View style={{marginTop: spacing.large, flex: 1}}>
            {!timerDuration ? (
              <>
                <Text
                  large
                  style={{
                    marginBottom: spacing.medium,
                  }}>
                  Rest
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}>
                  <Button
                    outline
                    onPress={() => setTimerDuration(60)}
                    text="1 min"
                  />
                  <Button
                    outline
                    onPress={() => setTimerDuration(180)}
                    text="3 min"
                  />
                  <Button
                    outline
                    onPress={() => setTimerDuration(300)}
                    text="5 min"
                  />
                </View>
              </>
            ) : (
              <TouchableOpacity
                style={{flex: 1}}
                onLongPress={() => setTimerDuration(undefined)}>
                <Timer
                  onFinish={() => setTimerDuration(undefined)}
                  prepTime={0}
                  workTime={0}
                  restTime={timerDuration}
                  reps={1}
                  sets={1}
                  autoStart
                />
                <Text
                  small
                  style={{textAlign: 'center', marginTop: spacing.small}}>
                  Tap and Hold Timer to Cancel
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
      {!!modalData && (
        <Modal
          modalData={modalData}
          setModalData={setModalData}
          selectedExercise={selectedExercise}
          setSelectedExercise={setSelectedExercise}
          backgroundColor={backgroundColor}
          textColor={textColor}
          onPress={onPress}
        />
      )}
    </>
  );
};

export default WorkoutDisplay;
