import board from '../../board';

const read = () => {
  return board.get('serialrx_provider');
};

const save = value => {
  board.set('serialrx_provider', value);
};

export default {
  name: 'receiverProtocol',
  read,
  save,
};
