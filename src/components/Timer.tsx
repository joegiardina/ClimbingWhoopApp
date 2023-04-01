import React, {useState, useEffect} from 'react';
import Button from './Button';
import Text from './Text';
import {TouchableOpacity} from 'react-native';
import {spacing} from '../../style';
import View from './View';

interface TimerProps {
  prepTime: number;
  workTime: number;
  restTime: number;
  sets: number;
  reps: number;
  autoStart: boolean;
  onFinish?: Function;
}

const Timer: React.FC<TimerProps> = ({
  prepTime,
  workTime,
  restTime,
  sets,
  reps,
  autoStart,
  onFinish,
}) => {
  const [currentSet, setCurrentSet] = useState(0);
  const [rep, setRep] = useState(0);
  const [isActive, setIsActive] = useState(autoStart);
  const [state, setState] = useState<
    'ready' | 'preparing' | 'working' | 'resting' | 'done' | null
  >('ready');
  const [timeLeft, setTimeLeft] = useState<number>(-1);

  useEffect(() => {
    if (isActive && state === 'ready') {
      setState('preparing');
    }
  }, [isActive]);

  useEffect(() => {
    if (state === 'preparing') {
      setTimeLeft(prepTime);
    } else if (state === 'working') {
      setTimeLeft(workTime);
    } else if (state === 'resting') {
      setTimeLeft(restTime);
    }
  }, [state]);

  useEffect(() => {
    if (timeLeft > 0 && isActive) {
      const timer = setTimeout(() => {
        if (timeLeft > 0) {
          setTimeLeft(timeLeft - 1);
        }
      }, 1000);
      return () => clearTimeout(timer);
    } else if (isActive) {
      const finishedReps = rep === reps;
      const finishedSets = currentSet === sets;

      if (state === 'preparing') {
        if (workTime) {
          setState('working');
        } else if (restTime) {
          setState('resting');
        }
        return;
      }

      if (finishedReps) {
        setIsActive(false);
        if (finishedSets) {
          setState('done');
          if (onFinish) {
            onFinish();
          }
        } else {
          setCurrentSet(currentSet + 1);
          setRep(1);
          setState('ready');
        }
      } else {
        if (state === 'working') {
          setState('resting');
        } else if (state === 'resting') {
          setRep(rep + 1);
          setState('working');
        }
      }
    }
  }, [timeLeft]);

  const handleStart = () => {
    setRep(1);
    setCurrentSet(1);
    setIsActive(true);
  };

  const handleReset = () => {
    setIsActive(false);
    setRep(1);
    setCurrentSet(1);
    setState('ready');
    setTimeLeft(0);
  };

  let backgroundColor;
  if (state === 'preparing') {
    backgroundColor = 'purple';
  } else if (state === 'working') {
    backgroundColor = 'red';
  } else if (state === 'resting') {
    backgroundColor = 'blue';
  }

  return (
    <TouchableOpacity
      disabled={isActive}
      onPress={handleStart}
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>
        {rep}° of {reps} reps
      </Text>
      <Text>
        {currentSet}° of {sets} sets
      </Text>
      <View style={{margin: spacing.large, flex: 1, justifyContent: 'center'}}>
        {!isActive && state === 'ready' && <Text large>START</Text>}
        {isActive && (
          <View
            centered
            style={{
              height: 250,
              width: 250,
              padding: spacing.extraLarge,
              backgroundColor,
              borderRadius: 200,
            }}>
            <Text large>
              {state === 'preparing'
                ? 'GET READY'
                : state === 'working'
                ? 'GET IT!!'
                : 'Rest'}
            </Text>
            {timeLeft > 0 && <Text huge>{timeLeft}</Text>}
          </View>
        )}
        {!isActive && state === 'done' && <Text large>Good work.</Text>}
      </View>
      {state === 'done' && (
        <Button outline text="Reset" onPress={handleReset} />
      )}
    </TouchableOpacity>
  );
};

export default Timer;
