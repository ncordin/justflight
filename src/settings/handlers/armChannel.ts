import { findKey } from 'lodash';

import { getGlobalBoardConnectionInstance } from 'libs/board';
import {
  Handlers,
  ArmChannelHandler,
  ArmChannel,
} from 'settings/adapters/types';

const channelsToDisplay: { [key: number]: ArmChannel } = {
  0: 'AUX 1',
  1: 'AUX 2',
  2: 'AUX 3',
};

const read = () => {
  const board = getGlobalBoardConnectionInstance();

  return board.sendCommand('aux').then(response => {
    const [, armLine] = response.split('\n');
    const [, , , channel] = armLine.split(' ');

    return channelsToDisplay[parseInt(channel)];
  });
};

const save = (current: ArmChannel) => {
  const board = getGlobalBoardConnectionInstance();
  const channel = findKey(
    channelsToDisplay,
    (value: ArmChannel) => value === current
  );

  board.sendCommand(`aux 0 0 ${channel} 1400 2100 0`);
};

const handler: ArmChannelHandler = {
  type: Handlers.ArmChannel,
  read,
  save,
};

export default handler;
