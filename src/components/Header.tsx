import React from 'react';
import {Text, View, useColorScheme, TouchableOpacity} from 'react-native';
import {fontSizes, spacing} from '../../style';
import {useUserContext} from '../contexts/user';

const Header = () => {
  const userContext = useUserContext();
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundColor = isDarkMode ? 'black' : 'white';
  const textColor = isDarkMode ? 'white' : 'black';
  return (
    <View style={{backgroundColor, justifyContent: 'space-between', flexDirection: 'row', padding: spacing.small}}>
      <Text style={{flex: 1, color: textColor, fontSize: fontSizes.medium}}>Hello, {userContext.user.name}</Text>
      <TouchableOpacity onPress={() => userContext.signoutUser()}>
        <Text style={{color: textColor, fontSize: fontSizes.normal}}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Header;