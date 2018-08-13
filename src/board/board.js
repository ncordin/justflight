import usb from './usb';
import formatters from './formatters';
import { createLogger } from './logger';
import constants from './board.constants';

const logger = createLogger('board');

const onConnect = handler => {
  const tryToConnect = () => {
    connect()
      .then(() => handler())
      .catch(error => {
        logger('error', `connection failed! ${error.message}`);
      });
  };

  tryToConnect();
  usb.onDevicePlugged(tryToConnect);
};

const connect = () => {
  try {
    usb.connectToDeviceByIds(constants.BETAFLIGHT_USB_IDS);
  } catch (error) {
    return Promise.reject(error);
  }

  return sendToUsb([constants.MSP_CODES.CLI_MODE]).then(response => {
    logger('success', 'board connected!');
    if (response === '#') {
      logger('warning', 'the board was already is cli mode, reactivating...');
      return sendCommand('version');
    }
  });
};

const state = {
  sending: false,
  controlTimeout: null,
};

const areMessagesEqual = (messageA, messageB) => {
  return messageA.every((integer, index) => {
    return messageB[index] === integer;
  });
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
    const text = formatters.integersToString(integers);
    state.response += text;

    if (isMessageComplete(integers)) {
      logger('success', `message received ${state.response}`);
      state.sending = false;
      clearTimeout(state.controlTimeout);
      state.resolve(state.response);
    } else {
      usb.listen(receiveData, onListenFailed);
    }
  } else {
    logger('warning', `ignoring data ${integers}`);
  }
};

const sendToUsb = message => {
  if (state.sending) {
    logger('error', 'send message failed! Board is already sending...');
    throw new Error('Send message failed! Board is already sending...');
  }
  state.sending = true;
  state.response = '';
  state.promise = new Promise((resolve, reject) => {
    state.resolve = resolve;
    state.reject = reject;
  });

  usb.listen(receiveData, onListenFailed);
  usb.send(message);

  state.controlTimeout = setTimeout(() => {
    logger('error', 'did not get a valid response in time!');
    // reboot();
  }, 1000);

  return state.promise;
};

const onListenFailed = () => {
  logger('error', 'messsage receiption failed...');
  clearTimeout(state.controlTimeout);
  state.sending = false;
  state.response = '';
  state.reject();
};

const sendCommand = command => {
  logger('info', `sending command "${command}"`);
  return sendToUsb(formatters.stringToIntegers(`${command}\n`));
};

const sendMSPCommand = code => {
  const mspMessage = [36, 77, 60, 0, code]; // headers & data length & code
  mspMessage.push(mspMessage[3] ^ mspMessage[4]); // checksum

  usb.send(mspMessage);
};

const reboot = () => {
  // sendCommand('exit');
  sendMSPCommand(constants.MSP_CODES.REBOOT);
  state.sending = false;
  state.response = '';
};

export default {
  onConnect,
  connect,
  sendCommand,
  onUnplugged: usb.onUnplugged,
};
