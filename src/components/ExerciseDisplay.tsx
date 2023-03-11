import React, {useState, useEffect} from 'react';
import {View, Text, TextInput} from 'react-native';
import _ from 'lodash';
import {fontSizes, spacing} from '../../style';
import {ExerciseType} from '../interface';

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

// TODO update types
const ExerciseDisplay: React.FC<{exercise:ExerciseType, result:any, setResult:any, completed:any}> = ({exercise, result, setResult, completed}) => {
  const {name} = exercise;
  const [values, setValues] = useState(completed ? completed[name] : {});
  const textColor = 'white';
  const regularTextStyle = {color: textColor, fontSize: fontSizes.normal};
  const smallTextStyle = {color: textColor, fontSize: fontSizes.small};

  useEffect(() => {
    if (_.keys(values).length) {
      setResult({...result, [name]: values})
    }
  }, [values]);

  return (
    <View style={{alignItems: 'flex-start', width: '100%', flex: 1}}>
      <Text style={{...regularTextStyle, marginBottom: spacing.normal}}>{name}</Text>
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
            <Text style={{...smallTextStyle, flex: 1}}>{property.name}</Text>
            <TextInput
              keyboardType={property.type === 'number' ? 'number-pad' : 'default'}
              style={{
                flex: 1,
                padding: spacing.small,
                backgroundColor: 'white',
                borderRadius: 4,
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
  