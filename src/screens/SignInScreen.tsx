import React, {useState, useContext} from 'react';
import {
  Text,
  useColorScheme,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {auth} from '../api';
import {spacing, fontSizes} from '../../style';
import {useUserContext} from '../contexts/user';

// TODO: properly type navigation
const SignInScreen: React.FC<{navigation:any}> = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [backgroundColor] = useState(isDarkMode ? 'black' : 'white');
  const [textColor] = useState(isDarkMode ? 'white' : 'black')
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // const {data} = useQuery('plan', fetchPlan);
  const userContext = useUserContext();

  const onPressSignIn = async () => {
    const authorizedUser = await auth(username, password);
    if (authorizedUser && userContext) {
      if (userContext) {
        userContext.updateUser(authorizedUser);
        navigation.reset({index: 0, routes: [{name: 'HomeScreen'}]});
      }
    }
  }
  const signInDisabled = !username || !password;
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
      <TextInput
        style={{color: textColor, fontSize: fontSizes.medium, width: 100, marginBottom: spacing.normal}}
        placeholder="Username"
        autoCapitalize="none"
        autoComplete="off"
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        secureTextEntry
        style={{color: textColor, fontSize: fontSizes.medium, width: 100}}
        placeholder="Password"
        autoCapitalize="none"
        autoComplete="off"
        onChangeText={(text) => setPassword(text)}
      />
      {!signInDisabled && (
        <TouchableOpacity onPress={onPressSignIn}>
          <Text style={{color: textColor}}>Sign In</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

export default SignInScreen;
