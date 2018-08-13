import board from '../../board';

const CONVERSION_RATIO = 4;

const read = () => {
  return board
    .get('roll_expo')
    .then(response => parseInt(Math.round(response / CONVERSION_RATIO)));
};

const save = display => {
  const value = display * CONVERSION_RATIO;

  board.set('roll_expo', value);
  board.set('pitch_expo', value);
  board.set('yaw_expo', value);
};

export default {
  name: 'expo',
  read,
  save,
};
