export const selectSettings = state => state.settings.data;

export const selectSetting = (state, name) => state.settings.data[name];

export const selectChanges = state =>
  Object.keys(state.settings.changes).length;

export const selectIsSaving = state => state.settings.saving;
