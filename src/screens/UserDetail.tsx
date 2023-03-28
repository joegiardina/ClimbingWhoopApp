import React, {useState, useCallback} from 'react';
import Button from '../components/Button';
import {spacing} from '../../style';
import tw from 'twrnc';
import {View} from 'react-native';
import {useUserContext} from '../contexts/userContext';
import Text from '../components/Text';

const UserDetail: React.FC<{navigation:any}> = ({navigation}) => {
  const userContext = useUserContext();

  const onPress = () => navigation.navigate('HomeScreen')
return (
  <View>
    <Text small>Sign Out</Text>
    <Button style={tw`p-2 m-2 bg-blue-900 rounded-xl`} text="Create" disabled={true} onPress={() => onPress()}  />
  </View>
)
}

export default UserDetail;
