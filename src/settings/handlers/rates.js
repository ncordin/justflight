import board from '../../board';

const read = () => {
  return board.get('roll_srate').then(response => parseInt(response));
};

const save = value => {
  board.set('roll_srate', value);
  board.set('pitch_srate', value);
  board.set('yaw_srate', value);
};

export default {
  name: 'rates',
  read,
  save,
};
