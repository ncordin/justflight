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

  return Object.entries(settings).forEach(([name, value]) => {
    const handler = settingHandlers.find(handler => handler.name === name);

    handler.save(value);
  });
};
