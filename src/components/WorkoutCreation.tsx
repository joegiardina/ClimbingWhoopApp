import _ from 'lodash';
import React, {useEffect, useState} from 'react';
import {
  TextInput,
  TextInputProps,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import View from './View';
import Text from './Text';
import Button from './Button';
import {WorkoutComponentList, WorkoutInterface} from '../interface';
import {useThemeContext} from '../contexts/themeContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {COMPONENT_CREATION_SCREEN} from '../constants/navigation';

interface WorkoutCreationProps {
  navigation: any;
  route: any;
  onSave: (input: WorkoutInterface) => void;
  onDelete: (input: WorkoutInterface) => void;
}

const WorkoutCreation: React.FC<WorkoutCreationProps> = ({
  navigation,
  route,
  onSave,
  onDelete,
}) => {
  const workout = route?.params?.workout || {};
  const {themeContext} = useThemeContext();
  const {colors, fontSizes, radii, spacing} = themeContext;
  const {textColor} = colors;
  const [name, setName] = useState(workout.name || '');
  const [components, setComponents] = useState<WorkoutComponentList>(
    workout.components || [],
  );
  const result: WorkoutInterface = {...workout, name, components};

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

  useEffect(() => {
    if (route.params?.workoutComponent) {
      setComponents(
        _.uniqBy([route.params.workoutComponent, ...components], 'name'),
      );
    }
  }, [route.params]);

  return (
    <View expand>
      <View style={{marginBottom: spacing.large}}>
        <Text medium>Name</Text>
        <TextInput
          defaultValue={name}
          {...commonTextInputProps}
          onChangeText={text => setName(text)}
        />
      </View>
      {!!components.length && (
        <>
          <Text medium>Components</Text>
          <View style={{marginLeft: spacing.small}}>
            <FlatList
              data={components}
              renderItem={({item, index}) => {
                const onDelete = () => {
                  const comps = [...components];
                  _.pullAt(comps, index);
                  setComponents(comps);
                };
                return (
                  <View row>
                    <TouchableOpacity
                      style={{marginBottom: spacing.small, flex: 1}}
                      onPress={() =>
                        navigation.navigate(COMPONENT_CREATION_SCREEN, {
                          workout: result,
                          workoutComponent: item,
                        })
                      }>
                      <Text>{item.name}</Text>
                      <Text small>
                        {JSON.stringify(_.map(item.exercises, 'name'))}
                      </Text>
                    </TouchableOpacity>
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
        </>
      )}
      <Button
        style={{marginBottom: spacing.normal}}
        small
        outline
        text="Add Component"
        onPress={() =>
          navigation.navigate(COMPONENT_CREATION_SCREEN, {workout: result})
        }
      />
      <View expand />
      <Button text="Save" onPress={() => onSave(result)} style={{marginBottom: spacing.small}} />
      {result.id && (
        <Button unfavorable text="Delete" onPress={() => onDelete(result)} />
      )}
    </View>
  );
};

export default WorkoutCreation;
