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

    return channelsToDisplay[parseInt(channel)];
  });
};

const save = display => {
  const channel = findKey(channelsToDisplay, value => value === display);

  board.sendCommand(`aux 0 0 ${channel} 900 1100 0`);
};

export default {
  name: 'armChannel',
  read,
  save,
};
