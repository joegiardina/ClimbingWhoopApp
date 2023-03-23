import React, {useState, useCallback} from 'react';
import {TextInputProps} from 'react-native';
import {View, TextInput} from 'react-native';
import Screen from '../components/Screen';
import Button from '../components/Button';
import Text from '../components/Text';
import LoadingOverlay from '../components/LoadingOverlay';
import {auth} from '../api';
import {spacing, fontSizes, radii} from '../../style';
import {useUserContext} from '../contexts/userContext';
import {useThemeContext} from '../contexts/themeContext';
import {SIGN_UP_SCREEN} from '../constants/navigation';

const SignInScreen: React.FC<{navigation: any}> = ({navigation}) => {
  const {themeContext} = useThemeContext();
  const [loading, setLoading] = useState(false);
  const {textColor} = themeContext.colors;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const userContext = useUserContext();

  const onPressSignIn = useCallback(async () => {
    setLoading(true);
    const user = await auth({username, password});
    if (user?.authenticated && userContext) {
      userContext.updateUser(user);
      setError(false);
    } else {
      setError(true);
    }
    setLoading(false);
  }, [username, password, userContext, setError, setLoading]);

  const onPressCreate = () => navigation.navigate(SIGN_UP_SCREEN);

  const signInDisabled = !username || !password;
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

  return (
    <>
      {loading && <LoadingOverlay />}
      <Screen>
        {error && (
          <View style={{position: 'absolute', top: spacing.large}}>
            <Text unfavorable>Something went wrong.</Text>
          </View>
        )}
        <View style={{flex: 1, width: 250}}>
          <View style={{flex: 1, justifyContent: 'flex-end'}}>
            <TextInput
              {...commonTextInputProps}
              placeholder="Username"
              onChangeText={text => setUsername(text)}
            />
            <View style={{marginTop: spacing.normal}}>
              <TextInput
                style={{marginTop: spacing.normal}}
                {...commonTextInputProps}
                secureTextEntry
                placeholder="Password"
                onChangeText={text => setPassword(text)}
              />
            </View>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-start',
              marginTop: spacing.small,
            }}>
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
              <Button
                style={{flex: 1}}
                text="Sign In"
                disabled={signInDisabled}
                onPress={onPressSignIn}
              />
            </View>
          </View>
        </View>
      </Screen>
    </>
  );
};

export default SignInScreen;
