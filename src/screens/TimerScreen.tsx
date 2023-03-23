import React from 'react';
import Screen from '../components/Screen';
import Timer from '../components/Timer';

const TimerScreen: React.FC<{route: any; navigation: any}> = ({route}) => {
  return (
    <Screen>
      <Timer {...route.params} />;
    </Screen>
  );
};

export default TimerScreen;
