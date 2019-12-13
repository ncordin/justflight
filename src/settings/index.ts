import { getGlobalBoardConnectionInstance } from 'libs/board';
import adaptersByVersion from './adapters';
import { readWithAdapter, saveWithAdapter } from './helpers';

const VERSION = '3.4.0';
const adapter = adaptersByVersion[VERSION];

export const readSettings = () => {
  return readWithAdapter(adapter);
};

export const saveSettings = (settings, boardDetails) => {
  const board = getGlobalBoardConnectionInstance();

  saveWithAdapter(adapter, settings);
  adapter.onSave(settings, boardDetails);

  board.sendCommand('save').catch(() => null);
};
