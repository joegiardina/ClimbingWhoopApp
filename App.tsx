import React from 'react';
import {SafeAreaView, View, StatusBar} from 'react-native';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import {UserContext} from './src/contexts/user';
import {ThemeContext, useThemeContext} from './src/contexts/themeContext';
import MainStack from './src/navigation/MainStack';
import UnauthenticatedStack from './src/navigation/UnauthenticatedStack';
import theme, {colors as themeColors} from './style';
import useUser from './src/hooks/useUser';
import Text from './src/components/Text';

const queryClient = new QueryClient();

function App(): JSX.Element {
  const {isDarkMode} = useThemeContext();
  const colors = themeColors[isDarkMode ? 'dark' : 'light'];
  const {backgroundColor} = colors;

  const {user, ready, updateUser, signoutUser} = useUser();

  return (
    <ThemeContext.Provider value={{...theme, colors}}>
      <SafeAreaView style={{backgroundColor, flex: 1}}>
        <UserContext.Provider value={{user, updateUser, signoutUser}}>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={backgroundColor}
          />
          {ready ? (
            <QueryClientProvider client={queryClient}>
              <NavigationContainer
                theme={{
                  dark: isDarkMode,
                  colors: {
                    ...DefaultTheme.colors,
                    background: backgroundColor,
                  }}}>
                {user.authenticated ? <MainStack user={user} /> : <UnauthenticatedStack />}
              </NavigationContainer>
            </QueryClientProvider>
          ) : (
            <View>
              <Text>Loading</Text>
            </View>
          )}
        </UserContext.Provider>
      </SafeAreaView>
    </ThemeContext.Provider>
  );
}

export default App;
