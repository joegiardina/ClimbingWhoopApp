import React from 'react';
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
import {useThemeContext} from '../contexts/themeContext';

const Stack = createNativeStackNavigator();

const MainStack = () => {
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
