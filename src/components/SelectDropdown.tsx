import _ from 'lodash';
import React, {useState} from 'react';
import {TouchableOpacity, View, ViewStyle} from 'react-native';
import {ExerciseInterface, PropertyType} from '../interface';
import Text from './Text';
import Modal from './Modal';
import {useThemeContext} from '../contexts/themeContext';

type OptionType = ExerciseInterface | PropertyType;

interface SelectDropdownProps {
  auto?: Boolean;
  option: OptionType;
  options: Array<OptionType>;
  onSelect: Function;
}

const RenderOption: React.FC<{option: OptionType; onPress: Function}> = ({
  option,
  onPress,
}) => {
  const {name, type} = option;
  const onPressOption = () => onPress(option);
  return (
    <TouchableOpacity onPress={onPressOption}>
      <Text>
        {name}
        {type ? ` (${type})` : ''}
      </Text>
    </TouchableOpacity>
  );
};

const SelectDropdown: React.FC<SelectDropdownProps> = ({
  auto,
  option,
  options,
  onSelect,
}) => {
  const {themeContext} = useThemeContext();
  const {colors, spacing, radii} = themeContext;
  const {textColor} = colors;
  const [selectedOption, setSelectedOption] = useState<OptionType | undefined>(
    option,
  );
  const [showOptions, setShowOptions] = useState(!!auto);

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
    <View style={{flex: 1}}>
      <TouchableOpacity style={inputStyle} onPress={toggleOptions}>
        {!!selectedOption && (
          <Text>
            {selectedOption.name}
            {selectedOption.type ? ` (${selectedOption.type})` : ''}
          </Text>
        )}
      </TouchableOpacity>
      <Modal visible={showOptions} setVisible={setShowOptions}>
        <Text medium style={{marginBottom: spacing.normal}}>
          Select an Option:
        </Text>
        {_.map(options, (option, index) => (
          <View key={index}>
            <RenderOption option={option} onPress={onPress} />
          </View>
        ))}
      </Modal>
    </View>
  );
};

export default SelectDropdown;
