import board from '../../board';

const CONVERSION_RATIO = 100;

const read = () => {
  return board
    .get('dshot_idle_value')
    .then(response => parseFloat(response / CONVERSION_RATIO));
};

const save = value => {
  board.set('dshot_idle_value', value * CONVERSION_RATIO);
};

export default {
  name: 'idleThrottle',
  read,
  save,
};
