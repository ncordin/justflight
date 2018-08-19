import board from '../../board';
import { findSuperRateFromVelocity } from '../../helpers/rates';
import { buildSuperRateList } from '../../helpers/rates';
import {
  FIXED_RC_RATE,
  DEFAULT_VELOCITY,
} from '../../constants/settings.constants';

const read = () => {
  return board.get('roll_srate').then(response => {
    const superRate = (response / 100).toFixed(2);
    const superRates = buildSuperRateList();
    const current = superRates[superRate] || DEFAULT_VELOCITY;

    return { current };
  });
};

const save = ({ current: velocity }) => {
  board.set('roll_rc_rate', FIXED_RC_RATE * 100);
  board.set('pitch_rc_rate', FIXED_RC_RATE * 100);
  board.set('yaw_rc_rate', FIXED_RC_RATE * 100);

  const superRate = findSuperRateFromVelocity(velocity);
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
