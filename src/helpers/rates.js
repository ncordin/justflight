import { findKey, clamp, range } from 'lodash';
import { closest } from './numbers';
import { FIXED_RC_RATE } from '../constants/settings.constants';

export const getVelocity = function(rcInput, superRate, expo) {
  if (expo) {
    rcInput = rcInput ** 4 * expo + rcInput * (1.0 - expo);
  }

  let angleRate = 200.0 * FIXED_RC_RATE * rcInput;

  if (superRate !== 0) {
    const rcSuperFactor = 1.0 / clamp(1.0 - rcInput * superRate, 0.01, 1.0);
    angleRate *= rcSuperFactor;
  }

  return Math.round(angleRate);
};

export const buildSuperRateList = () => {
  return range(0, 80, 1)
    .map(value => (value / 100).toFixed(2))
    .map(value => ({
      superRate: value,
      velocity: Math.round(getVelocity(1, value, 0)),
    }))
    .filter(value => value.velocity >= 500 && value.velocity <= 1250)
    .reduce((accumulator, current) => {
      return {
        ...accumulator,
        [current.superRate]: current.velocity,
      };
    }, {});
};

export const buildExpoList = superRate => {
  return range(0, 80, 2)
    .map(value => (value / 100).toFixed(2))
    .map(value => ({
      expo: value,
      velocity: Math.round(getVelocity(0.5, superRate, value)),
    }))
    .reverse()
    .reduce((accumulator, current) => {
      return {
        ...accumulator,
        [current.expo]: current.velocity,
      };
    }, {});
};

export const findSuperRateFromVelocity = velocity => {
  const superRates = buildSuperRateList();
  const velocities = Object.values(superRates);
  const validVelocity = closest(velocities, velocity);

  return findKey(superRates, value => validVelocity === value);
};

export const findExpoFromMidVelocity = (superRate, midVelocity) => {
  const expos = buildExpoList(superRate);
  const velocities = Object.values(expos);
  const validVelocity = closest(velocities, midVelocity);

  return findKey(expos, value => validVelocity === value);
};
