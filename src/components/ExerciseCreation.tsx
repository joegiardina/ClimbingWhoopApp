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
import {PropertyType} from '../interface';
import {useThemeContext} from '../contexts/themeContext';
import SelectDropdown from './SelectDropdown';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {saveCustomExercise} from '../api';
import {useCustomizeContext} from '../contexts/customizeContext';

interface ExerciseCreationProps {}

const ExerciseCreation: React.FC<ExerciseCreationProps> = () => {
  const {themeContext} = useThemeContext();
  const {colors, fontSizes, radii, spacing} = themeContext;
  const {textColor} = colors;
  const {propertyList} = useCustomizeContext();

  const [name, setName] = useState('');
  const [properties, setProperties] = useState<Array<PropertyType>>([]);

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
      <Text large>Add Exercise</Text>
      <View style={{marginBottom: spacing.normal}}>
        <Text medium>Name</Text>
        <TextInput
          {...commonTextInputProps}
          onChangeText={text => setName(text)}
        />
      </View>
      {!!properties.length && (
        <View style={{marginBottom: spacing.normal}}>
          <Text medium>Properties</Text>
          <FlatList
            data={properties}
            renderItem={({index}) => {
              const onSelect = option => {
                const props = [...properties];
                props[index] = option;
                setProperties(props);
              };
              const onDelete = () => {
                const props = [...properties];
                _.pullAt(props, index);
                setProperties(props);
              };
              return (
                <View
                  key={index}
                  style={{
                    marginTop: spacing.small,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <SelectDropdown options={propertyList} onSelect={onSelect} />
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
          text="Add Property"
          onPress={() => setProperties([...properties, {} as PropertyType])}
        />
        <Button
          text="Save"
          onPress={() => saveCustomExercise({name, properties})}
        />
      </View>
    </View>
  );
};

export default ExerciseCreation;
