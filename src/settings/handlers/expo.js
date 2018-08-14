import board from '../../board';
import { getVelocity } from '../../helpers/rates';
import { findSuperRateFromVelocity } from '../../helpers/rates';
import { findExpoFromMidVelocity } from '../../helpers/rates';

const read = () => {
  const superRatePromise = board.get('roll_srate');
  const expoPromise = board.get('roll_expo');

  return Promise.all([superRatePromise, expoPromise]).then(response => {
    const superRate = (response[0] / 100).toFixed(2);
    const expo = (response[1] / 100).toFixed(2);

    return getVelocity(0.5, superRate, expo);
  });
};

const save = (midVelocity, { rates }) => {
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
