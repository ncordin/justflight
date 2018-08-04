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

const connect = () => {
  usb.findDeviceByIds(BETAFLIGHT_USB_IDS);
  console.log('connected :)');

  usb.listen(receiveData);

  // sendToUsb(buildMessage(68));

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
    state.response += formatter.uInt8ArrayToString(message);

    if (message.toString() === '13,10,35,32') {
      state.sending = false;
      state.resolve(state.response);
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

  usb.send(message);

  return state.promise;
};

module.exports = {
  connect,
  sendCommand,
};
