import React, {useState, useEffect} from 'react';
import {SafeAreaView, View, StatusBar, useColorScheme,Text} from 'react-native';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import {UserContext} from './src/contexts/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UserInterface} from './src/interface';
import MainStack from './src/navigation/MainStack';
import UnauthenticatedStack from './src/navigation/UnauthenticatedStack';

const queryClient = new QueryClient();

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? 'black' : 'white',
  };

  const [user, setUser] = useState<UserInterface>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getStoredUser = async () => {
      const storedUserStr = await AsyncStorage.getItem('user');
      const storedUser: UserInterface = storedUserStr ? JSON.parse(storedUserStr) : {};
      if (storedUser.authenticated) {
        setUser(storedUser);
      } else {
        setUser({authenticated: false})
      }
    }
    getStoredUser();
    setLoading(false);
  }, []);

  const updateUser = (u: UserInterface) => {
    setUser(u);
    AsyncStorage.setItem('user', JSON.stringify(u));
  };

  const signoutUser = () => {
    AsyncStorage.removeItem('user');
    setUser({authenticated: false});
  }

  return (
    <SafeAreaView style={{...backgroundStyle, flex: 1}}>
      <UserContext.Provider value={{user, updateUser, signoutUser}}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        {!loading ? (
          <QueryClientProvider client={queryClient}>
            <NavigationContainer
              theme={{
                dark: isDarkMode,
                colors: {
                  ...DefaultTheme.colors,
                  background: backgroundStyle.backgroundColor
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
  );
}

export default App;
