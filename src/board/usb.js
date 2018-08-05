import usb from 'usb';
import formatters from './formatters';

const connection = {
  device: null,
  activeInterface: null,
  in: null,
  out: null,
};

const findInterface = device => {
  const [activeInterface] = device.interfaces.filter(activeInterface =>
    isInterfaceCoolEnougth(activeInterface),
  );
  return activeInterface;
};

const isInterfaceCoolEnougth = activeInterface => {
  return (
    activeInterface.endpoints.filter(
      endpoint => endpoint.transferType === usb.LIBUSB_TRANSFER_TYPE_BULK,
    ).length === 2
  );
};

const findEndpoint = (activeInterface, direction) => {
  const [endpoint] = activeInterface.endpoints.filter(
    endpoint => endpoint.direction === direction,
  );
  return endpoint;
};

const connectToDeviceByIds = ({ vendor, product }) => {
  const device = usb.findByIds(vendor, product);

  if (!device) {
    throw new Error('No device match the ProductId.');
  }

  device.open();
  connection.device = device;

  const activeInterface = findInterface(device);

  if (!activeInterface) {
    throw new Error("Device haven't any valid interface.");
  }

  try {
    activeInterface.claim();
  } catch (error) {
    throw new Error('Devise busy, used by another sofware.');
  }
  connection.activeInterface = activeInterface;

  connection.in = findEndpoint(activeInterface, 'in');
  connection.out = findEndpoint(activeInterface, 'out');

  if (!connection.in || !connection.out) {
    throw new Error("Device haven't valid endpoints.");
  }
};

const listen = (success, failure) => {
  connection.in.transfer(64, (error, buffer) => {
    if (error) {
      failure();
    } else {
      success(new Uint8Array(buffer));
    }
  });
};

const send = integers => {
  const buffer = formatters.integersToBuffer(integers);
  connection.out.transfer(buffer, (error, data) => {
    error && console.log('transfert error', error);
    data && console.log('transfert data', data);
  });
};

const onDevicePlugged = handler => {
  usb.on('attach', () => {
    if (!connection.device) {
      handler();
    }
  });
};

const onUnplugged = handler => {
  usb.on('detach', device => {
    if (device === connection.device) {
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
