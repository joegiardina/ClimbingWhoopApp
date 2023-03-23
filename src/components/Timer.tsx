import React, {useState, useEffect} from 'react';
import _ from 'lodash';
import {TouchableOpacity, Text, View, useColorScheme} from 'react-native';
import {spacing, fontSizes, radii} from '../../style';

const buttonStyle = {
  width: 150,
  borderRadius: radii.normal,
  padding: 12,
};

type TimerState = 'preparing' | 'working' | 'resting' | 'done' | 'ready';

// TODO: properly type route
const Timer: React.FC<{
  durationPrep: number;
  durationWork: number;
  durationRest: number;
  reps: number;
  sets: number;
  autoStart?: Boolean;
  onFinish?: Function;
}> = ({
  durationPrep,
  durationWork,
  durationRest,
  reps,
  sets,
  autoStart,
  onFinish,
}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const textColor = 'white';
  const [remainingSec, setRemainingSec] = useState<number | undefined>();
  const [remainingReps, setRemainingReps] = useState<number>(reps);
  const [remainingSets, setRemainingSets] = useState<number>(sets);
  const [intervalId, setIntervalId] = useState<number | undefined>();

  const [timerState, setTimerState] = useState<TimerState>('ready');

  let backgroundColor = isDarkMode ? 'black' : 'white';
  if (timerState === 'preparing') {
    backgroundColor = 'purple';
  } else if (timerState === 'working') {
    backgroundColor = 'red';
  } else if (timerState === 'resting') {
    backgroundColor = 'blue';
  }

  const states = ['ready', 'preparing', 'working', 'resting', 'done'];

  // const startSet = () => {
  //   setRemainingReps(reps);
  //   let initialState: TimerState = 'ready';
  //   if (durationPrep) {
  //     initialState = 'preparing';
  //   } else if (durationWork) {
  //     initialState = 'working';
  //   } else if (durationRest) {
  //     initialState = 'resting';
  //   }
  //   console.log('START SET', reps, initialState);
  //   setTimerState(initialState);
  //   const id = setInterval(() => {
  //     setRemainingSec(sec => (sec || 1) - 1);
  //   }, 1000);
  //   setIntervalId(id);
  // };

  // useEffect(() => {
  //   console.log('remaining', remainingSec, remainingReps, remainingSets);
  //   if (remainingSec === 0 && remainingReps > 0) {
  //     setRemainingReps(reps => reps - 1);
  //   }
  //   if (remainingReps === 0 && remainingSets > 0) {
  //     const newSet = remainingSets - 1;
  //     setRemainingSets(newSet);
  //   }
  //   if (remainingSets === 0) {
  //     setTimerState('done');
  //   }
  // }, [remainingSec, remainingReps, remainingSets]);

  // useEffect(() => {
  //   let newDuration;
  //   switch(timerState) {
  //     case 'done':
  //       if (onFinish) {
  //         onFinish();
  //       }
  //       break;
  //     case 'working':
  //       if (durationWork) {
  //         newDuration = durationWork;
  //       }
  //       break;
  //     case 'resting':
  //       if (durationRest) {
  //         newDuration = durationRest;
  //       }
  //       break;
  //     case 'preparing':
  //       if (durationPrep) {
  //         newDuration = durationPrep;
  //       }
  //       break;
  //     case 'ready':
  //       if (autoStart) {
  //         startSet();
  //       }
  //       break;
  //   }
  //   if (newDuration) {
  //     if (intervalId) {
  //       clearInterval(intervalId);
  //     }
  //     setRemainingSec(newDuration);
  //     const id = setInterval(() => {
  //       setRemainingSec(sec => (sec || 1) - 1);
  //     }, 1000);
  //     setIntervalId(id);
  //   }

  // }, [timerState]);

  ////////////////////////
  const startSet = () => {
    setRemainingReps(reps);
    setRemainingSec(durationPrep || durationWork || durationRest);
    let initialState: TimerState = 'ready';
    if (durationPrep) {
      initialState = 'preparing';
    } else if (durationWork) {
      initialState = 'working';
    } else if (durationRest) {
      initialState = 'resting';
    }
    setTimerState(initialState);
    if (initialState !== 'ready') {
      const id = setInterval(() => {
        setRemainingSec(sec => (sec || 1) - 1);
      }, 1000);
      setIntervalId(id);
    }
  };

  useEffect(() => {
    if (autoStart && !intervalId) {
      startSet();
    }
  }, []);

  useEffect(() => {
    if (timerState === 'done') {
      console.log('SETTING DONE, REMAINING SETS:', remainingSets);
      setRemainingSets(set => (set || 1) - 1);
      if (onFinish) {
        onFinish();
      }
    }
  }, [timerState, onFinish]);

  useEffect(() => {
    let newRemainingSec;
    console.log('remainingSec', remainingSec);
    console.log('remainingReps', remainingReps);
    if (remainingSec === 0 && intervalId) {
      console.log('remaining sec 0 && interval', timerState);
      if (timerState === 'preparing') {
        console.log("if (timerState === 'preparing') {");
        newRemainingSec = durationWork;
        setTimerState('working');
      } else if (timerState === 'working') {
        console.log("} else if (timerState === 'working') {");
        if (remainingReps > 1) {
          console.log('if (remainingReps > 1) {');
          newRemainingSec = durationRest;
        }
        setTimerState(remainingReps > 1 ? 'resting' : 'done');
      } else if (
        timerState === 'resting' &&
        remainingReps > 0 &&
        durationWork
      ) {
        console.log(
          "} else if (timerState === 'resting' && remainingReps > 0 && durationWork) {",
        );
        newRemainingSec = durationWork;
        setRemainingReps(remainingReps => remainingReps - 1);
        setTimerState('working');
      } else if (timerState === 'resting' && onFinish) {
        console.log("} else if (timerState === 'resting' && onFinish) {");
        console.log('asdfasfd');
        onFinish();
      }
      clearInterval(intervalId);
      if (newRemainingSec) {
        setRemainingSec(newRemainingSec);
        const id = setInterval(() => {
          setRemainingSec(sec => (sec || 1) - 1);
        }, 1000);
        setIntervalId(id);
      }
    }
  }, [remainingSec, remainingReps]);
  ////////////////////////
  return (
    <View
      style={{
        flex: 1,
        backgroundColor,
        alignItems: 'center',
        padding: spacing.normal,
        borderRadius: 50,
      }}>
      {timerState === 'ready' && (
        <View>
          <Text style={{color: textColor, fontSize: fontSizes.large}}>
            {sets} {sets === 1 ? 'set' : 'sets'} of {reps}{' '}
            {reps === 1 ? 'rep' : 'reps'}
          </Text>
          <Text style={{color: textColor, fontSize: fontSizes.large}}>
            {durationWork}s on / {durationRest}s off
          </Text>
        </View>
      )}
      {!!timerState &&
        ['working', 'resting'].includes(timerState) &&
        !!remainingReps && (
          <Text style={{color: textColor, fontSize: fontSizes.medium}}>
            Rep {reps - remainingReps + 1} of {reps}
          </Text>
        )}
      {timerState === 'preparing' && (
        <Text
          style={{
            textAlign: 'center',
            color: textColor,
            fontSize: fontSizes.large,
          }}>
          GET PSYCHED
        </Text>
      )}
      {timerState === 'working' && (
        <Text
          style={{
            textAlign: 'center',
            color: textColor,
            fontSize: fontSizes.large,
          }}>
          Get it!!
        </Text>
      )}
      {timerState === 'resting' && (
        <Text
          style={{
            textAlign: 'center',
            color: textColor,
            fontSize: fontSizes.large,
          }}>
          Rest
        </Text>
      )}
      {timerState === 'done' && remainingSets > 0 && (
        <Text
          style={{
            textAlign: 'center',
            color: textColor,
            fontSize: fontSizes.large,
          }}>
          {remainingSets} {remainingSets === 1 ? 'set' : 'sets'} to go. Keep it
          up!
        </Text>
      )}
      {timerState === 'done' && remainingSets === 0 && (
        <Text
          style={{
            textAlign: 'center',
            color: textColor,
            fontSize: fontSizes.large,
          }}>
          Good job!
        </Text>
      )}
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {!!remainingSec && (
          <Text style={{color: textColor, fontSize: fontSizes.large}}>
            {remainingSec}
          </Text>
        )}
        {!autoStart && timerState === 'ready' && (
          <TouchableOpacity
            onPress={startSet}
            style={{
              backgroundColor: 'green',
              ...buttonStyle,
            }}>
            <Text
              style={{
                textAlign: 'center',
                color: 'white',
                fontSize: fontSizes.medium,
                fontWeight: 'bold',
              }}>
              Start
            </Text>
          </TouchableOpacity>
        )}
        {timerState === 'done' && remainingSets > 0 && (
          <TouchableOpacity
            onPress={() => {
              startSet();
            }}
            style={{
              backgroundColor: 'green',
              ...buttonStyle,
            }}>
            <Text
              style={{
                textAlign: 'center',
                color: 'white',
                fontSize: fontSizes.medium,
                fontWeight: 'bold',
              }}>
              Start Next Set
            </Text>
          </TouchableOpacity>
        )}
        {timerState === 'done' && remainingSets === 0 && (
          <TouchableOpacity
            onPress={() => {
              setTimerState('ready');
              setRemainingSec(undefined);
              setRemainingReps(reps);
              setRemainingSets(sets);
            }}
            style={{
              backgroundColor: 'red',
              ...buttonStyle,
            }}>
            <Text
              style={{
                textAlign: 'center',
                color: 'white',
                fontSize: fontSizes.medium,
                fontWeight: 'bold',
              }}>
              Reset
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Timer;
