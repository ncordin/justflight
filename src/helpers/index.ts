import { getGlobalBoardConnectionInstance } from 'libs/board';

interface RawDetails {
  version: string;
  status: string;
  protocol: string;
  gyroDenom: string;
  pidDenom: string;
}

type ChipFamilly = 'F3' | 'F4' | 'F7' | 'F?';

export interface BoardDetails {
  firmware: string;
  version: string;
  brand: string;
  tag: string;
  family: ChipFamilly;
  clock: string;
  gyro: string;
  protocol: string;
  loops: string;
  load: number;
}

const boardDetailsParser = (rawDetails: RawDetails): BoardDetails => {
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

  const loops = `${8 / parseInt(gyroDenom)}K / ${8 /
    parseInt(gyroDenom) /
    parseInt(pidDenom)}K`;

  const family: ChipFamilly =
    ({
      '72MHz': 'F3',
      '168MHz': 'F4',
      '216MHz': 'F7',
    } as any)[clock] || 'F?';

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
    load: parseInt(load),
  };
};

export const boardDetailsFetcher = () => {
  const board = getGlobalBoardConnectionInstance();

  return Promise.all([
    board.sendCommand('version'),
    board.sendCommand('status'),
    board.get('motor_pwm_protocol'),
    board.get('gyro_sync_denom'),
    board.get('pid_process_denom'),
  ]).then(([version, status, protocol, gyroDenom, pidDenom]) => {
    const rawDetails: RawDetails = {
      version,
      status,
      protocol,
      gyroDenom,
      pidDenom,
    };

    return boardDetailsParser(rawDetails);
  });
};
