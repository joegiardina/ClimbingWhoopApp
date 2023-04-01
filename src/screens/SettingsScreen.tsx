import React, {useState, useEffect} from 'react';
import {TextInputProps} from 'react-native';
import {TextInput} from 'react-native';
import Screen from '../components/Screen';
import Button from '../components/Button';
import Text from '../components/Text';
import View from '../components/View';
import LoadingOverlay from '../components/LoadingOverlay';
import {saveUser} from '../api';
import {spacing, fontSizes, radii} from '../../style';
import {useUserContext} from '../contexts/userContext';
import {useThemeContext} from '../contexts/themeContext';

const SettingsScreen: React.FC = () => {
  const {user} = useUserContext();
  const {themeContext} = useThemeContext();
  const {textColor} = themeContext.colors;
  const [name, setName] = useState<string>('');
  const [success, setSuccess] = useState(false);

  const userContext = useUserContext();

  useEffect(() => {
    if (success) {
      setTimeout(() => setSuccess(false), 3000);
    }
  }, [success]);
  if (!user) {
    return <LoadingOverlay />;
  }
  const onPress = async () => {
    const updateUserResp = await saveUser({name});
    setSuccess(true);
    userContext.updateUser({...user, ...updateUserResp});
  };

  const commonTextInputProps: TextInputProps = {
    style: {
      color: textColor,
      fontSize: fontSizes.medium,
      borderRadius: radii.normal,
      borderColor: textColor,
      borderWidth: 1,
      padding: spacing.small,
    },
    autoCapitalize: 'words',
    autoComplete: 'off',
    autoCorrect: false,
  };

  return (
    <Screen>
      <Text large style={{marginBottom: spacing.large}}>
        Settings
      </Text>
      <Text small>Username</Text>
      <Text medium style={{padding: spacing.small}}>
        {user.username}
      </Text>
      <Text small>Name</Text>
      <View style={{flex: 1, width: 250}}>
        <TextInput
          defaultValue={user.details?.name}
          style={{marginTop: spacing.normal}}
          {...commonTextInputProps}
          placeholder="Name"
          onChangeText={text => setName(text)}
        />
      </View>
      {success && (
        <View centered style={{marginBottom: spacing.small}}>
          <Text medium>Saved!</Text>
        </View>
      )}
      <Button text="Save" onPress={onPress} />
    </Screen>
  );
};

export default SettingsScreen;
