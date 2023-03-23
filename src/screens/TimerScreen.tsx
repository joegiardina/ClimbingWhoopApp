import React from 'react';
import Timer from '../components/Timer';

const TimerScreen: React.FC<{route: any; navigation: any}> = ({route}) => {
  return <Timer {...route.params} />;
};

export default TimerScreen;
