const usb = require('./usb');
const formatter = require('./formatter');
const constants = require('./board.constants');

const buildMessage = code => {
  const buffer = new ArrayBuffer(6);
  const data = new Uint8Array(buffer);

  data[0] = 36; // header
  data[1] = 77; // header
  data[2] = 60; // header
  data[3] = 0; // data length
  data[4] = code;
  data[5] = data[3] ^ data[4]; // checksum

  return data;
};

const buildCliMode = () => {
  var bufferOut = new ArrayBuffer(1);
  var bufView = new Uint8Array(bufferOut);

  bufView[0] = constants.MSP_CODES.CLI_MODE;

  return bufferOut;
};

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

  // sendToUsb(buildMessage(constants.MSP_CODES.REBOOT));
  return sendToUsb(buildCliMode());
};

const sendCommand = command => {
  return sendToUsb(formatter.stringToBuffer(`${command}\n`));
};

const state = {
  sending: false,
};

const receiveData = data => {
  if (state.sending) {
    const message = new Uint8Array(data);
    const text = formatter.uInt8ArrayToString(message);
    state.response += text;

    if (message.toString() === constants.END_OF_MESSAGE) {
      state.sending = false;
      state.resolve(state.response);
    } else {
      usb.listen(receiveData);
    }
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

  usb.listen(receiveData);
  usb.send(message);

  return state.promise;
};

module.exports = {
  onConnect,
  connect,
  sendCommand,
  onUnplugged: usb.onUnplugged,
};
