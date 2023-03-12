import React, {useState, useEffect} from 'react';
import _ from 'lodash';
import {TouchableOpacity, Text, View, useColorScheme} from 'react-native';
import {spacing, fontSizes, radii} from '../../style';

const buttonStyle = {
  width: 150,
  borderRadius: radii.normal,
  padding: 12,
};

// TODO: properly type route
const TimerScreen: React.FC<{route:any, navigation:any}> = ({route, navigation}) => {
  const durationPrep = 3;
  const {durationWork, durationRest, reps, sets} = route.params;

  const isDarkMode = useColorScheme() === 'dark';
  const textColor = isDarkMode ? 'white' : 'black';
  const [remainingSec, setRemainingSec] = useState<number | undefined>();
  const [remainingReps, setRemainingReps] = useState<number>(reps);
  const [remainingSets, setRemainingSets] = useState<number>(sets);
  const [intervalId, setIntervalId] = useState<number | undefined>();

  const [timerState, setTimerState] = useState<'preparing' | 'working' | 'resting' | 'done' | 'ready'>('ready');

  let backgroundColor = isDarkMode ? 'black' : 'white';
  if (timerState === 'preparing') {
    backgroundColor = 'purple';
  } else if (timerState === 'working') {
    backgroundColor = 'red';
  } else if (timerState === 'resting') {
    backgroundColor = 'blue';
  }

  useEffect(() => {
    if (timerState === 'done' && remainingSets > 0) {
      console.log('SETTING DONE, REMAINING SETS:', remainingSets);
      setRemainingSets(set => (set || 1) - 1);
    }
  }, [timerState]);

  useEffect(() => {
    let newRemainingSec;
    console.log('remainingSec', remainingSec)
    console.log('remainingReps', remainingReps)
    if (remainingSec === 0 && intervalId) {
      if (timerState === 'preparing') {
        newRemainingSec = durationWork;
        setTimerState('working');
      } else if (timerState === 'working') {
        if (remainingReps > 1) {
          newRemainingSec = durationRest;
        }
        setTimerState(remainingReps > 1 ? 'resting' : 'done');
      } else if (timerState === 'resting' && remainingReps > 0) {
        newRemainingSec = durationWork;
        setRemainingReps(remainingReps => remainingReps - 1);
        setTimerState('working');
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

  const startSet = () => {
    setRemainingReps(reps);
    setRemainingSec(durationPrep);
    setTimerState('preparing');
    const id = setInterval(() => {
      setRemainingSec(sec => (sec || 1) - 1);
    }, 1000);
    setIntervalId(id);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor,
        alignItems: 'center',
        paddingVertical: spacing.large,
        padding: spacing.normal,
      }}>
      {timerState === 'ready' && (
        <View>
          <Text style={{color: textColor, fontSize: fontSizes.large}}>Prep: {durationPrep}</Text>
          <Text style={{color: textColor, fontSize: fontSizes.large}}>Work: {durationWork}</Text>
          <Text style={{color: textColor, fontSize: fontSizes.large}}>Rest: {durationRest}</Text>
          <Text style={{color: textColor, fontSize: fontSizes.large}}>Reps: {reps}</Text>
          <Text style={{color: textColor, fontSize: fontSizes.large}}>Sets: {sets}</Text>
        </View>
      )}
      {/* {timerState === 'done' && !!remainingReps && <Text style={{color: textColor, fontSize: fontSizes.medium}}>Sets Remaining: {remainingSets}</Text>} */}
      {!!timerState && ['working', 'resting'].includes(timerState) && !!remainingReps && <Text style={{color: textColor, fontSize: fontSizes.medium}}>Rep {reps - remainingReps + 1} of {reps}</Text>}
      {timerState === 'preparing' && <Text style={{marginTop: spacing.large, textAlign: 'center', color: textColor, fontSize: fontSizes.extraLarge}}>GET PSYCHED</Text>}
      {timerState === 'working' && <Text style={{marginTop: spacing.large, textAlign: 'center', color: textColor, fontSize: fontSizes.extraLarge}}>Get it!!</Text>}
      {timerState === 'resting' && <Text style={{marginTop: spacing.large, textAlign: 'center', color: textColor, fontSize: fontSizes.extraLarge}}>Rest</Text>}
      {timerState === 'done' && remainingSets > 0 && <Text style={{marginTop: spacing.large, textAlign: 'center', color: textColor, fontSize: fontSizes.extraLarge}}>{remainingSets} {remainingSets === 1 ? 'set' : 'sets'} to go. Keep it up!</Text>}
      {timerState === 'done' && remainingSets === 0 && <Text style={{marginTop: spacing.large, textAlign: 'center', color: textColor, fontSize: fontSizes.extraLarge}}>Good job!</Text>}
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {!!remainingSec && <Text style={{color: textColor, fontSize: fontSizes.huge}}>{remainingSec}</Text>}
        {timerState === 'ready' && (
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
                fontWeight: 'bold'}}>
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
              fontWeight: 'bold'}}>
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
              fontWeight: 'bold'}}>
            Reset
          </Text>
        </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

export default TimerScreen;