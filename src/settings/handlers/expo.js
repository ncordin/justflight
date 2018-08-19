import board from '../../board';
import { getVelocity } from '../../helpers/rates';
import { findSuperRateFromVelocity } from '../../helpers/rates';
import { findExpoFromMidVelocity } from '../../helpers/rates';
import {
  FIXED_RC_RATE,
  DEFAULT_MID_VELOCITY,
} from '../../constants/settings.constants';

const read = () => {
  const superRatePromise = board.get('roll_srate');
  const expoPromise = board.get('roll_expo');
  const rcRatePromise = board.get('roll_rc_rate');

  return Promise.all([superRatePromise, expoPromise, rcRatePromise])
    .then(response => {
      if (parseInt(response[2]) !== FIXED_RC_RATE * 100) {
        return DEFAULT_MID_VELOCITY;
      }

      const superRate = (response[0] / 100).toFixed(2);
      const expo = (response[1] / 100).toFixed(2);

      return getVelocity(0.5, superRate, expo);
    })
    .then(current => ({ current }));
};

const save = ({ current: midVelocity }, { rates }) => {
  const superRate = findSuperRateFromVelocity(rates);
  const expo = findExpoFromMidVelocity(superRate, midVelocity);
  const formattedValue = parseInt(expo * 100);

  board.set('roll_expo', formattedValue);
  board.set('pitch_expo', formattedValue);
  board.set('yaw_expo', formattedValue);
};

export default {
  name: 'expo',
  read,
  save,
};
