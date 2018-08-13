import board from '../../board';

const read = () => {
  return board
    .get('yaw_motors_reversed')
    .then(response => (response === 'OFF' ? 'normal' : 'inverted'));
};

const save = display => {
  const value = { normal: 'OFF', inverted: 'ON' }[display];

  board.set('yaw_motors_reversed', value);
};

export default {
  name: 'propsDirection',
  read,
  save,
};
