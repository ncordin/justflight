import Queue from 'promise-queue';
import board from './board';

const commandsQueue = new Queue(1, Infinity);

const sendCommand = command => {
  return commandsQueue.add(() => {
    return board.sendCommand(command);
  });
};

const get = property => {
  return sendCommand(`get ${property}`).then(response => {
    const [, value] = response.match(/\w = (\S+)/);
    return value;
  });
};

const set = (property, value) => {
  return sendCommand(`set ${property} = ${value}`);
};

export default {
  ...board,
  sendCommand,
  set,
  get,
};
