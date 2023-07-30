import React, {useState, useEffect} from 'react';
import {TextInputProps} from 'react-native';
import {TextInput} from 'react-native';
import Screen from '../components/Screen';
import Button from '../components/Button';
import Text from '../components/Text';
import View from '../components/View';
import LoadingOverlay from '../components/LoadingOverlay';
import {saveUser, disconnectOAuth, oauth} from '../api';
import {spacing, fontSizes, radii} from '../../style';
import {useUserContext} from '../contexts/userContext';
import {useThemeContext} from '../contexts/themeContext';
import {useCustomizeContext} from '../contexts/customizeContext';

const SettingsScreen: React.FC = () => {
  const {user} = useUserContext();
  const {
    deleteTicklist,
    updateTicklist,
    isWhoopConnected,
    isMountainProjectConnected,
  } = useCustomizeContext();
  const {themeContext} = useThemeContext();
  const {textColor} = themeContext.colors;
  const [name, setName] = useState<string>(user?.details?.name || '');
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
      <View style={{marginBottom: spacing.small}}>
        <Text small>Username</Text>
        <Text medium style={{padding: spacing.small}}>
          {user.username}
        </Text>
      </View>
      <View>
        <Text small>Name</Text>
        <View style={{width: 250}}>
          <TextInput
            defaultValue={name}
            {...commonTextInputProps}
            placeholder="Name"
            onChangeText={text => setName(text)}
          />
        </View>
      </View>
      <Text
        medium
        style={{marginTop: spacing.large, marginBottom: spacing.small}}>
        WHOOP
      </Text>
      <View style={{marginBottom: spacing.small, alignItems: 'flex-start'}}>
        <View style={{justifyContent: 'space-between', alignItems: 'center'}}>
          {isWhoopConnected ? (
            <>
              <Text style={{marginBottom: spacing.small}} favorable>
                WHOOP is connected.
              </Text>
              <Button
                text="Disconnect WHOOP"
                outline
                small
                unfavorable
                onPress={disconnectOAuth}
              />
            </>
          ) : (
            <>
              <Text style={{marginBottom: spacing.small}} unfavorable>
                WHOOP not connected.
              </Text>
              <Button
                text="Connect WHOOP"
                outline
                small
                onPress={() => user.token && oauth(user.token)}
              />
            </>
          )}
        </View>
      </View>
      <Text
        medium
        style={{marginTop: spacing.large, marginBottom: spacing.small}}>
        Climbing
      </Text>
      <View style={{marginBottom: spacing.small, alignItems: 'flex-start'}}>
        <View style={{justifyContent: 'space-between', alignItems: 'center'}}>
          {isMountainProjectConnected ? (
            <>
              <Text style={{marginBottom: spacing.small}} favorable>
                Mountain Project is connected.
              </Text>
              <Button
                text="Disconnect Mountain Project"
                outline
                small
                unfavorable
                onPress={() => deleteTicklist()}
              />
            </>
          ) : (
            <>
              <Text style={{marginBottom: spacing.small}} unfavorable>
                Mountain Project not connected.
              </Text>
              <Button
                text="Connect Mountain Project"
                outline
                small
                onPress={() => updateTicklist()}
              />
            </>
          )}
        </View>
      </View>
      <View expand />
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
