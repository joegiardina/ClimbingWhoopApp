import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {radii} from '../../style';

const DAYS = ['M', 'T', 'W', 'Th', 'F', 'Sa', 'Su'];

const WorkoutPicker: React.FC<{textColor:string, setWorkout:Function, data:any}> = ({textColor, setWorkout, data}) => {
  const [phase, setPhase] = useState<number>(-1);
  const [day, setDay] = useState<string | undefined>();

  useEffect(() => {
    if (phase > -1 && day && data) {
      setWorkout(data[phase][DAYS.indexOf(day)]);
    }
  }, [day, phase, data]);

  const getColor = (isSelected: Boolean) => isSelected ? 'green' : textColor;

  return (
    <>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}>
        {[0, 1, 2, 3].map((_phase, key) => (
        <TouchableOpacity
          key={key}
          onPress={() => setPhase(_phase)}
          style={{
            marginLeft: 12,
            borderWidth: 1,
            borderColor: getColor(phase === _phase),
            borderRadius: radii.normal,
            padding: 12
          }}>
          <Text style={{color: getColor(phase === _phase)}}>Phase {_phase}</Text>
        </TouchableOpacity>
        ))}
      </View>
      <View
        style={{
        display: 'flex',
        flexDirection: 'row',
        marginTop: 12,
      }}>
        {DAYS.map((_day, key) => (
          <TouchableOpacity
            key={key}
            onPress={() => setDay(_day)}
            style={{
              marginLeft: 12,
              borderWidth: 1,
              borderColor: getColor(day === _day),
              borderRadius: radii.normal,
              padding: 12
            }}>
            <Text style={{color: getColor(day === _day)}}>{_day}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
};

export default WorkoutPicker;