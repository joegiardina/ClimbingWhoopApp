import {useState, useEffect, useCallback} from 'react';
import {UserInterface} from '../interface';
import {updateToken} from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type {QueryClient} from 'react-query';

const useUser = (queryClient: QueryClient) => {
  const [user, setUser] = useState<UserInterface>();
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const getStoredUser = async () => {
      const storedUserStr = await AsyncStorage.getItem('user');
      const storedUser: UserInterface = storedUserStr
        ? JSON.parse(storedUserStr)
        : {};
      if (storedUser.token) {
        setUser(storedUser);
        updateToken(storedUser.token);
      } else {
        setUser({authenticated: false});
      }
    };
    getStoredUser();
    setReady(true);
  }, []);

  const updateUser = useCallback((u: UserInterface) => {
    setUser(u);
    if (u.token) {
      updateToken(u.token as string);
    }
    AsyncStorage.setItem('user', JSON.stringify(u));
    queryClient.removeQueries();
  }, []);

  const signoutUser = useCallback(() => {
    AsyncStorage.removeItem('user');
    setUser({authenticated: false});
  }, []);

  return {
    user,
    ready,
    updateUser,
    signoutUser,
  };
};

export default useUser;
