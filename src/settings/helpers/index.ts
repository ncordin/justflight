import adapters from '../adapters';

export const isVersionSupported = version => adapters[version] !== undefined;

export const readWithAdapter = adapter => {
  const { settingHandlers } = adapter;

  return settingHandlers.reduce((accumulator, { name, read }) => {
    return accumulator.then(chainResults =>
      read().then(currentResult => {
        return {
          ...chainResults,
          [name]: currentResult,
        };
      })
    );
  }, Promise.resolve({}));
};

export const saveWithAdapter = (adapter, settings) => {
  const { settingHandlers } = adapter;

  Object.entries(settings).forEach(([name, value]) => {
    const handler = settingHandlers.find(handler => handler.name === name);

    if (handler) {
      handler.save(value, settings);
    } else {
      console.error('Missing handler for setting', name);
    }
  });
};