import { LIBUSB_TRANSFER_TYPE_BULK } from 'usb';

const isInterfaceCoolEnougth = activeInterface => {
  return (
    activeInterface.endpoints.filter(
      endpoint => endpoint.transferType === LIBUSB_TRANSFER_TYPE_BULK,
    ).length === 2
  );
};

export const findInterface = device => {
  const [activeInterface] = device.interfaces.filter(activeInterface =>
    isInterfaceCoolEnougth(activeInterface),
  );
  return activeInterface;
};

export const findEndpoint = (activeInterface, direction) => {
  const [endpoint] = activeInterface.endpoints.filter(
    endpoint => endpoint.direction === direction,
  );
  return endpoint;
};
