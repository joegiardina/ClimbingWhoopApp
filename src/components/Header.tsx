import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {spacing} from '../../style';
import Text from './Text';
import {useUserContext} from '../contexts/userContext';

const Header = () => {
  const userContext = useUserContext();
  return (
    <View
      style={{
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: spacing.small,
      }}>
      {!!userContext.user && (
        <Text>Hello, {userContext.user?.details?.name}</Text>
      )}
      <TouchableOpacity onPress={() => userContext.signoutUser()}>
        <Text small>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Header;
