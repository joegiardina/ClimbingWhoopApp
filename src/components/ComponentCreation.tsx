import _ from 'lodash';
import React, {useState} from 'react';
import {
  TextInput,
  TextInputProps,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import View from './View';
import Text from './Text';
import Button from './Button';
import {
  ExerciseInterface,
  WorkoutComponentInterface,
  WorkoutInterface,
} from '../interface';
import {useThemeContext} from '../contexts/themeContext';
import SelectDropdown from './SelectDropdown';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ExerciseInterfaceList} from '../interface';
import {useCustomizeContext} from '../contexts/customizeContext';

interface ComponentCreationProps {
  workout?: WorkoutInterface;
  workoutComponent?: WorkoutComponentInterface;
  onSave: (
    component: WorkoutComponentInterface,
    workout?: WorkoutInterface,
  ) => void;
}

const ComponentCreation: React.FC<ComponentCreationProps> = ({
  onSave,
  workout,
  workoutComponent,
}) => {
  const {themeContext} = useThemeContext();
  const {exerciseList} = useCustomizeContext();
  const {colors, fontSizes, radii, spacing} = themeContext;
  const {textColor} = colors;
  const [name, setName] = useState(workoutComponent?.name || '');
  const [exercises, setExercises] = useState<ExerciseInterfaceList>(
    workoutComponent?.exercises || [],
  );
  const [openOptions, setOpenOptions] = useState(false);

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
          defaultValue={name}
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
            renderItem={({index}) => {
              const onSelect = (option: ExerciseInterface) => {
                const items = [...exercises];
                items[index] = option;
                setExercises(items);
                setOpenOptions(false);
              };
              const onDelete = () => {
                const items = [...exercises];
                _.pullAt(items, index);
                setExercises(items);
                setOpenOptions(false);
              };
              return (
                <View
                  key={index}
                  style={{
                    marginTop: spacing.small,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <SelectDropdown
                    auto={openOptions}
                    option={exercises[index]}
                    options={exerciseList}
                    onSelect={onSelect}
                  />
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
          onPress={() => {
            setExercises([...exercises, {} as ExerciseInterface]);
            setOpenOptions(true);
          }}
        />
      </View>
      <Button
        text="Save"
        onPress={() => onSave({...workoutComponent, name, exercises}, workout)}
      />
    </View>
  );
};

export default ComponentCreation;
