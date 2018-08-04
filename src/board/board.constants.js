// It looks like ALL Betaflight FC have the same ids :)
const BETAFLIGHT_USB_IDS = {
  vendor: 1155,
  product: 22336,
};

const MSP_CODES = {
  CLI_MODE: 0x23,
  REBOOT: 68,
};

const END_OF_MESSAGE = '13,10,35,32';

module.exports = {
  BETAFLIGHT_USB_IDS,
  MSP_CODES,
  END_OF_MESSAGE,
};
