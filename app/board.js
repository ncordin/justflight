const usb = require('./usb');
const formatter = require('./formatter');

// It looks like ALL Betaflight FC have the same ids.
// So it's easy to to find them :)
const BETAFLIGHT_USB_IDS = {
  vendor: 1155,
  product: 22336,
};

const buildMessage = code => {
  const buffer = new ArrayBuffer(6);
  const data = new Uint8Array(buffer);

  data[0] = 36; // header
  data[1] = 77; // header
  data[2] = 60; // header
  data[3] = 0; // data length
  data[4] = code; // code (REBOOT = 68)
  data[5] = data[3] ^ data[4]; // checksum

  return data;
};

const buildCliMode = () => {
  var bufferOut = new ArrayBuffer(1);
  var bufView = new Uint8Array(bufferOut);

  bufView[0] = 0x23;

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
    usb.findDeviceByIds(BETAFLIGHT_USB_IDS);
  } catch (error) {
    return Promise.reject(error);
  }

  // sendToUsb(buildMessage(68)); <-- Reboot
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

    if (message.toString() === '13,10,35,32') {
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
