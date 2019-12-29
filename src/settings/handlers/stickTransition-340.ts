import { findKey } from 'lodash';

import { getGlobalBoardConnectionInstance } from 'libs/board';
import {
  Handlers,
  StickTransitionHandler,
  StickTransition,
} from 'settings/adapters/types';

type Values = '100' | '50' | '0';

const DISPLAY_VALUES: { [key: string]: StickTransition } = {
  100: 'smooth',
  50: 'medium',
  0: 'twitchy',
};

const read = (): Promise<StickTransition> => {
  const board = getGlobalBoardConnectionInstance();

  return board
    .get('setpoint_relax_ratio')
    .then(response => DISPLAY_VALUES[response as Values]);
};

const save = (current: StickTransition) => {
  const board = getGlobalBoardConnectionInstance();
  const value =
    findKey(DISPLAY_VALUES, (value: StickTransition) => value === current) ||
    'medium';

  board.set('setpoint_relax_ratio', value);
};

const handler: StickTransitionHandler = {
  type: Handlers.StickTransition,
  read,
  save,
};

export default handler;
