import { createLogger, LOG_TYPE } from 'libs/log';
import { integersToBuffer } from 'helpers/formatters';

import { findOpenAndGetMatchingDevice } from './deviceDetection';
import { ActiveDevice } from './types';

interface CommunicationParameters {
  usbModule: any;
  vendorId: number;
  productId: number;
}

interface CommunicationState {
  activeDevice: ActiveDevice;
  onDeviceReadyHandler: (device?: ActiveDevice) => void;
  onDeviceExitHandler: () => void;
}

const getDefaultState = (): CommunicationState => ({
  activeDevice: null,
  onDeviceReadyHandler: () => null,
  onDeviceExitHandler: () => null,
});

export const createCommunicationWithUsbDevice = ({
  usbModule,
  vendorId,
  productId,
}: CommunicationParameters) => {
  const logger = createLogger('usb');
  let state = getDefaultState();

  const connectToDevice = () => {
    if (state.activeDevice) {
      logger(
        LOG_TYPE.WARNING,
        'new device detected but usb is already connected.'
      );
    } else {
      logger(LOG_TYPE.INFO, 'new device detected, trying to connect...');

      try {
        const matchingDevice = findOpenAndGetMatchingDevice({
          usbModule,
          logger,
          vendorId,
          productId,
        });

        if (matchingDevice) {
          state.activeDevice = matchingDevice;
          state.onDeviceReadyHandler(matchingDevice);
        }
      } catch (error) {}
    }
  };

  connectToDevice();
  usbModule.on('attach', connectToDevice);

  usbModule.on('detach', device => {
    if (device === state.activeDevice.device) {
      logger(LOG_TYPE.WARNING, 'device unpluged!');
      state.activeDevice = null;
      state.onDeviceExitHandler();
    }
  });

  usbModule.on('error', error => {
    logger(LOG_TYPE.ERROR, `catched on usb: ${error}`);
  });

  const onDeviceReady = clientHandler => {
    const { activeDevice } = state;

    state.onDeviceReadyHandler = clientHandler;
    activeDevice && clientHandler(activeDevice);
  };

  const onDeviceExit = clientHandler => {
    state.onDeviceExitHandler = clientHandler;
  };

  const listenFromUsbDevice = (success, failure) => {
    const { inEndPoint } = state.activeDevice;

    inEndPoint.transfer(64, (error, buffer) => {
      if (error) {
        logger(
          LOG_TYPE.ERROR,
          `an error occured during data receiption: ${error}`
        );
        failure();
      } else {
        const integers = new Uint8Array(buffer);

        success(integers);
      }
    });
  };

  const sendToUsbDevice = (integers: number[]) => {
    const buffer = integersToBuffer(integers);
    const { outEndPoint } = state.activeDevice;

    outEndPoint.transfer(buffer, (error, data) => {
      error && logger(LOG_TYPE.ERROR, `send failed with error: ${error}`);
      data && logger(LOG_TYPE.ERROR, `what is that? ${data}`);
    });
  };

  return {
    onDeviceReady,
    onDeviceExit,
    listenFromUsbDevice,
    sendToUsbDevice,
  };
};
