import {createContext, useContext} from 'react';
import {UserInterface} from '../interface';

interface UserContextInterface {
  user: UserInterface,
  updateUser: (user: UserInterface) => void,
  signoutUser: () => void,
}

export const UserContext = createContext<UserContextInterface>({
  user: {},
  updateUser: (u: UserInterface) => {},
  signoutUser: () => {},
});

export const useUserContext = () => {
  const userContext = useContext(UserContext);
  return userContext;
}