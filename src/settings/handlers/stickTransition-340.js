import board from '../../board';

const CONVERSION_RATIO = 10;

const read = () => {
  return board
    .get('setpoint_relax_ratio')
    .then(response => parseInt(Math.round(response / CONVERSION_RATIO)));
};

const save = value => {
  board.set('setpoint_relax_ratio', value * CONVERSION_RATIO);
};

export default {
  name: 'stickTransition',
  read,
  save,
};
