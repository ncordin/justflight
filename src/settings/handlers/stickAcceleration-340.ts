import { getGlobalBoardConnectionInstance } from 'libs/board';

const CONVERSION_RATIO = 10;

const read = () => {
  const board = getGlobalBoardConnectionInstance();

  return board
    .get('dterm_setpoint_weight')
    .then(response => parseInt(response))
    .then(response => Math.round(response / CONVERSION_RATIO))
    .then(current => ({ current }));
};

const save = ({ current }) => {
  const board = getGlobalBoardConnectionInstance();

  board.set('dterm_setpoint_weight', current * CONVERSION_RATIO);
};

export default {
  name: 'stickAcceleration',
  read,
  save,
};
