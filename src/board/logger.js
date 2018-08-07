const types = {
  success: { color: 'green', prefix: '✔' },
  info: { color: 'blue', prefix: '►' },
  warning: { color: 'orange', prefix: '⚠' },
  error: { color: 'red', prefix: '✘' },
};

const logger = (name, type, message) => {
  const formattedMessage = `[${name}] ${types[type].prefix} ${message}`;
  console.log('%c%s', `color: ${types[type].color};`, formattedMessage);
};

export const createLogger = name => (type, message) => {
  return logger(name, type, message);
};
