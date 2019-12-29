import { getGlobalBoardConnectionInstance } from 'libs/board';
import { Handlers, PropsDirection, PropsDirectionHandler } from 'settings/adapters/types';

const read = (): Promise<PropsDirection> => {
  const board = getGlobalBoardConnectionInstance();

  return board
    .get('yaw_motors_reversed')
    .then(response => (response === 'OFF' ? 'normal' : 'inverted'));
};

const save = (value: PropsDirection) => {
  const board = getGlobalBoardConnectionInstance();
  const rawValue = { normal: 'OFF', inverted: 'ON' }[value];

  board.set('yaw_motors_reversed', rawValue);
};

const handler: PropsDirectionHandler = {
  type: Handlers.PropsDirection,
  read,
  save,
};

export default handler;
