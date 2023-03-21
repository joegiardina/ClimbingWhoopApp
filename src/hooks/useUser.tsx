import {useState, useEffect, useCallback} from 'react';
import {UserInterface } from '../interface';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useUser = () => {
  const [user, setUser] = useState<UserInterface>({});
  const [ready, setReady] = useState(false);
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
    setReady(true);
  }, []);

  const updateUser = useCallback((u: UserInterface) => {
    setUser(u);
    AsyncStorage.setItem('user', JSON.stringify(u));
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