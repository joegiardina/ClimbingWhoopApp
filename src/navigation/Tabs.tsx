import React from 'react';
import MainStack from './MainStack';
import HistoryScreen from '../screens/HistoryScreen';
import SettingsScreen from '../screens/SettingsScreen';
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
import LoadingOverlay from '../components/LoadingOverlay';

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
      {/* <Tab.Screen
        name="Calendar"
        component={HistoryScreen}
        options={{
          tabBarIcon: CalendarIcon,
          tabBarShowLabel: false,
        }}
      /> */}
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
  const {ready, context} = useCustomize();
  const {backgroundColor} = themeContext.colors;
  return (
    <>
      {!ready && <LoadingOverlay />}
      <CustomizeContext.Provider value={context}>
        <TabNavigator backgroundColor={backgroundColor} />
      </CustomizeContext.Provider>
    </>
  );
}
