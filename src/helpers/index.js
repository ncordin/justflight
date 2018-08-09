import board from '../board';

export const boardDetailsParser = rawDetails => {
  const {
    version: versionRaw,
    status,
    protocol: protocolRaw,
    gyroDenom,
    pidDenom,
  } = rawDetails;

  const versionRegex = /Betaflight \/ (\w+) \((\w+)\) (\S+)/;
  const [, brand, tag, version] = versionRaw.match(versionRegex) || [];

  const [, clock] = status.match(/Clock=(\w+)/) || [];
  const [, load] = status.match(/CPU:(\w+)/) || [];
  const [, gyro] = status.match(/GYRO=(\w+)/) || [];

  const [, protocol] = protocolRaw.match(/motor_pwm_protocol = (\S+)/) || [];
  const [, gyroLoop] = gyroDenom.match(/gyro_sync_denom = (\S+)/) || [];
  const [, pidLoop] = pidDenom.match(/pid_process_denom = (\S+)/) || [];

  const loops = `${8 / gyroLoop}K / ${8 / gyroLoop / pidLoop}K`;

  const family =
    {
      '72MHz': 'F3',
      '168MHz': 'F4',
      '216MHz': 'F7',
    }[clock] || 'F?';

  return {
    brand,
    tag,
    version,
    clock,
    load: `${load}%`,
    gyro,
    protocol,
    loops,
    family,
  };

  // Potentials additional data: temperature / gyro chip...

  return details;
};

export const sendCommands = commands => {
  return Object.entries(commands).reduce((accumulator, [name, command]) => {
    return accumulator.then(chainResults =>
      board.sendCommand(command).then(currentResult => {
        return {
          ...chainResults,
          [name]: currentResult,
        };
      })
    );
  }, Promise.resolve({}));
};
