import React, {useRef, useEffect, useState} from 'react';
import {Animated, PanResponder} from 'react-native';
import Button from './Button';
import View from './View';

const Container = View;
const ButtonContainer = View;
const SIZE = 200;

const animate = ({toValue, duration}) => ({
  toValue,
  duration,
  useNativeDriver: false,
});

const toZero = (duration) => animate({toValue: 0, duration});
const toOne = (duration) => animate({toValue: 1, duration});

const AnimationExample = () => {
  const [sticky, setSticky] = useState(false);
  const borderRadiusAnimValue = useRef(new Animated.Value(1)).current;
  const spinAnimValue = useRef(new Animated.Value(0)).current;
  const sizeAnimValue = useRef(new Animated.Value(1)).current;
  const pan = useRef(new Animated.ValueXY()).current;

  const returnToCenterAnim = Animated.spring(pan, {
    toValue: {x: 0, y: 0},
    useNativeDriver: false,
  });

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      pan.setOffset({
        x: pan.x._value,
        y: pan.y._value,
      });
    },
    onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}], {
      useNativeDriver: false,
    }),
    onPanResponderRelease: () => {
      if (!sticky) {
        returnToCenterAnim.start();
      }
      pan.flattenOffset();
    },
  });

  const toCircleAnim = Animated.timing(borderRadiusAnimValue, toOne(500));
  const toSquareAnim = Animated.timing(borderRadiusAnimValue, toZero(500));

  const spinAnim = Animated.timing(spinAnimValue, toOne(1000));
  const reverseSpin = Animated.timing(spinAnimValue, toZero(1000));

  const shrinkAnim = Animated.timing(sizeAnimValue, toZero(1000));
  const expandAnim = Animated.timing(sizeAnimValue, toOne(1000));

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        toSquareAnim,
        spinAnim,
        reverseSpin,
        Animated.parallel([shrinkAnim, spinAnim]),
        Animated.parallel([expandAnim, reverseSpin]),
        toCircleAnim,
      ]),
    ).start();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    returnToCenterAnim.start();
  }, [sticky]); // eslint-disable-line react-hooks/exhaustive-deps

  const borderRadius = borderRadiusAnimValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, SIZE],
  });

  const spin = spinAnimValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const size = sizeAnimValue.interpolate({
    inputRange: [0, 1],
    outputRange: [SIZE / 10, SIZE],
  });

  return (
    <Container>
      <ButtonContainer>
        <Button
          text={sticky ? 'snap' : 'sticky'}
          onPress={() => setSticky(!sticky)}
        />
      </ButtonContainer>
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          {
            backgroundColor: 'white',
            borderColor: 'gray',
            borderWidth: 5,
          },
          {
            height: size,
            width: size,
            borderRadius,
            transform: [{rotate: spin}],
          },
          pan.getLayout(),
        ]}
      />
    </Container>
  );
};

export default AnimationExample;
