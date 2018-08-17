import { findKey } from 'lodash';
import board from '../../board';

const portsToUart = {
  0: 'UART 1',
  2: 'UART 3',
  5: 'UART 6',
};

const read = () => {
  return board.sendCommand('serial').then(response => {
    const [, , ...portLines] = response.split('\n');
    const portLine =
      portLines.find(line => {
        const [, , bit] = line.split(' ');
        return bit === '64';
      }) || 'mock 0';

    const [, port] = portLine.split(' ');

    return portsToUart[parseInt(port)];
  });
};

const save = uart => {
  const port = findKey(portsToUart, value => value === uart);

  board.sendCommand(`serial 0 0 115200 57600 0 115200`);
  board.sendCommand(`serial 2 0 115200 57600 0 115200`);
  board.sendCommand(`serial 5 0 115200 57600 0 115200`);
  board.sendCommand(`serial ${port} 64 115200 57600 0 115200`);
};

export default {
  name: 'receiverPort',
  read,
  save,
};
