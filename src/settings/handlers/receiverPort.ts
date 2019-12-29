import { findKey } from 'lodash';

import { getGlobalBoardConnectionInstance } from 'libs/board';
import { Handlers, UartPort, ReceiverPort, ReceiverPortHandler } from 'settings/adapters/types';

const MASK = '64';

const portToDisplay = (port: string) => `UART ${parseInt(port) + 1}` as UartPort;
const displayToPort = (display: UartPort) => parseInt(display.slice(5)) - 1;

const read = (): Promise<ReceiverPort> => {
  const board = getGlobalBoardConnectionInstance();

  return board.sendCommand('serial').then(response => {
    const [, , ...portLines] = response.split('\n');
    const ports = portLines.reduce((accumulator, current) => {
      const [lineType, port, mask] = current.split(' ');

      return lineType === 'serial' ? { ...accumulator, [port]: mask } : accumulator;
    }, {});

    const choices: UartPort[] = Object.keys(ports).map(port => portToDisplay(port));
    const current = findKey(ports, (value: string) => value === MASK) || '0';
    const selected = portToDisplay(current);

    return { selected, choices };
  });
};

const save = ({ selected, choices }: ReceiverPort) => {
  const board = getGlobalBoardConnectionInstance();
  const selectedPort = displayToPort(selected);

  choices.forEach(display => {
    const port = displayToPort(display);

    board.sendCommand(`serial ${port} 0 115200 57600 0 115200`);
  });

  board.sendCommand(`serial ${selectedPort} ${MASK} 115200 57600 0 115200`);
};

const handler: ReceiverPortHandler = {
  type: Handlers.ReceiverPort,
  read,
  save,
};

export default handler;
