import { findKey } from 'lodash';
import board from '../../board';

const DISPLAY_VALUES = {
  100: 'smooth',
  50: 'medium',
  0: 'twitchy',
};

const read = () => {
  return board
    .get('setpoint_relax_ratio')
    .then(response => DISPLAY_VALUES[response]);
};

const save = displayValue => {
  const value = findKey(DISPLAY_VALUES, value => value === displayValue);

  board.set('setpoint_relax_ratio', value);
};

export default {
  name: 'stickTransition',
  read,
  save,
};
