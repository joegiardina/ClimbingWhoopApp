import _ from 'lodash';
import React, {useState} from 'react';
import {
  View,
  TextInput,
  TextInputProps,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Text from './Text';
import Button from './Button';
import {ExerciseType} from '../interface';
import {useThemeContext} from '../contexts/themeContext';
import SelectDropdown from './SelectDropdown';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {saveCustomExercise} from '../api';
import {useCustomizeContext} from '../contexts/customizeContext';

interface ComponentCreationProps {}

const ComponentCreation: React.FC<ComponentCreationProps> = () => {
  const {themeContext} = useThemeContext();
  const {exerciseList} = useCustomizeContext();
  const {colors, fontSizes, radii, spacing} = themeContext;
  const {textColor} = colors;
  console.log(exerciseList);
  const [name, setName] = useState('');
  const [exercises, setExercises] = useState<ExerciseList>([]);

  const commonTextInputProps: TextInputProps = {
    style: {
      color: textColor,
      fontSize: fontSizes.medium,
      borderRadius: radii.normal,
      borderColor: textColor,
      borderWidth: 1,
      padding: spacing.small,
      width: '100%',
    },
    autoCapitalize: 'words',
  };

  return (
    <View style={{width: '100%'}}>
      <View style={{marginBottom: spacing.normal}}>
        <Text medium>Name</Text>
        <TextInput
          {...commonTextInputProps}
          onChangeText={text => setName(text)}
        />
      </View>
      {!!exercises.length && (
        <View
          style={{marginBottom: spacing.normal, marginLeft: spacing.normal}}>
          <Text medium>Exercises</Text>
          <FlatList
            data={exercises}
            renderItem={({item, index}) => {
              const onSelect = option => {
                const props = [...exercises];
                props[index] = option;
                setExercises(props);
              };
              const onDelete = () => {
                const props = [...exercises];
                _.pullAt(props, index);
                setExercises(props);
              };
              return (
                <View
                  style={{
                    marginTop: spacing.small,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <SelectDropdown options={exerciseList} onSelect={onSelect} />
                  <TouchableOpacity onPress={onDelete}>
                    <MaterialCommunityIcons
                      name="close"
                      color={textColor}
                      size={fontSizes.large}
                    />
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </View>
      )}
      <View style={{marginBottom: spacing.normal}}>
        <Button
          style={{marginBottom: spacing.small}}
          small
          outline
          text="Add Exercise"
          onPress={() => setExercises([...exercises, {} as ExerciseType])}
        />
      </View>
    </View>
  );
};

export default ComponentCreation;
