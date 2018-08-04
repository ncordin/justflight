const usb = require('usb');

const connection = {
  device: null,
  interface: null,
  in: null,
  out: null,
};

const findInterface = device => {
  const [interface] = device.interfaces.filter(interface =>
    isInterfaceCoolEnougth(interface),
  );
  return interface;
};

const isInterfaceCoolEnougth = interface => {
  return (
    interface.endpoints.filter(
      endpoint => endpoint.transferType === usb.LIBUSB_TRANSFER_TYPE_BULK,
    ).length === 2
  );
};

const findEndpoint = (interface, direction) => {
  const [endpoint] = interface.endpoints.filter(
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

  const interface = findInterface(device);

  if (!interface) {
    throw new Error("Device haven't any valid interface.");
  }

  try {
    interface.claim();
  } catch (error) {
    throw new Error('Devise busy, used by another sofware.');
  }
  connection.interface = interface;

  connection.in = findEndpoint(interface, 'in');
  connection.out = findEndpoint(interface, 'out');

  if (!connection.in || !connection.out) {
    throw new Error("Device haven't valid endpoints.");
  }
};

const listen = handler => {
  connection.in.transfer(64, (error, data) => {
    if (error) {
      throw new Error('Error during transfert with InEndpoint.');
    }

    handler(data);
  });
};

const send = data => {
  connection.out.transfer(data, (error, data) => {
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

module.exports = {
  connectToDeviceByIds,
  listen,
  send,
  onDevicePlugged,
  onUnplugged,
};
