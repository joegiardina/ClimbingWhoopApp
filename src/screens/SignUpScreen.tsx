import React, {useState, useCallback} from 'react';
import {TextInputProps} from 'react-native';
import {View, TextInput} from 'react-native';
import Screen from '../components/Screen';
import Text from '../components/Text';
import Button from '../components/Button';
import LoadingOverlay from '../components/LoadingOverlay';
import {createUser} from '../api';
import {spacing, fontSizes, radii} from '../../style';
import {useUserContext} from '../contexts/userContext';
import {useThemeContext} from '../contexts/themeContext';
import {HOME_SCREEN} from '../constants/navigation';

const SignUpScreen: React.FC<{navigation: any}> = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string | undefined>();
  const {themeContext} = useThemeContext();
  const userContext = useUserContext();
  const {textColor} = themeContext.colors;
  const commonTextInputProps: TextInputProps = {
    style: {
      color: textColor,
      fontSize: fontSizes.medium,
      borderRadius: radii.normal,
      borderColor: textColor,
      borderWidth: 1,
      padding: spacing.small,
    },
    autoCapitalize: 'none',
    autoComplete: 'off',
    autoCorrect: false,
  };

  const onPressCreate = useCallback(async () => {
    setLoading(true);
    if (password !== confirmPassword) {
      setError('Passwords must match.');
      return;
    }
    const user = await createUser({username, password, details: {name}});
    if (user?.authenticated) {
      userContext.updateUser(user);
      setError(undefined);
      navigation.navigate(HOME_SCREEN);
    } else {
      setError('Something went wrong.');
    }
    setLoading(false);
  }, [
    username,
    password,
    confirmPassword,
    name,
    setLoading,
    setError,
    navigation,
    userContext,
  ]);

  return (
    <Screen>
      {loading && <LoadingOverlay />}
      {error && (
        <View style={{position: 'absolute', top: spacing.large}}>
          <Text unfavorable>{error}</Text>
        </View>
      )}
      <View style={{flex: 1, width: 250}}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <View>
            <Text>First Name:</Text>
            <TextInput
              {...commonTextInputProps}
              autoCapitalize="words"
              placeholder="First Name"
              onChangeText={text => setName(text)}
            />
          </View>
          <View style={{marginTop: spacing.normal}}>
            <Text>Username:</Text>
            <TextInput
              {...commonTextInputProps}
              placeholder="Username"
              onChangeText={text => setUsername(text)}
            />
          </View>
          <View style={{marginTop: spacing.normal}}>
            <Text>Password:</Text>
            <TextInput
              {...commonTextInputProps}
              secureTextEntry
              placeholder="Password"
              onChangeText={text => setPassword(text)}
            />
          </View>
          <View style={{marginTop: spacing.normal}}>
            <Text>Confirm Password:</Text>
            <TextInput
              {...commonTextInputProps}
              secureTextEntry
              placeholder="Confirm Password"
              onChangeText={text => setConfirmPassword(text)}
            />
          </View>
        </View>
        <View style={{justifyContent: 'flex-start', marginTop: spacing.small}}>
          <View
            style={{
              justifyContent: 'space-between',
              marginTop: spacing.small,
              flexDirection: 'row',
            }}>
            <Button
              style={{flex: 1, marginRight: spacing.small}}
              text="Create"
              onPress={onPressCreate}
            />
          </View>
        </View>
      </View>
    </Screen>
  );
};

export default SignUpScreen;
