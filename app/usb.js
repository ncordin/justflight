const usb = require('usb');

const connection = {
  device: null,
  interface: null,
  in: null,
  out: null,
};

const findInterface = device => {
  const [interface] = device.interfaces.filter(interface =>
    isInterfaceValid(interface),
  );
  return interface;
};

const isInterfaceValid = interface => {
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

const findDeviceByIds = ({ vendor, product }) => {
  const device = usb.findByIds(vendor, product);

  if (!device) {
    throw new Error('No device found.');
  }

  device.open();
  connection.device = device;

  const interface = findInterface(device);

  if (!interface) {
    throw new Error('No valid interface found.');
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
    throw new Error('No valid endpoints found.');
  }
};

const listen = handler => {
  connection.in.on('data', handler);
  connection.in.startPoll();
};

const send = data => {
  connection.out.transfer(data, (error, data) => {
    error && console.log('transfert error', error);
    data && console.log('transfert data', data);
  });
};

module.exports = {
  findDeviceByIds,
  listen,
  send,
};
