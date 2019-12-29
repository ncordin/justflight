import { State } from 'store/types';

export const selectSettings = (state: State) => state.settings.data;

export const selectSetting = (state: State, name: string) =>
  state.settings.data[name];

export const selectChanges = (state: State) =>
  Object.keys(state.settings.changes).length;

export const selectIsSaving = (state: State) => state.settings.saving;
