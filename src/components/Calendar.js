import React, {useState, useMemo, useCallback} from 'react';
import {Calendar as RNCalendar} from 'react-native-calendars';

const Calendar = ({textColor, backgroundColor}) => {
  console.log('render')
  const [selected, setSelected] = useState();

  const onDayPress = useCallback((day) => {
    setSelected(day.dateString);
  }, []);

  const marked = useMemo(() => {
    return {
      [selected]: {
        selected: true,
        disableTouchEvent: true,
        selectedColor: textColor,
        selectedTextColor: backgroundColor,
      }
    };
  }, [selected]);

  return (
    <RNCalendar
      enableSwipeMonths
      onDayPress={onDayPress}
      markedDates={marked}
      hideExtraDays
      theme={{
        calendarBackground: backgroundColor,
        textSectionTitleColor: textColor,
        textSectionTitleDisabledColor: textColor,
        selectedDayBackgroundColor: textColor,
        selectedDayTextColor: backgroundColor,
        todayTextColor: '#2db3e3',
        dayTextColor: textColor,
        textDisabledColor: 'gray',
        dotColor: textColor,
        selectedDotColor: textColor,
        arrowColor: textColor,
        disabledArrowColor: backgroundColor,
        monthTextColor: textColor,
      }}
    />
  );
};

export default Calendar;