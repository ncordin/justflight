import { LOG_TYPE } from './types';

export { createLogger } from './logger';
export { LOG_TYPE } from './types';

export interface Logger {
  (type: LOG_TYPE, message: string): void;
}
