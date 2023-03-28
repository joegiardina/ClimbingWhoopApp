import _ from 'lodash';
import React, {useState} from 'react';
import {TouchableOpacity, View, ViewStyle} from 'react-native';
import {ExerciseType, PropertyType} from '../interface';
import Text from './Text';
import Modal from './Modal';
import {useThemeContext} from '../contexts/themeContext';

interface SelectDropdownProps {
  options: Array<ExerciseType | PropertyType>;
  onSelect: Function;
}

const RenderOption = ({option, index, onPress}) => {
  const {name, type} = option;
  const onPressOption = () => onPress(option);
  return (
    <TouchableOpacity key={index} onPress={onPressOption}>
      <Text>
        {name}
        {!!type ? ` (${type})` : ''}
      </Text>
    </TouchableOpacity>
  );
};

const SelectDropdown: React.FC<SelectDropdownProps> = ({options, onSelect}) => {
  const {themeContext} = useThemeContext();
  const {colors, spacing, radii} = themeContext;
  const {textColor, backgroundColor} = colors;
  const [selectedOption, setSelectedOption] = useState<
    PropertyType | undefined
  >();
  const [showOptions, setShowOptions] = useState(false);

  const inputStyle: ViewStyle = {
    borderRadius: radii.normal,
    borderColor: textColor,
    borderWidth: 1,
    padding: spacing.small,
    flex: 1,
    height: 40,
  };

  const toggleOptions = () => setShowOptions(show => !show);
  const onPress = option => {
    onSelect(option);
    setSelectedOption(option);
    setShowOptions(false);
  };
  return (
    <>
      <TouchableOpacity style={inputStyle} onPress={toggleOptions}>
        {!!selectedOption && (
          <Text>
            {selectedOption.name}
            {!!selectedOption.type ? ` (${selectedOption.type})` : ''}
          </Text>
        )}
      </TouchableOpacity>
      <Modal visible={showOptions} setVisible={setShowOptions}>
        <Text medium style={{marginBottom: spacing.normal}}>
          Select an Option:
        </Text>
        {_.map(options, (option, index) => (
          <RenderOption option={option} index={index} onPress={onPress} />
        ))}
      </Modal>
    </>
  );
};

export default SelectDropdown;
