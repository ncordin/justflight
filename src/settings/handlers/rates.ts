import { getGlobalBoardConnectionInstance } from 'libs/board';
import { Handlers, Rates, RatesHandler } from 'settings/adapters/types';

import { findSuperRateFromVelocity } from '../../helpers/rates';
import { buildSuperRateList } from '../../helpers/rates';
import { FIXED_RC_RATE, DEFAULT_VELOCITY } from '../../constants/settings.constants';

const read = (): Promise<Rates> => {
  const board = getGlobalBoardConnectionInstance();

  return board.get('roll_srate').then(response => {
    const superRate = (parseInt(response) / 100).toFixed(2);
    const superRates = buildSuperRateList();

    return superRates[superRate] || DEFAULT_VELOCITY;
  });
};

const save = (velocity: Rates) => {
  const board = getGlobalBoardConnectionInstance();

  board.set('roll_rc_rate', FIXED_RC_RATE * 100);
  board.set('pitch_rc_rate', FIXED_RC_RATE * 100);
  board.set('yaw_rc_rate', FIXED_RC_RATE * 100);

  const superRate = findSuperRateFromVelocity(velocity);
  const formattedSuperRate = Math.round(parseInt(superRate) * 100);

  board.set('roll_srate', formattedSuperRate);
  board.set('pitch_srate', formattedSuperRate);
  board.set('yaw_srate', formattedSuperRate);
};

const handler: RatesHandler = {
  type: Handlers.Rates,
  read,
  save,
};

export default handler;
