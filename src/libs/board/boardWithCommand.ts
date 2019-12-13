import Queue from 'promise-queue';

import { createLogger, LOG_TYPE } from 'libs/log';
import { stringToIntegers, integersToString } from 'helpers/formatters';

import { makeDataConnectionWithBetaflightBoard } from './board';
import { BoardConnection } from './types';

export const makeConnectionWithBetaflightBoard = ({
  usbModule,
}): BoardConnection => {
  const commandsQueue = new Queue(1, Infinity);
  const logger = createLogger('board');
  const {
    onConnect,
    onUnplugged,
    sendData,
  } = makeDataConnectionWithBetaflightBoard({
    usbModule,
  });

  const sendCommand = (command: string): Promise<string> => {
    return commandsQueue.add(() => {
      return sendOneCommand(command);
    });
  };

  const get = (property: string) => {
    return sendCommand(`get ${property}`).then(response => {
      const [, value] = response.match(/\w = (\S+)/);
      return value;
    });
  };

  const set = (property: string, value: string | number) => {
    return sendCommand(`set ${property} = ${value}`);
  };

  const sendOneCommand = (command: string) => {
    logger(LOG_TYPE.INFO, `sending command "${command}"`);

    return sendData(stringToIntegers(`${command}\n`)).then(intergers => {
      const message = integersToString(intergers);

      logger(LOG_TYPE.SUCCESS, `message received ${message}`);

      return message;
    });
  };

  return {
    onConnect,
    onUnplugged,
    sendCommand,
    set,
    get,
  };
};
