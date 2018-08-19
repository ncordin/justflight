import board from '../../board';

const read = () => {
  return board.get('serialrx_provider').then(current => ({
    current,
  }));
};

const save = ({ current }) => {
  board.set('serialrx_provider', current);
};

export default {
  name: 'receiverProtocol',
  read,
  save,
};
