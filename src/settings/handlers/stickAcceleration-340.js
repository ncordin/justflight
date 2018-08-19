import board from '../../board';

const CONVERSION_RATIO = 10;

const read = () => {
  return board
    .get('dterm_setpoint_weight')
    .then(response => parseInt(Math.round(response / CONVERSION_RATIO)))
    .then(current => ({ current }));
};

const save = ({ current }) => {
  board.set('dterm_setpoint_weight', current * CONVERSION_RATIO);
};

export default {
  name: 'stickAcceleration',
  read,
  save,
};
