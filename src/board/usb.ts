import formatters from './formatters';
import { createLogger, LOG_TYPE } from 'libs/log';
import { findInterface, findEndpoint } from './usb.helpers';

const electron = window.require('electron');
const usb = electron.remote.require('usb');

const connection = {
  device: null,
  activeInterface: null,
  in: null,
  out: null,
};

const logger = createLogger('usb');

const connectToDeviceByIds = ({ vendor, product }) => {
  logger(LOG_TYPE.INFO, `looking for device ${vendor} ${product}...`);
  const device = usb.findByIds(vendor, product);

  if (!device) {
    logger(LOG_TYPE.ERROR, `no device found.`);
    throw new Error();
  }

  // Not sure about that...
  usb.on('error', error => {
    logger(LOG_TYPE.ERROR, `catched on device: ${error}`);
  });

  logger(LOG_TYPE.SUCCESS, 'device found! trying to open device...');
  device.open();
  connection.device = device;
  logger(LOG_TYPE.INFO, 'device opened. searching interface...');

  const activeInterface = findInterface(device);

  if (!activeInterface) {
    logger(LOG_TYPE.ERROR, 'no compatible interface found.');
    throw new Error();
  }

  try {
    activeInterface.claim();
  } catch (error) {
    logger(LOG_TYPE.ERROR, 'interface found but not available.');
    throw new Error(error);
  }

  logger(LOG_TYPE.INFO, 'connected to interface! searching endpoints...');
  connection.activeInterface = activeInterface;
  connection.in = findEndpoint(activeInterface, 'in');
  connection.out = findEndpoint(activeInterface, 'out');

  if (!connection.in || !connection.out) {
    logger(LOG_TYPE.ERROR, 'no valid endpoints found.');
    throw new Error();
  }

  logger(LOG_TYPE.INFO, 'endpoints found.');
  logger(LOG_TYPE.SUCCESS, 'connected to device succesfully!');
};

const listen = (success, failure) => {
  connection.in.transfer(64, (error, buffer) => {
    if (error) {
      logger(
        LOG_TYPE.ERROR,
        `an error occured during data receiption: ${error}`
      );
      failure();
    } else {
      const integers = new Uint8Array(buffer);
      // logger(LOG_TYPE.INFO, `data received: ${integers}`);
      success(integers);
    }
  });
};

const send = integers => {
  // logger(LOG_TYPE.INFO, `sending data: ${integers}`);
  const buffer = formatters.integersToBuffer(integers);
  connection.out.transfer(buffer, (error, data) => {
    error && logger(LOG_TYPE.ERROR, `send failed with error: ${error}`);
    data && logger(LOG_TYPE.ERROR, `what is that? ${data}`);
  });
};

const onDevicePlugged = handler => {
  usb.on('attach', () => {
    if (!connection.device) {
      logger(LOG_TYPE.INFO, 'new device detected, trying to connect...');
      handler();
    } else {
      logger(
        LOG_TYPE.WARNING,
        'new device detected but usb is already connected.'
      );
    }
  });
};

const onUnplugged = handler => {
  usb.on('detach', device => {
    if (device === connection.device) {
      logger(LOG_TYPE.WARNING, 'device unpluged!');
      connection.device = null;
      handler();
    }
  });
};

// Not sure about that...
usb.on('error', error => {
  logger(LOG_TYPE.ERROR, `catched on usb: ${error}`);
});

export default {
  connectToDeviceByIds,
  listen,
  send,
  onDevicePlugged,
  onUnplugged,
};

export const LIBUSB_TRANSFER_TYPE_BULK = usb.LIBUSB_TRANSFER_TYPE_BULK;
