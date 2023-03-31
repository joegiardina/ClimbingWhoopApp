import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SIGN_IN_SCREEN, SIGN_UP_SCREEN} from '../constants/navigation';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import { useThemeContext } from '../contexts/themeContext';

const Stack = createNativeStackNavigator();

const UnauthenticatedStack = () => {
  const {themeContext} = useThemeContext();
  const {colors} = themeContext;
  const {backgroundColor, textColor} = colors;
  const backgroundStyle = {
    flex: 1,
    backgroundColor,
  };
  const headerTitleStyle = {
    color: textColor,
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
