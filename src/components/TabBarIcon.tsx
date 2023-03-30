import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface IconProps {
  color: string;
  size: number;
}

export const HomeIcon: React.FC<IconProps> = ({color, size}) => (
  <MaterialCommunityIcons name="home" color={color} size={size} />
);

export const CalendarIcon: React.FC<IconProps> = ({color, size}) => (
  <MaterialCommunityIcons name="calendar-clock" color={color} size={size} />
);

export const EditIcon: React.FC<IconProps> = ({color, size}) => (
  <MaterialCommunityIcons
    name="clipboard-edit-outline"
    color={color}
    size={size}
  />
);

export const SettingsIcon: React.FC<IconProps> = ({color, size}) => (
  <MaterialCommunityIcons name="cog-outline" color={color} size={size} />
);
