import adapters from '../adapters';

export const isVersionSupported = version => adapters[version] !== undefined;

export const readWithAdapter = adapter => {
  const { settingHandlers } = adapter;

  return settingHandlers.reduce((accumulator, { type, read }) => {
    return accumulator.then(chainResults =>
      read().then(currentResult => {
        console.log(type, currentResult);

        return {
          ...chainResults,
          [type]: currentResult,
        };
      })
    );
  }, Promise.resolve({}));
};

export const saveWithAdapter = (adapter, settings) => {
  const { settingHandlers } = adapter;

  Object.entries(settings).forEach(([name, value]) => {
    const handler = settingHandlers.find(handler => handler.type === name);

    if (handler) {
      handler.save(value, settings);
    } else {
      console.error('Missing handler for setting', name);
    }
  });
};
