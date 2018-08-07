import usb from 'usb';
import formatters from './formatters';
import { createLogger } from './logger';
import { findInterface, findEndpoint } from './usb.helpers';

const connection = {
  device: null,
  activeInterface: null,
  in: null,
  out: null,
};

const logger = createLogger('usb');

const connectToDeviceByIds = ({ vendor, product }) => {
  logger('info', `looking for device ${vendor} ${product}...`);
  const device = usb.findByIds(vendor, product);

  if (!device) {
    logger('error', `no device found.`);
    throw new Error('No device match the ProductId.');
  }

  logger('success', 'device found! trying to open device...');
  device.open();
  connection.device = device;
  logger('info', 'device opened. searching interface...');

  const activeInterface = findInterface(device);

  if (!activeInterface) {
    logger('error', 'no compatible interface found.');
    throw new Error("Device haven't any valid interface.");
  }

  try {
    activeInterface.claim();
  } catch (error) {
    logger('error', 'interface found but not available.');
    throw new Error('Devise busy, used by another sofware.');
  }

  logger('info', 'connected to interface! searching endpoints...');
  connection.activeInterface = activeInterface;

  connection.in = findEndpoint(activeInterface, 'in');
  connection.out = findEndpoint(activeInterface, 'out');

  if (!connection.in || !connection.out) {
    logger('error', 'no valid endpoints found.');
    throw new Error("Device haven't valid endpoints.");
  }

  logger('info', 'endpoints found.');
  logger('success', 'connected to device succesfully!');
};

const listen = (success, failure) => {
  connection.in.transfer(64, (error, buffer) => {
    if (error) {
      logger('error', `an error occured during data receiption: ${error}`);
      failure();
    } else {
      const integers = new Uint8Array(buffer);
      logger('info', `data received: ${integers}`);
      success(integers);
    }
  });
};

const send = integers => {
  logger('info', `sending data: ${integers}`);
  const buffer = formatters.integersToBuffer(integers);
  connection.out.transfer(buffer, (error, data) => {
    error && logger('error', `send failed with error: ${error}`);
    data && logger('error', `what is that? ${data}`);
  });
};

const onDevicePlugged = handler => {
  usb.on('attach', () => {
    if (!connection.device) {
      logger('info', 'new device detected, trying to connect...');
      handler();
    } else {
      logger('warning', 'new device detected but usb is already connected.');
    }
  });
};

const onUnplugged = handler => {
  usb.on('detach', device => {
    if (device === connection.device) {
      logger('warning', 'device unpluged!');
      connection.device = null;
      handler();
    }
  });
};

export default {
  connectToDeviceByIds,
  listen,
  send,
  onDevicePlugged,
  onUnplugged,
};
