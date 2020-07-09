import React, { useState, useEffect } from 'react';
import { DateRangePicker } from 'react-dates';
import moment from 'moment';
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'

import { useStoreState, useStoreActions } from 'easy-peasy';

const PickDate = () => {
  const { items } = useStoreState((state) => state.transaction);
  const [calendarFocused, setCalendarFocused] = useState(null);

  const { startDateModel, endDateModel } = useStoreState((state) => ({
    startDateModel: state.transaction.startDate,
    endDateModel: state.transaction.endDate,
  }));

  const { setStartDateModel, setEndDateModel } = useStoreActions((actions) => ({
    setStartDateModel: actions.transaction.setStartDate,
    setEndDateModel: actions.transaction.setEndDate,
  }));

  useEffect(() => {
    if ((items || []).length !== 0) {
      const maxDurasi = Math.max.apply(
        Math,
        items.map((item) => item.durasi)
      );
      setStartDateModel(moment());
      setEndDateModel(moment().add(maxDurasi, 'd'));
    }
  }, [items]);

  return (
    <DateRangePicker
      startDate={startDateModel}
      startDateId='startTglPengerjaan'
      endDate={endDateModel}
      endDateId='endTglPengerjaan'
      onDatesChange={({ startDate, endDate }) => {
        setStartDateModel(startDate);
        setEndDateModel(endDate);
      }}
      displayFormat={() => 'DD MMM YYYY'}
      focusedInput={calendarFocused}
      onFocusChange={(focusedInput) => setCalendarFocused(focusedInput)}
      numberOfMonths={1}
      isOutsideRange={() => {
        true;
      }}
      // onClose={({ startDate, endDate }) => {
      //   setStartDateModel(startDate.format('LLL'));
      //   setEndDateModel(endDate.format('LLL'));
      // }}
    />
  );
};

export default PickDate;
