import React from 'react';
import {View} from 'react-native';
import MainStack from './MainStack';
import Text from '../components/Text';
import HistoryScreen from '../screens/HistoryScreen';
import CustomizeScreen from '../screens/CustomizeScreen';
import CustomizeStack from './CustomizeStack';
import {useThemeContext} from '../contexts/themeContext';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import useCustomize from '../hooks/useCustomize';
import {CustomizeContext} from '../contexts/customizeContext';

function SettingsScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function Tabs() {
  const {themeContext} = useThemeContext();
  const {context} = useCustomize();
  const {backgroundColor} = themeContext.colors;
  return (
    <CustomizeContext.Provider value={context}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {backgroundColor},
        }}>
        <Tab.Screen
          name="Today"
          component={MainStack}
          options={{
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
            tabBarShowLabel: false,
          }}
        />
        <Tab.Screen
          name="Calendar"
          component={HistoryScreen}
          options={{
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons
                name="calendar-clock"
                color={color}
                size={size}
              />
            ),
            tabBarShowLabel: false,
          }}
        />
        <Tab.Screen
          name="Customize"
          component={CustomizeStack}
          options={{
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons
                name="clipboard-edit-outline"
                color={color}
                size={size}
              />
            ),
            tabBarShowLabel: false,
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons
                name="cog-outline"
                color={color}
                size={size}
              />
            ),
            tabBarShowLabel: false,
          }}
        />
      </Tab.Navigator>
    </CustomizeContext.Provider>
  );
}
