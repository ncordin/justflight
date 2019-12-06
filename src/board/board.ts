import { createCommunicationWithUsbDevice } from 'libs/usb';
import { integersToString, stringToIntegers } from 'helpers/formatters';

import { createLogger, LOG_TYPE } from 'libs/log';
import constants from './board.constants';

const logger = createLogger('board');

const electron = window.require('electron');
const usbModule = electron.remote.require('usb');

const {
  onDeviceReady,
  onDeviceExit,
  sendToUsbDevice,
  listenFromUsbDevice,
} = createCommunicationWithUsbDevice({
  usbModule,
  vendorId: constants.BETAFLIGHT_USB_IDS.vendor,
  productId: constants.BETAFLIGHT_USB_IDS.product,
});

const onConnect = handler => {
  onDeviceReady(() => {
    sendToUsb([constants.MSP_CODES.CLI_MODE])
      .then(response => {
        logger(LOG_TYPE.SUCCESS, 'board connected!');
        if (response === '#') {
          logger(
            LOG_TYPE.WARNING,
            'the board was already is cli mode, reactivating...'
          );
          return sendCommand('version');
        }
        handler();
      })
      .catch(error => {
        logger(LOG_TYPE.ERROR, `connection failed! ${error.message}`);
      });
  });
};

const state = {
  sending: false,
  controlTimeout: null,
  response: [],
  promise: null,
  resolve: null,
  reject: null,
};

const areMessagesEqual = (messageA, messageB) => {
  return (
    messageA.length &&
    messageA.every((integer, index) => {
      return messageB[index] === integer;
    })
  );
};

const isMessageComplete = integers => {
  const tailOfMessage = integers.slice(-constants.END_OF_MESSAGE.length);

  return (
    areMessagesEqual(constants.END_OF_MESSAGE, tailOfMessage) ||
    areMessagesEqual(integers, constants.ALREADY_IN_CLI_MODE)
  );
};

const receiveData = integers => {
  if (state.sending) {
    state.response.push(...integers);

    if (isMessageComplete(state.response)) {
      const text = integersToString(state.response);
      logger(LOG_TYPE.SUCCESS, `message received ${text}`);
      state.sending = false;
      clearTimeout(state.controlTimeout);
      state.resolve(text);
    } else {
      listenFromUsbDevice(receiveData, onListenFailed);
    }
  } else {
    logger(LOG_TYPE.WARNING, `ignoring data ${integers}`);
  }
};

const sendToUsb = message => {
  if (state.sending) {
    logger(LOG_TYPE.ERROR, 'send message failed! Board is already sending...');
    throw new Error('Send message failed! Board is already sending...');
  }
  state.sending = true;
  state.response = [];
  state.promise = new Promise((resolve, reject) => {
    state.resolve = resolve;
    state.reject = reject;
  });

  listenFromUsbDevice(receiveData, onListenFailed);
  sendToUsbDevice(message);

  state.controlTimeout = setTimeout(() => {
    logger(LOG_TYPE.ERROR, 'did not get a valid response in time!');
    // reboot();
  }, 1000);

  return state.promise;
};

const onListenFailed = () => {
  logger(LOG_TYPE.ERROR, 'messsage receiption failed...');
  clearTimeout(state.controlTimeout);
  state.sending = false;
  state.response = [];
  state.reject();
};

const sendCommand = command => {
  logger(LOG_TYPE.INFO, `sending command "${command}"`);
  return sendToUsb(stringToIntegers(`${command}\n`));
};

/*
const sendMSPCommand = code => {
  const mspMessage = [36, 77, 60, 0, code]; // headers & data length & code
  mspMessage.push(mspMessage[3] ^ mspMessage[4]); // checksum

  usb.send(mspMessage);
};

const reboot = () => {
  sendCommand('exit');
  sendMSPCommand(constants.MSP_CODES.REBOOT);
  state.sending = false;
  state.response = [];
};
*/

export default {
  onConnect,
  sendCommand,
  onUnplugged: onDeviceExit,
};
