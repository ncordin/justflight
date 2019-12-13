import { findKey } from 'lodash';
import { getGlobalBoardConnectionInstance } from 'libs/board';

const DISPLAY_VALUES = {
  100: 'smooth',
  50: 'medium',
  0: 'twitchy',
};

const read = () => {
  const board = getGlobalBoardConnectionInstance();

  return board
    .get('setpoint_relax_ratio')
    .then(response => DISPLAY_VALUES[response])
    .then(current => ({ current }));
};

const save = ({ current }) => {
  const board = getGlobalBoardConnectionInstance();
  const value = findKey(DISPLAY_VALUES, value => value === current);

  board.set('setpoint_relax_ratio', value);
};

export default {
  name: 'stickTransition',
  read,
  save,
};
