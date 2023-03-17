import React, {useState} from 'react';
import {SafeAreaView, View, StatusBar, useColorScheme,} from 'react-native';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import WorkoutScreen from './src/screens/WorkoutScreen';
import WorkoutComponentScreen from './src/screens/WorkoutComponentScreen';
import TimerScreen from './src/screens/TimerScreen';
import SignInScreen from './src/screens/SignInScreen';
import {UserContext} from './src/contexts/user';

const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? 'black' : 'white',
  };
  const headerTitleStyle = {
    color: isDarkMode ? 'white' : 'black',
  };

  const [user, setUser] = useState({name: 'User'});

  return (
    <SafeAreaView style={{...backgroundStyle, flex: 1}}>
      <UserContext.Provider value={{user, updateUser: setUser}}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <QueryClientProvider client={queryClient}>
          <NavigationContainer
            theme={{
              dark: isDarkMode,
              colors: {
                ...DefaultTheme.colors,
                background: backgroundStyle.backgroundColor
              }}}>
            <Stack.Navigator initialRouteName="SignInScreen">
              <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{
                  headerStyle: backgroundStyle,
                  headerTitleStyle, 
                  headerTitle: `Hello, ${user.name}`,
                }} />
              <Stack.Screen
                name="SignInScreen"
                component={SignInScreen}
                options={{
                  headerStyle: backgroundStyle,
                  headerTitleStyle, 
                  headerTitle: `Sign In ${user.name}`,
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
          </NavigationContainer>
        </QueryClientProvider>
      </UserContext.Provider>
    </SafeAreaView>
  );
}

export default App;
