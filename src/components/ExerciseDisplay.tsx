import _ from 'lodash';
import React, {useState, useEffect} from 'react';
import {View, TextInput} from 'react-native';
import Text from './Text';
import Button from './Button';
import {spacing} from '../../style';
import {ExerciseType} from '../interface';
import {useThemeContext} from '../contexts/themeContext';

interface PropertyInterface {
  name: string,
  type: string,
};

const formatValue = (type:string, text:string) => {
  if (type === 'number') {
    return Number(text);
  }
  return text;
}

const timerPropNames = [
  'Duration On (sec)',
  'Duration Off (sec)',
  'Reps',
  'Sets',
];

// TODO update types
const ExerciseDisplay: React.FC<{exercise:ExerciseType, result:any, setResult:any, completed:any, navigation:any}> = ({exercise, result, setResult, completed, navigation}) => {
  const {name} = exercise;
  const [values, setValues] = useState(completed && completed[name] || {});
  const {themeContext} = useThemeContext();
  const {textColor, backgroundColor} = themeContext.colors;
  const showTimerButton = _.every(timerPropNames, name => _.find(exercise.properties, {name}));
  const timerButtonDisabled = !_.every(timerPropNames, name => !!values[name]);

  useEffect(() => {
    if (_.keys(values).length) {
      setResult({...result, [name]: values})
    }
  }, [values]);

  return (
    <View style={{alignItems: 'flex-start', width: '100%', flex: 1}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.normal}}>
        <Text inputStyle={{flex: 1}}>{name}</Text>
        {showTimerButton && (
            <Button
              text="Timer"
              onPress={() => navigation.navigate('TimerScreen', {
                durationWork: values[timerPropNames[0]],
                durationRest: values[timerPropNames[1]],
                reps: values[timerPropNames[2]],
                sets: values[timerPropNames[3]],
                durationPrep: 3,
              })}
              disabled={timerButtonDisabled}
              style={{
                borderColor: timerButtonDisabled ? 'gray' : textColor,
                padding: spacing.small
              }}/>
        )}
      </View>
        
      <View style={{flex: 1}}>
        {exercise.properties.map((property:PropertyInterface, key:number) => (
          <View
            key={key}
            style={{
              flexDirection: 'row',
              marginBottom: spacing.normal,
              paddingHorizontal: spacing.normal,
              width: '100%',
            }}>
            <Text small inputStyle={{flex: 1}}>{property.name}</Text>
            <TextInput
              keyboardType={property.type === 'number' ? 'number-pad' : 'default'}
              style={{
                flex: 1,
                padding: spacing.small,
                backgroundColor,
                borderRadius: 4,
                borderColor: textColor,
                borderWidth: 1,
                marginLeft: spacing.normal,
              }}
              value={values[property.name] ? String(values[property.name]) : ''}
              onChangeText={(text) => setValues({...values, [property.name]: formatValue(property.type, text)})}
            />
          </View>
        ))}
      </View>
    </View>
  );
}

export default ExerciseDisplay;
  