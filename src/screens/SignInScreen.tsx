import React, {useState} from 'react';
import {TextInputProps} from 'react-native';
import {
  Text,
  useColorScheme,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {auth, createUser} from '../api';
import {spacing, fontSizes, radii} from '../../style';
import {useUserContext} from '../contexts/user';

// TODO: properly type navigation
const SignInScreen: React.FC<{navigation:any}> = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [backgroundColor] = useState(isDarkMode ? 'black' : 'white');
  const [textColor] = useState(isDarkMode ? 'white' : 'black')
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const userContext = useUserContext();

  const onPressSignIn = async () => {
    const authorizedUser = await auth(username, password);
    if (authorizedUser && userContext) {
      userContext.updateUser(authorizedUser);
    }
  }
  const onPressCreateUser = async () => {
    const authorizedUser = await createUser(username, password);
    if (authorizedUser && userContext) {
      userContext.updateUser(authorizedUser);
    }
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
    <View
      style={{
        backgroundColor,
        display: 'flex',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: spacing.large,
      }}>
      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <TextInput
          {...commonTextInputProps}
          placeholder="Username"
          onChangeText={(text) => setUsername(text)}
        />
        <View style={{marginTop: spacing.normal}}>
          <TextInput
            {...commonTextInputProps}
            secureTextEntry
            placeholder="Password"
            onChangeText={(text) => setPassword(text)}
          />
        </View>
      </View>
      <View style={{flexDirection: 'row',  marginTop: spacing.small, flex: 1}}>
        <TouchableOpacity style={{flex: 1, marginRight: spacing.small}} disabled={signInDisabled} onPress={onPressSignIn}>
          <Text style={{color: signInDisabled ? backgroundColor : textColor}}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{flex: 1}} disabled={signInDisabled} onPress={onPressCreateUser}>
          <Text style={{color: signInDisabled ? backgroundColor : textColor}}>Create</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default SignInScreen;
