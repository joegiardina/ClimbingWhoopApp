import React, {useRef, useEffect} from 'react';
import {Animated} from 'react-native';
import Text from './Text';

const SIZE = 200;

const animate = ({toValue, duration}) => ({
  toValue,
  duration,
  useNativeDriver: false,
});

const toZero = (duration) => animate({toValue: 0, duration});
const toOne = (duration) => animate({toValue: 1, duration});

const AnimationExample = () => {
  const spinAnimValue = useRef(new Animated.Value(0)).current;
  const sizeAnimValue = useRef(new Animated.Value(1)).current;
  const pan = useRef(new Animated.ValueXY()).current;

  const spinAnim = Animated.timing(spinAnimValue, toOne(1000));
  const reverseSpin = Animated.timing(spinAnimValue, toZero(1000));

  const shrinkAnim = Animated.timing(sizeAnimValue, toZero(1000));
  const expandAnim = Animated.timing(sizeAnimValue, toOne(1000));

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        // Animated.parallel([shrinkAnim, spinAnim]),
        spinAnim,
        reverseSpin,
        // Animated.parallel([expandAnim, reverseSpin]),
      ]),
    ).start();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const spin = spinAnimValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['-180deg', '180deg'],
  });

  const size = sizeAnimValue.interpolate({
    inputRange: [0, 1],
    outputRange: [SIZE / 3, SIZE],
  });

  return (
    <>
      <Animated.View
        style={[
          {
            borderColor: 'gray',
            borderWidth: 5,
          },
          {
            height: size,
            width: size,
            borderRadius: 33,
            transform: [{rotate: spin}],
          },
          pan.getLayout(),
        ]}
      >
      </Animated.View>
      <Text style={{position: 'relative'}} large>hi</Text>
    </>
  );
};

export default AnimationExample;
