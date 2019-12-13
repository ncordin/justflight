import { getGlobalBoardConnectionInstance } from 'libs/board';

const CONVERSION_RATIO = 100;

const read = () => {
  const board = getGlobalBoardConnectionInstance();

  return board
    .get('dshot_idle_value')
    .then(response => parseInt(response, 10))
    .then(response => response / CONVERSION_RATIO)
    .then(current => ({ current }));
};

const save = ({ current }) => {
  const board = getGlobalBoardConnectionInstance();

  board.set('dshot_idle_value', current * CONVERSION_RATIO);
};

export default {
  name: 'idleThrottle',
  read,
  save,
};
