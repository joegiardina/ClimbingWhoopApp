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
import {WorkoutComponentInterface, WorkoutComponentList} from '../interface';
import {useThemeContext} from '../contexts/themeContext';
import SelectDropdown from './SelectDropdown';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {saveCustomExercise} from '../api';
import ComponentCreation from './ComponentCreation';
import {useCustomizeContext} from '../contexts/customizeContext';

interface WorkoutCreationProps {}

const WorkoutCreation: React.FC<WorkoutCreationProps> = () => {
  const {themeContext} = useThemeContext();
  const {componentList} = useCustomizeContext();
  const {colors, fontSizes, radii, spacing} = themeContext;
  const {textColor} = colors;
  console.log(componentList);
  const [name, setName] = useState('');
  const [components, setComponents] = useState<WorkoutComponentList>([]);

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
      <Text large>Add Workout</Text>
      <View style={{marginBottom: spacing.normal}}>
        <Text medium>Name</Text>
        <TextInput
          {...commonTextInputProps}
          onChangeText={text => setName(text)}
        />
      </View>
      {!!components.length && (
        <View style={{marginLeft: spacing.normal}}>
          <FlatList
            data={components}
            renderItem={({item, index}) => {
              return <ComponentCreation />;
            }}
          />
        </View>
      )}
      <View style={{marginBottom: spacing.normal}}>
        <Button
          style={{marginBottom: spacing.small}}
          small
          outline
          text="Add Component"
          onPress={() =>
            setComponents([...components, {} as WorkoutComponentInterface])
          }
        />
        {/* <Button text="Save" onPress={() => {
          console.log(JSON.stringify(exercises, null, 2))
        }} /> */}
      </View>
    </View>
  );
};

export default WorkoutCreation;
