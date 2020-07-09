import React, { useCallback } from 'react';
// use classic theme in TimePicker
import TimePicker from 'react-times';
import 'react-times/css/classic/default.css';

import { useStoreActions, useStoreState } from 'easy-peasy';

const PickTime = () => {
  const timeSelected = useStoreState((state) => state.transaction.jam);
  const setTimeSelected = useStoreActions(
    (actions) => actions.transaction.setJam
  );

  const onTimeChange = useCallback(({ hour, minute, meridiem }) => {
    return setTimeSelected(`${hour}:${minute}`);
  }, []);

  return (
    <TimePicker
      time={timeSelected}
      timeFormat='HH:MM'
      theme='classic'
      timeMode='24'
      timeConfig={{
        from: 8,
        to: 17,
        step: 30,
        unit: 'minutes',
      }}
      onTimeChange={onTimeChange}
    />
  );
};

export default PickTime;
