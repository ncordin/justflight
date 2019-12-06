export enum LOG_TYPE {
  SUCCESS,
  INFO,
  WARNING,
  ERROR,
}

const typesDetails = {
  [LOG_TYPE.SUCCESS]: { color: 'green', prefix: '✔' },
  [LOG_TYPE.INFO]: { color: 'blue', prefix: '►' },
  [LOG_TYPE.WARNING]: { color: 'orange', prefix: '⚠' },
  [LOG_TYPE.ERROR]: { color: 'red', prefix: '✘' },
};

const printLog = (name: string, type: LOG_TYPE, message: string): void => {
  const detail = typesDetails[type];
  const formattedMessage = `[${name}] ${detail.prefix} ${message}`;

  console.log('%c%s', `color: ${detail.color};`, formattedMessage);
};

export const createLogger = (name: string) => (
  type: LOG_TYPE,
  message: string
) => {
  printLog(name, type, message);
};
