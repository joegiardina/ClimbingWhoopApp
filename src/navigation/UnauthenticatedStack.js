import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useColorScheme} from 'react-native';
import {SIGN_IN_SCREEN, SIGN_UP_SCREEN} from '../constants/navigation';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';

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
    <Stack.Navigator initialRouteName={SIGN_IN_SCREEN}>
      <Stack.Screen
        name={SIGN_IN_SCREEN}
        component={SignInScreen}
        options={{
          headerStyle: backgroundStyle,
          headerTitleStyle,
          headerTitle: 'Please Sign In',
        }}
      />
      <Stack.Screen
        name={SIGN_UP_SCREEN}
        component={SignUpScreen}
        options={{
          headerStyle: backgroundStyle,
          headerTitleStyle,
          headerTitle: 'Welcome!',
        }}
      />
    </Stack.Navigator>
  );
};

export default UnauthenticatedStack;
