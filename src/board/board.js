import usb from './usb';
import formatters from './formatters';
import constants from './board.constants';

const onConnect = handler => {
  const tryToConnect = () => {
    connect()
      .then(() => handler())
      .catch(error => {
        console.log(error.message);
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

  return sendToUsb([constants.MSP_CODES.CLI_MODE]);
};

const sendCommand = command => {
  return sendToUsb(formatters.stringToIntegers(`${command}\n`));
};

const state = {
  sending: false,
  controlTimeout: null,
};

const isMessageComplete = integers => {
  const tailOfMessage = integers.slice(-constants.END_OF_MESSAGE.length);

  return constants.END_OF_MESSAGE.every((integer, index) => {
    return tailOfMessage[index] === integer;
  });
};

const receiveData = integers => {
  if (state.sending) {
    const text = formatters.integersToString(integers);
    state.response += text;

    if (isMessageComplete(integers)) {
      state.sending = false;
      clearTimeout(state.controlTimeout);
      state.resolve(state.response);
    } else {
      usb.listen(receiveData, onListenFailed);
    }
  } else {
    console.log('Ignoring', integers);
  }
};

const sendToUsb = message => {
  if (state.sending) {
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
    console.log('Control timeout in action !');
    // reboot();
  }, 1000);

  return state.promise;
};

const onListenFailed = () => {
  state.sending = false;
  state.response = '';
  // state.reject();
  console.log('onListenFailed...');
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
