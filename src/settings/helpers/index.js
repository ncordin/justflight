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
