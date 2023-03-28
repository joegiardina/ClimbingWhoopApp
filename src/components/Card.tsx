import React from 'react';
import {View} from 'react-native';
import Text from './Text';
import tw from 'twrnc'
import {CardComponentInterface} from '../interface'

interface CardProps {
  exercise: CardComponentInterface,
}

const Card: React.FC<CardProps> = ({exercise}: CardProps) => {
  console.log("exercise")
  console.log(exercise)
  return (
    <View>
      <Text>
        <Text style={tw`text-white`}>{exercise.name}</Text>
        <Text style={tw`text-white`}>{exercise.result}</Text>
        <Text style={tw`text-white`}>{exercise.name}</Text>
      </Text>
    </View>
  );
};

export default Card;
