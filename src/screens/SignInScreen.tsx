import React, {useState, useContext} from 'react';
import {
  Text,
  useColorScheme,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useQuery} from 'react-query'

import {spacing, fontSizes, radii} from '../../style';
import {UserContext} from '../contexts/user';

const DAYS = ['M', 'T', 'W', 'Th', 'F', 'Sa', 'Su'];

// TODO: properly type navigation
const SignInScreen: React.FC<{navigation:any}> = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [backgroundColor] = useState(isDarkMode ? 'black' : 'white');
  const [textColor] = useState(isDarkMode ? 'white' : 'black')
  const [username, setUsername] = useState();

  // const {data} = useQuery('plan', fetchPlan);
  const userContext = useContext(UserContext);

  const onPressSignIn = () => {
    if (userContext) {
      userContext.updateUser({name: username});
    }
    navigation.reset({index: 0, routes: [{name: 'HomeScreen'}]});
  }

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
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        secureTextEntry
        style={{color: textColor, fontSize: fontSizes.medium, width: 100}}
        placeholder="Password"
      />
      <TouchableOpacity onPress={onPressSignIn}>
        <Text style={{color: textColor}}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
}

export default SignInScreen;
