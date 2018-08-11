export const readSettings = adapter => {
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

export const saveSettings = (adapter, settings) => {
  const { settingHandlers } = adapter;

  return Object.entries(settings).reduce((accumulator, [name, value]) => {
    const handler = settingHandlers.find(handler => handler.name === name);

    return accumulator.then(() => {
      return handler.save(value);
    });
  }, Promise.resolve());
};
