import {useColorScheme} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import WorkoutScreen from '../screens/WorkoutScreen';
import WorkoutComponentScreen from '../screens/WorkoutComponentScreen';
import TimerScreen from '../screens/TimerScreen';
import Header from '../components/Header';

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
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          header: () => <Header />,
        }} />
      <Stack.Screen
        name="TimerScreen"
        component={TimerScreen}
        options={{
          headerStyle: backgroundStyle,
          headerTitleStyle, 
          headerTitle: 'Timer'
        }} />
      <Stack.Screen
        name="WorkoutScreen"
        component={WorkoutScreen}
        options={{
          headerStyle: backgroundStyle,
          headerTitleStyle, 
          headerTitle: 'Workout'
        }} />
      <Stack.Screen
        name="WorkoutComponent"
        component={WorkoutComponentScreen}
        options={{
          headerStyle: backgroundStyle,
          headerTitleStyle, 
          headerTitle: 'Workout Component'
        }} />
    </Stack.Navigator>
  );
};

export default MainStack;