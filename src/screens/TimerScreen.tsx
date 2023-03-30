import React from 'react';
import Screen from '../components/Screen';
import View from '../components/View';
import Timer from '../components/Timer2';
import AnimatedComponent from '../components/AnimatedComponent';

const TimerScreen: React.FC<{route: any; navigation: any}> = ({route, navigation}) => {
  return (
    <Screen>
      <Timer prepTime={3} workTime={2} restTime={2} sets={2} reps={3} {...route.params} />
      <View style={{position: 'absolute', top: '33%', zIndex: -1}}>
        <AnimatedComponent />
      </View>
    </Screen>
  )
};

export default TimerScreen;
