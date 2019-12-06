import board from '../../board';

const read = () => {
  return board
    .get('yaw_motors_reversed')
    .then(response => (response === 'OFF' ? 'normal' : 'inverted'))
    .then(current => ({ current }));
};

const save = ({ current }) => {
  const value = { normal: 'OFF', inverted: 'ON' }[current];

  board.set('yaw_motors_reversed', value);
};

export default {
  name: 'propsDirection',
  read,
  save,
};
