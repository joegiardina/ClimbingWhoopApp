import React, {useState, useEffect} from 'react';
import { TouchableOpacity } from 'react-native';
import Animated, {
  withSpring,
  withTiming,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import Button from './Button';
import View from './View';
import Text from './Text';

const ExpandingView = ({expanded, children, initialHeight, initialWidth}) => {
  const width = useSharedValue(initialWidth);
  const height = useSharedValue(initialHeight);
  useEffect(() => {
    if (expanded) {
      width.value = 100;
      height.value = 100;
    } else {
      width.value = initialWidth;
      height.value = initialHeight;
    }
  }, [expanded])
  const expandingStyle = useAnimatedStyle(() => {
    return {
      width: withTiming(`${width.value}%`, {
        duration: 500,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      }),
      height: withTiming(`${height.value}%`, {
        duration: 500,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      }),
    }
  })
  return (
    <Animated.View style={expandingStyle}>
      {children}
    </Animated.View>
  );
}

function Box() {
  const offset = useSharedValue(0);

  const defaultSpringStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: withSpring(offset.value * 255) }],
    };
  });

  const customSpringStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withSpring(offset.value * 255, {
            damping: 20,
            stiffness: 90,
          }),
        },
      ],
    };
  });

  return (
    <View style={{height: '100%', justifyContent: 'center'}}>
      <ExpandingView initialHeight={25} initialWidth={25}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>some text</Text>
        </View>
      </ExpandingView>
    </View>
  );
}

export default ExpandingView;