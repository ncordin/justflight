import adaptersByVersion from './adapters';
import { readSettings as read } from './helpers';

const VERSION = '3.4.0';
const adapter = adaptersByVersion[VERSION];

export const readSettings = () => {
  return read(adapter);
};
