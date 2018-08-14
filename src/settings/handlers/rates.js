import { findKey } from 'lodash';

import board from '../../board';
import { buildSuperRateList } from '../../helpers/rates';
import { closest } from '../../helpers/numbers';

const FIXED_RC_RATE = 2.0;

const read = () => {
  return board.get('roll_srate').then(response => {
    const superRate = (response / 100).toFixed(2);
    const superRates = buildSuperRateList();

    return superRates[superRate];
  });
};

const save = displayVelocity => {
  board.set('roll_rc_rate', FIXED_RC_RATE * 100);
  board.set('pitch_rc_rate', FIXED_RC_RATE * 100);
  board.set('yaw_rc_rate', FIXED_RC_RATE * 100);

  const superRates = buildSuperRateList();
  const velocities = Object.values(superRates);
  const validVelocity = closest(velocities, displayVelocity);
  const superRate = findKey(superRates, value => validVelocity === value);

  const formattedSuperRate = Math.round(superRate * 100);

  board.set('roll_srate', formattedSuperRate);
  board.set('pitch_srate', formattedSuperRate);
  board.set('yaw_srate', formattedSuperRate);
};

export default {
  name: 'rates',
  read,
  save,
};
