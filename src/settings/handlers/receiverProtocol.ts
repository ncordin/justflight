import { getGlobalBoardConnectionInstance } from 'libs/board';

const read = () => {
  const board = getGlobalBoardConnectionInstance();

  return board.get('serialrx_provider').then(current => ({
    current,
  }));
};

const save = ({ current }) => {
  const board = getGlobalBoardConnectionInstance();

  board.set('serialrx_provider', current);
};

export default {
  name: 'receiverProtocol',
  read,
  save,
};
