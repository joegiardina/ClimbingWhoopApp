import React from 'react';
import {View} from 'react-native';
import MainStack from './MainStack';
import Text from '../components/Text';
import {useThemeContext} from '../contexts/themeContext';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function HistoryScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Here you'll be able to view past and future workouts.</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

function CustomizeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Here you'll be able to add exercises and create workouts.</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function Tabs() {
  const {themeContext} = useThemeContext();
  const {backgroundColor, textColor} = themeContext.colors;
  return (
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {backgroundColor}
        }}>
        <Tab.Screen
          name="Today"
          component={MainStack}
          options={{
            tabBarIcon: ({color, size}) => <MaterialCommunityIcons name="home" color={color} size={size} />,
            tabBarShowLabel: false,
          }}
        />
        <Tab.Screen
          name="Calendar"
          component={HistoryScreen}
          options={{
            tabBarIcon: ({color, size}) => <MaterialCommunityIcons name="calendar-clock" color={color} size={size} />,
            tabBarShowLabel: false,
          }}
        />
        <Tab.Screen
          name="Customize"
          component={CustomizeScreen}
          options={{
            tabBarIcon: ({color, size}) => <MaterialCommunityIcons name="clipboard-edit-outline" color={color} size={size} />,
            tabBarShowLabel: false,
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            tabBarIcon: ({color, size}) => <MaterialCommunityIcons name="cog-outline" color={color} size={size} />,
            tabBarShowLabel: false,
          }}
        />
      </Tab.Navigator>
  );
}