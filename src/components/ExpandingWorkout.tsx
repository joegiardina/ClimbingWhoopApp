import React, {useState, useEffect} from 'react';
import Animated, {
  withSpring,
  withTiming,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import Text from './Text';
import View from './View';
import { TouchableOpacity } from 'react-native';

const ExpandingWorkout = () => {
  const [expanded, setExpanded] = useState(false);
  const height = useSharedValue(50);
  useEffect(() => {
    if (expanded) {
      height.value = 100;
    } else {
      height.value = 50;
    }
  }, [expanded])
  const expandingStyle = useAnimatedStyle(() => {
    return {
      height: withTiming(height.value, {
        duration: 500,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      }),
    }
  })
  const content = expanded ? 'EXPANDED CONTENT' : 'NOT EXPANDED';
  return (
    <TouchableOpacity style={{backgroundColor: 'red'}} onPress={() => setExpanded(exp => !exp)}>
      <Animated.View style={expandingStyle}>
        <Text>{content}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default ExpandingWorkout;