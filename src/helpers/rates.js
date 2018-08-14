const FIXED_RC_RATE = 2.0;

const borne = (value, min, max) => Math.max(Math.min(value, max), min);

const getVelocity = function(rcInput, superRate, expo) {
  if (expo) {
    rcInput = rcInput ** 4 * expo + rcInput * (1.0 - expo);
  }

  let angleRate = 200.0 * FIXED_RC_RATE * rcInput;

  if (superRate !== 0) {
    const rcSuperFactor = 1.0 / borne(1.0 - rcInput * superRate, 0.01, 1.0);
    angleRate *= rcSuperFactor;
  }

  return angleRate;
};

export const buildSuperRateList = () => {
  return new Array(80)
    .fill(1)
    .map((_, index) => (index / 100).toFixed(2))
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
  return new Array(31)
    .fill(1)
    .map((_, index) => ((index * 2) / 100).toFixed(2))
    .map(value => ({
      expo: value,
      velocity: Math.round(getVelocity(0.5, superRate, value)),
    }))
    .reduce((accumulator, current) => {
      return {
        ...accumulator,
        [current.expo]: current.velocity,
      };
    }, {});
};
