import React, { useState } from 'react';
import { DateRangePicker } from 'react-dates';
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import moment from 'moment';

const PickDate = ({ startDate, endDate, setStartDate, setEndDate }) => {
  const [calendarFocused, setCalendarFocused] = useState(null);

  return (
    <DateRangePicker
      startDate={startDate}
      startDateId='startTglPengerjaan'
      endDate={endDate}
      endDateId='endTglPengerjaan'
      onDatesChange={({ startDate, endDate }) => {
        setStartDate(startDate);
        setEndDate(endDate);
      }}
      displayFormat={() => 'DD/MM/YYYY'}
      focusedInput={calendarFocused}
      onFocusChange={(focusedInput) => setCalendarFocused(focusedInput)}
      numberOfMonths={1}
      isOutsideRange={() => {
        true;
      }}
    />
  );
};

export default PickDate;
