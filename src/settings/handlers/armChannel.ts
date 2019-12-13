import { findKey } from 'lodash';
import { getGlobalBoardConnectionInstance } from 'libs/board';

const channelsToDisplay = {
  0: 'AUX 1',
  1: 'AUX 2',
  2: 'AUX 3',
};

const read = () => {
  const board = getGlobalBoardConnectionInstance();

  return board.sendCommand('aux').then(response => {
    const [, armLine] = response.split('\n');
    const [, , , channel] = armLine.split(' ');
    const current = channelsToDisplay[parseInt(channel)];

    return { current };
  });
};

const save = ({ current }) => {
  const board = getGlobalBoardConnectionInstance();
  const channel = findKey(channelsToDisplay, value => value === current);

  board.sendCommand(`aux 0 0 ${channel} 1400 2100 0`);
};

export default {
  name: 'armChannel',
  read,
  save,
};
