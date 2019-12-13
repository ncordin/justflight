import { createCommunicationWithUsbDevice } from 'libs/usb';
import { createLogger, LOG_TYPE } from 'libs/log';

import { isMessageComplete } from './helpers';
import {
  BETAFLIGHT_USB_IDS,
  MSP_CODES,
  ALREADY_IN_CLI_MODE,
  GET_VERSION_MESSAGE,
} from './constants';
import { makeFlatPromise, FlatPromise } from 'helpers/promises';

interface State {
  isSending: boolean;
  timeoutRef: NodeJS.Timeout;
  response: number[];
  flatPromise: FlatPromise<number[]>;
}

export const makeDataConnectionWithBetaflightBoard = ({ usbModule }) => {
  const logger = createLogger('board');

  const {
    onDeviceReady,
    onDeviceExit,
    sendToUsbDevice,
    listenFromUsbDevice,
  } = createCommunicationWithUsbDevice({
    usbModule,
    vendorId: BETAFLIGHT_USB_IDS.vendor,
    productId: BETAFLIGHT_USB_IDS.product,
  });

  const state: State = {
    isSending: false,
    timeoutRef: null,
    response: [],
    flatPromise: makeFlatPromise<number[]>(),
  };

  const receiveData = (integers: number[]) => {
    if (state.isSending) {
      state.response.push(...integers);

      if (isMessageComplete(state.response)) {
        clearTimeout(state.timeoutRef);

        state.isSending = false;
        state.flatPromise.resolve(state.response);
      } else {
        listenFromUsbDevice(receiveData, onListenFailed);
      }
    } else {
      logger(LOG_TYPE.WARNING, `ignoring data ${integers}`);
    }
  };

  const sendData = (intergers: number[]) => {
    if (state.isSending) {
      const error = 'send data failed! Board already in sending state.';

      logger(LOG_TYPE.ERROR, error);
      throw new Error(error);
    }
    state.isSending = true;
    state.response = [];
    state.flatPromise = makeFlatPromise<number[]>();

    listenFromUsbDevice(receiveData, onListenFailed);
    sendToUsbDevice(intergers);

    state.timeoutRef = setTimeout(() => {
      logger(LOG_TYPE.ERROR, 'did not get a valid response in time!');
    }, 1000);

    return state.flatPromise.promise;
  };

  const onListenFailed = () => {
    const error = 'messsage receiption failed...';

    logger(LOG_TYPE.ERROR, error);
    clearTimeout(state.timeoutRef);

    state.isSending = false;
    state.response = [];
    state.flatPromise.reject(error);
  };

  const onConnect = (handler: () => void): void => {
    onDeviceReady(async () => {
      try {
        const response = await sendData([MSP_CODES.CLI_MODE]);

        logger(LOG_TYPE.SUCCESS, 'board connected!');

        if (response === ALREADY_IN_CLI_MODE) {
          logger(
            LOG_TYPE.WARNING,
            'the board was already is cli mode, reactivating...'
          );

          return sendData(GET_VERSION_MESSAGE);
        }

        handler();
      } catch (error) {
        logger(LOG_TYPE.ERROR, `connection failed! ${error.message}`);
      }
    });
  };

  return {
    onConnect,
    sendData,
    onUnplugged: onDeviceExit,
  };
};

/*
sendMSPCommand = code =>
  mspMessage = [36, 77, 60, 0, code]; // Headers & data length & code
  mspMessage.push(mspMessage[3] ^ mspMessage[4]); // Add checksum.

const reboot = () =>
  sendCommand('exit');
  sendMSPCommand(constants.MSP_CODES.REBOOT);
*/
