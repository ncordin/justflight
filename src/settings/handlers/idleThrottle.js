import board from '../../board';

const CONVERSION_RATIO = 100;

const read = () => {
  return board
    .get('dshot_idle_value')
    .then(response => parseFloat(response / CONVERSION_RATIO))
    .then(current => ({ current }));
};

const save = ({ current }) => {
  board.set('dshot_idle_value', current * CONVERSION_RATIO);
};

export default {
  name: 'idleThrottle',
  read,
  save,
};
