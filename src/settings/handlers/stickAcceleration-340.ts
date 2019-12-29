import { getGlobalBoardConnectionInstance } from 'libs/board';
import { StickAcceleration, Handlers, StickAccelerationHandler } from 'settings/adapters/types';

const CONVERSION_RATIO = 10;

const read = (): Promise<StickAcceleration> => {
  const board = getGlobalBoardConnectionInstance();

  return board
    .get('dterm_setpoint_weight')
    .then(response => parseInt(response))
    .then(response => Math.round(response / CONVERSION_RATIO));
};

const save = (value: StickAcceleration) => {
  const board = getGlobalBoardConnectionInstance();

  board.set('dterm_setpoint_weight', value * CONVERSION_RATIO);
};

const handler: StickAccelerationHandler = {
  type: Handlers.StickAcceleration,
  read,
  save,
};

export default handler;
