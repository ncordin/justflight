import { getGlobalBoardConnectionInstance } from 'libs/board';
import { Handlers, ReceiverProtocol, ReceiverProtocolHandler } from 'settings/adapters/types';

const read = (): Promise<ReceiverProtocol> => {
  const board = getGlobalBoardConnectionInstance();

  return board.get('serialrx_provider');
};

const save = (value: ReceiverProtocol) => {
  const board = getGlobalBoardConnectionInstance();

  board.set('serialrx_provider', value);
};

const handler: ReceiverProtocolHandler = {
  type: Handlers.ReceiverProtocol,
  read,
  save,
};

export default handler;
