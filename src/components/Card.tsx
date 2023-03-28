import React from 'react';
import {View} from 'react-native';
import Text from './Text';
import tw from 'twrnc'

interface CardProps<T> {
  item: T,
}

const Card = <T extends object>({ item }: CardProps<T>) => {
  console.log(item)
  return (
      <View style={tw`bg-white rounded-lg p-4 shadow-lg m-2`}>
        <Text style={tw`text-black font-bold text-lg mb-2`}>
          {item.name?.toUpperCase()}
        </Text>
        <Text style={tw`text-black`}>
          {item.result?.Stretching?.['Duration (min)'] ?? 'N/A'}
        </Text>
      </View>
  );
};

export default Card;
