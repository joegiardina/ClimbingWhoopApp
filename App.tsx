import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from 'react-query';
import {UserContext} from './src/contexts/userContext';
import {ThemeContext, useThemeContext} from './src/contexts/themeContext';
import UnauthenticatedStack from './src/navigation/UnauthenticatedStack';
import Tabs from './src/navigation/Tabs';
import * as theme from './style';
import useUser from './src/hooks/useUser';
import LoadingOverlay from './src/components/LoadingOverlay';

const queryClient = new QueryClient();

const App: React.FC = () => {
const {isDarkMode} = useThemeContext();
  const colors = theme.colors[isDarkMode ? 'dark' : 'light'];
  const {backgroundColor} = colors;

  const {user, ready, updateUser, signoutUser} = useUser(queryClient);

  if (!ready || !user) {
    return <LoadingOverlay />;
  }

  return (
    <>
      <ThemeContext.Provider value={{...theme, colors}}>
        <SafeAreaView style={{backgroundColor, flex: 1}}>
          <UserContext.Provider value={{user, updateUser, signoutUser}}>
            <StatusBar
              barStyle={isDarkMode ? 'light-content' : 'dark-content'}
              backgroundColor={backgroundColor}
            />
            <QueryClientProvider client={queryClient}>
              <NavigationContainer
                theme={{
                  dark: isDarkMode,
                  colors: {
                    ...DefaultTheme.colors,
                    background: backgroundColor,
                  },
                }}>
                {user.authenticated ? <Tabs /> : <UnauthenticatedStack />}
              </NavigationContainer>
            </QueryClientProvider>
          </UserContext.Provider>
        </SafeAreaView>
      </ThemeContext.Provider>
    </>
  );
}

export default App;
