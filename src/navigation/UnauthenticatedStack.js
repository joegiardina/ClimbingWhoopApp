import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useColorScheme} from 'react-native';
import SignInScreen from '../screens/SignInScreen';

const Stack = createNativeStackNavigator();

const UnauthenticatedStack = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? 'black' : 'white',
  };
  const headerTitleStyle = {
    color: isDarkMode ? 'white' : 'black',
  };
  return (
    <Stack.Navigator initialRouteName="SignInScreen">
      <Stack.Screen
        name="SignInScreen"
        component={SignInScreen}
        options={{
          headerStyle: backgroundStyle,
          headerTitleStyle, 
          headerTitle: 'Please Sign In',
        }} />
    </Stack.Navigator>
  );
};

export default UnauthenticatedStack;