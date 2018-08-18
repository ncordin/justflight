import board from '../../board';

const CONVERSION_RATIO = 10;

const read = () => {
  return board
    .get('dterm_setpoint_weight')
    .then(response => parseInt(Math.round(response / CONVERSION_RATIO)));
};

const save = value => {
  board.set('dterm_setpoint_weight', value * CONVERSION_RATIO);
};

export default {
  name: 'stickAcceleration',
  read,
  save,
};
