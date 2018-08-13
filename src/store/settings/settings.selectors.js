export const selectHasChanged = state => state.settings.hasChanged;

export const selectSettings = state => state.settings.data;

export const selectSetting = (state, name) => state.settings.data[name];
