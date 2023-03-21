import React from 'react';
import _ from 'lodash';
import Timer from '../components/Timer';

const TimerScreen: React.FC<{route:any, navigation:any}> = ({route}) => {
  // return <Timer {...route.params} />;
  return <Timer durationPrep={2} durationWork={2} durationRest={2} reps={2} sets={2} />;
}

export default TimerScreen;