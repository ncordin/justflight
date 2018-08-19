import { findKey } from 'lodash';
import board from '../../board';

const channelsToDisplay = {
  0: 'AUX 1',
  1: 'AUX 2',
  2: 'AUX 3',
};

const read = () => {
  return board.sendCommand('aux').then(response => {
    const [, armLine] = response.split('\n');
    const [, , , channel] = armLine.split(' ');
    const current = channelsToDisplay[parseInt(channel)];

    return { current };
  });
};

const save = ({ current }) => {
  const channel = findKey(channelsToDisplay, value => value === current);

  board.sendCommand(`aux 0 0 ${channel} 1400 2100 0`);
};

export default {
  name: 'armChannel',
  read,
  save,
};
