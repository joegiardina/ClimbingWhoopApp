import React from 'react';
import {useColorScheme} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CustomizeScreen from '../screens/CustomizeScreen';
import CreateComponentScreen from '../screens/CreateComponentScreen';
import CreateWorkoutScreen from '../screens/CreateWorkoutScreen';
import {
  WORKOUT_CREATION_SCREEN,
  COMPONENT_CREATION_SCREEN,
  CUSTOMIZE_SCREEN,
} from '../constants/navigation';

const Stack = createNativeStackNavigator();

const CustomizeStack = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? 'black' : 'white',
    flex: 1,
  };
  const headerTitleStyle = {
    color: isDarkMode ? 'white' : 'black',
  };
  return (
    <Stack.Navigator initialRouteName={CUSTOMIZE_SCREEN}>
      <Stack.Screen
        name={CUSTOMIZE_SCREEN}
        component={CustomizeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={COMPONENT_CREATION_SCREEN}
        component={CreateComponentScreen}
        options={{
          headerStyle: backgroundStyle,
          headerTitleStyle,
          headerTitle: 'Create Component',
        }}
      />
      <Stack.Screen
        name={WORKOUT_CREATION_SCREEN}
        component={CreateWorkoutScreen}
        options={{
          headerStyle: backgroundStyle,
          headerTitleStyle,
          headerTitle: 'Create Workout',
        }}
      />
    </Stack.Navigator>
  );
};

export default CustomizeStack;
