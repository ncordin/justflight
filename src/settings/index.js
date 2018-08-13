import board from '../board';
import adaptersByVersion from './adapters';
import { readWithAdapter, saveWithAdapter } from './helpers';

const VERSION = '3.4.0';
const adapter = adaptersByVersion[VERSION];

export const readSettings = () => {
  return readWithAdapter(adapter);
};

export const saveSettings = settings => {
  saveWithAdapter(adapter, settings);
  adapter.onSave(settings, {}); // <-- TODO send board details

  board.sendCommand('save').catch(() => null);
};
