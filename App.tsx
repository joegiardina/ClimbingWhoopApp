import React from 'react';
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

const Stack = createNativeStackNavigator();
const queryClient = new QueryClient()

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? 'black' : 'white',
  };
  const headerTitleStyle = {
    color: isDarkMode ? 'white' : 'black',
  };

  return (
    <SafeAreaView style={{...backgroundStyle, flex: 1}}>
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
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown: false}} />
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
    </SafeAreaView>
  );
}

export default App;
