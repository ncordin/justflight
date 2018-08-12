import board from '../board';

const boardDetailsParser = rawDetails => {
  const {
    version: versionRaw,
    status,
    protocol,
    gyroDenom,
    pidDenom,
  } = rawDetails;

  const versionRegex = /(\w+) \/ (\w+) \((\w+)\) (\S+)/;
  const [, firmware, brand, tag, version] =
    versionRaw.match(versionRegex) || [];

  const [, clock] = status.match(/Clock=(\w+)/) || [];
  const [, load] = status.match(/CPU:(\w+)/) || [];
  const [, gyro] = status.match(/GYRO=(\w+)/) || [];

  const loops = `${8 / gyroDenom}K / ${8 / gyroDenom / pidDenom}K`;

  const family =
    {
      '72MHz': 'F3',
      '168MHz': 'F4',
      '216MHz': 'F7',
    }[clock] || 'F?';

  return {
    firmware: firmware.toUpperCase(),
    version,
    brand,
    tag,
    family,
    clock,
    gyro,
    protocol,
    loops,
    load: `${load}%`,
  };

  return details;
};

export const boardDetailsFetcher = () => {
  return Promise.all([
    board.sendCommand('version'),
    board.sendCommand('status'),
    board.get('motor_pwm_protocol'),
    board.get('gyro_sync_denom'),
    board.get('pid_process_denom'),
  ]).then(([version, status, protocol, gyroDenom, pidDenom]) => {
    const rawDetails = {
      version,
      status,
      protocol,
      gyroDenom,
      pidDenom,
    };

    return boardDetailsParser(rawDetails);
  });
};
