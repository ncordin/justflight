import { LOG_TYPE } from 'libs/log';

import { ActiveDevice } from './types';

const LIBUSB_TRANSFER_TYPE_BULK = 2;

const isInterfaceCoolEnougth = activeInterface =>
  activeInterface.endpoints.filter(
    endpoint => endpoint.transferType === LIBUSB_TRANSFER_TYPE_BULK
  ).length === 2;

const findInterface = device => {
  const interfaces = [device.interface(0), device.interface(1)];
  const [activeInterface] = interfaces.filter(activeInterface =>
    isInterfaceCoolEnougth(activeInterface)
  );
  return activeInterface;
};

const findEndpoint = (activeInterface, direction) => {
  const [endpoint] = activeInterface.endpoints.filter(
    endpoint => endpoint.direction === direction
  );
  return endpoint;
};

export const findOpenAndGetMatchingDevice = ({
  usbModule,
  logger,
  vendorId,
  productId,
}): ActiveDevice => {
  logger(LOG_TYPE.INFO, `looking for device ${vendorId} ${productId}...`);
  const device = usbModule.findByIds(vendorId, productId);

  if (!device) {
    logger(LOG_TYPE.ERROR, `no device found.`);
    throw new Error();
  }

  logger(LOG_TYPE.SUCCESS, 'device found! trying to open device...');
  device.open();

  logger(LOG_TYPE.INFO, 'device opened. searching interface...');
  const deviceInterface = findInterface(device);

  if (!deviceInterface) {
    logger(LOG_TYPE.ERROR, 'no compatible interface found.');
    throw new Error();
  }

  try {
    deviceInterface.claim();
  } catch (error) {
    logger(LOG_TYPE.ERROR, 'interface found but not available.');
    throw new Error(error);
  }

  logger(LOG_TYPE.INFO, 'connected to interface! searching endpoints...');
  const inEndPoint = findEndpoint(deviceInterface, 'in');
  const outEndPoint = findEndpoint(deviceInterface, 'out');

  if (!inEndPoint || !outEndPoint) {
    logger(LOG_TYPE.ERROR, 'no valid endpoints found.');
    throw new Error();
  }

  logger(LOG_TYPE.INFO, 'endpoints found.');
  logger(LOG_TYPE.SUCCESS, 'connected to device succesfully!');

  return {
    device,
    deviceInterface,
    inEndPoint,
    outEndPoint,
  };
};
