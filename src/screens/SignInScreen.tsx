import React, {useState} from 'react';
import {TextInputProps} from 'react-native';
import {
  View,
  Text,
  TextInput,
} from 'react-native';
import Button from '../components/Button';
import LoadingOverlay from '../components/LoadingOverlay';
import {auth, createUser} from '../api';
import {spacing, fontSizes, radii} from '../../style';
import {useUserContext} from '../contexts/user';
import {useThemeContext} from '../contexts/themeContext';

const SignInScreen: React.FC<{navigation:any}> = ({navigation}) => {
  const {themeContext} = useThemeContext();
  const [loading, setLoading] = useState(false);
  const {backgroundColor, textColor} = themeContext.colors;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const userContext = useUserContext();

  const onPressSignIn = async () => {
    setLoading(true);
    const authenticatedUser = await auth(username, password);
    if (authenticatedUser?.authenticated && userContext) {
      userContext.updateUser(authenticatedUser);
      setError(false);
    } else {
      setError(true);
    }
    setLoading(false);
  }
  const onPressCreateUser = async () => {
    setLoading(true);
    const authenticatedUser = await createUser(username, password);
    if (authenticatedUser?.authenticated && userContext) {
      userContext.updateUser(authenticatedUser);
      setError(false);
    } else {
      setError(true);
    }
    setLoading(false);
  }
  const signInDisabled = !username || !password;
  const commonTextInputProps: TextInputProps = {
    style: {
      color: textColor,
      fontSize: fontSizes.medium,
      width: 200,
      borderRadius: radii.normal,
      borderColor: textColor,
      borderWidth: 1,
      padding: spacing.small,
    },
    autoCapitalize: "none",
    autoComplete: "off",
    autoCorrect: false,
  };

  return (
    <>
      {loading && <LoadingOverlay />}
      <View
        style={{
          backgroundColor,
          display: 'flex',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: spacing.large,
        }}>
        {error && (
          <View style={{position: 'absolute', top: spacing.large}}>
            <Text style={{color: 'red'}}>Something went wrong.</Text>
          </View>
        )}
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <TextInput
            {...commonTextInputProps}
            placeholder="Username"
            onChangeText={(text) => setUsername(text)}
          />
          <View style={{marginTop: spacing.normal}}>
            <TextInput
              style={{marginTop: spacing.normal}}
              {...commonTextInputProps}
              secureTextEntry
              placeholder="Password"
              onChangeText={(text) => setPassword(text)}
            />
          </View>
        </View>
        <View style={{flex: 1, justifyContent: 'flex-start', marginTop: spacing.small}}>
          <View style={{justifyContent: 'flex-start', marginTop: spacing.small, flexDirection: 'row'}}>
            <Button style={{marginRight: spacing.small}} text="Sign In" disabled={signInDisabled} onPress={onPressSignIn} />
            <Button text="Create Account" disabled={signInDisabled} onPress={onPressCreateUser} />
          </View>
        </View>
      </View>
    </>
  );
}

export default SignInScreen;
