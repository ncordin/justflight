import { findKey } from 'lodash';

import { getGlobalBoardConnectionInstance } from 'libs/board';

const MASK = '64';

const portToDisplay = port => `UART ${parseInt(port) + 1}`;
const displayToPort = display => parseInt(display.slice(5)) - 1;

const read = () => {
  const board = getGlobalBoardConnectionInstance();

  return board.sendCommand('serial').then(response => {
    const [, , ...portLines] = response.split('\n');
    const ports = portLines.reduce((accumulator, current) => {
      const [lineType, port, mask] = current.split(' ');

      return lineType === 'serial'
        ? { ...accumulator, [port]: mask }
        : accumulator;
    }, {});

    const choices = Object.keys(ports).map(port => portToDisplay(port));
    const current = findKey(ports, value => value === MASK) || 0;

    return { current: portToDisplay(current), choices };
  });
};

const save = ({ current, choices }) => {
  const board = getGlobalBoardConnectionInstance();
  const selectedPort = displayToPort(current);

  choices.forEach(display => {
    const port = displayToPort(display);

    board.sendCommand(`serial ${port} 0 115200 57600 0 115200`);
  });

  board.sendCommand(`serial ${selectedPort} ${MASK} 115200 57600 0 115200`);
};

export default {
  name: 'receiverPort',
  read,
  save,
};
