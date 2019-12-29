import { getGlobalBoardConnectionInstance } from 'libs/board';
import { Handlers, IdleThrottle, IdleThrottleHandler } from 'settings/adapters/types';

const CONVERSION_RATIO = 100;

const read = (): Promise<IdleThrottle> => {
  const board = getGlobalBoardConnectionInstance();

  return board
    .get('dshot_idle_value')
    .then(response => parseInt(response, 10))
    .then(response => response / CONVERSION_RATIO);
};

const save = (value: IdleThrottle) => {
  const board = getGlobalBoardConnectionInstance();

  board.set('dshot_idle_value', value * CONVERSION_RATIO);
};

const handler: IdleThrottleHandler = {
  type: Handlers.IdleThrottle,
  read,
  save,
};

export default handler;
