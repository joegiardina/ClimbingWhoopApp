import React from 'react';
import {View} from 'react-native';
import MainStack from './MainStack';
import Text from '../components/Text';
import HistoryScreen from '../screens/HistoryScreen';
import CustomizeStack from './CustomizeStack';
import {useThemeContext} from '../contexts/themeContext';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import useCustomize from '../hooks/useCustomize';
import {CustomizeContext} from '../contexts/customizeContext';
import {
  HomeIcon,
  CalendarIcon,
  EditIcon,
  SettingsIcon,
} from '../components/TabBarIcon';

function SettingsScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

const TabNavigator: React.FC<{backgroundColor: string}> = ({
  backgroundColor,
}) => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {backgroundColor},
      }}>
      <Tab.Screen
        name="Today"
        component={MainStack}
        options={{
          tabBarIcon: HomeIcon,
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={HistoryScreen}
        options={{
          tabBarIcon: CalendarIcon,
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="Customize"
        component={CustomizeStack}
        options={{
          tabBarIcon: EditIcon,
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: SettingsIcon,
          tabBarShowLabel: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default function Tabs() {
  const {themeContext} = useThemeContext();
  const {context} = useCustomize();
  const {backgroundColor} = themeContext.colors;
  return (
    <CustomizeContext.Provider value={context}>
      <TabNavigator backgroundColor={backgroundColor} />
    </CustomizeContext.Provider>
  );
}
