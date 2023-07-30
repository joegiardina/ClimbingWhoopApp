import React, {useState, useEffect} from 'react';
import Button from '../components/Button';
import Text from '../components/Text';
import View from '../components/View';
import Screen from '../components/Screen';
import RouteDisplay from '../components/RouteDisplay';
import WorkoutList from '../components/WorkoutList';
import {WorkoutInterface} from '../interface';
import { TouchableOpacity, FlatList } from 'react-native';

import {spacing} from '../../style';
import {WORKOUT_SCREEN} from '../constants/navigation';
import {useCustomizeContext} from '../contexts/customizeContext';

// TODO: properly type navigation
const Home: React.FC<{navigation: any}> = ({navigation}) => {
  console.log('render ticklist')
  const {ticklist, updateTicklist} = useCustomizeContext();
  const {updated} = ticklist;
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState('');
  useEffect(() => {
    if (ticklist.data) {
      setData(ticklist.data);
    }
  }, [ticklist]);

  useEffect(() => {
    if (filter === 'boulders') {
      const newData = ticklist.data.filter(d => d['Rating Code'] >= 20000);
      setData(newData);
    } else if (filter === 'ropes') {
      setData(ticklist.data.filter(d => d['Rating Code'] < 20000))
    } else {
      setData(ticklist.data);
    }
  }, [filter]);

  return (
    <Screen>
      <View style={{marginBottom: spacing.large}}>
        <Text large>
          Ticklist
        </Text>
        <View row style={{justifyContent: 'space-between', alignItems: 'center'}}>
          <Text>Updated: {new Date(updated).toDateString()}</Text>
          <Button small textOnly onPress={() => updateTicklist()} text='Update' />
        </View>
      </View>
      <View row style={{justifyContent: 'space-around'}}>
        <Button outline small text='Boulders' onPress={() => setFilter('boulders')}/>
        <Button outline small text='Ropes' onPress={() => setFilter('ropes')}/>
        <Button outline small text='All' onPress={() => setFilter('')}/>
      </View>
      {ticklist?.data?.length && (
        <FlatList
          data={data}
          renderItem={({item, index}) => (
            <View key={index}>
              <RouteDisplay route={item} />
            </View>
        )}
        />
      )}
    </Screen>
  );
};

export default Home;
