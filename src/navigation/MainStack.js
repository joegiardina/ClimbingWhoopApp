import React from 'react';
import {useColorScheme} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import WorkoutScreen from '../screens/WorkoutScreen';
import WorkoutComponentScreen from '../screens/WorkoutComponentScreen';
import TimerScreen from '../screens/TimerScreen';
import Header from '../components/Header';
import {
  HOME_SCREEN,
  TIMER_SCREEN,
  WORKOUT_COMPONENT_SCREEN,
  WORKOUT_SCREEN,
} from '../constants/navigation';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? 'black' : 'white',
    flex: 1,
  };
  const headerTitleStyle = {
    color: isDarkMode ? 'white' : 'black',
  };
  return (
    <Stack.Navigator initialRouteName={HOME_SCREEN}>
      <Stack.Screen
        name={HOME_SCREEN}
        component={HomeScreen}
        options={{
          header: Header,
        }}
      />
      <Stack.Screen
        name={TIMER_SCREEN}
        component={TimerScreen}
        options={{
          headerStyle: backgroundStyle,
          headerTitleStyle,
          headerTitle: 'Timer',
        }}
      />
      <Stack.Screen
        name={WORKOUT_SCREEN}
        component={WorkoutScreen}
        options={{
          headerStyle: backgroundStyle,
          headerTitleStyle,
          headerTitle: 'Workout',
        }}
      />
      <Stack.Screen
        name={WORKOUT_COMPONENT_SCREEN}
        component={WorkoutComponentScreen}
        options={{
          headerStyle: backgroundStyle,
          headerTitleStyle,
          headerTitle: 'Workout Component',
        }}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
