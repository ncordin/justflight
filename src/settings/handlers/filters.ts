/**
 * Data from Betaflight tunning tips:
 *
 *  gyro_lowpass_hz   gyro_lowpass2_hz   dterm_lowpass_hz   dterm_lowpass2_hz
 *  NEW       150               400                100                250
 *  TYPICAL   120               300                100                250
 *  DEFAULT   100               300                100                200
 *  BENT      120               300                80                 160
 *  TRASH     90                180                70                 140
 */

import { findKey } from 'lodash';

import { getGlobalBoardConnectionInstance } from 'libs/board';
import { Handlers, FilteringLevel, FiltersHandler } from 'settings/adapters/types';

const filters = {
  [FilteringLevel.Clean]: [150, 400, 100, 250],
  [FilteringLevel.Default]: [100, 300, 100, 200],
  [FilteringLevel.Tolerent]: [90, 180, 70, 140],
};

const read = (): Promise<FilteringLevel> => {
  const board = getGlobalBoardConnectionInstance();

  return board.get('gyro_lowpass_hz').then(response => {
    return findKey(
      filters,
      ([gyroLowpass]) => gyroLowpass === parseInt(response)
    ) as FilteringLevel;
  });
};

const save = (value: FilteringLevel) => {
  const board = getGlobalBoardConnectionInstance();
  const values = filters[value];

  board.set('gyro_lowpass_hz', values[0]);
  board.set('gyro_lowpass2_hz', values[1]);
  board.set('dterm_lowpass_hz', values[2]);
  board.set('dterm_lowpass2_hz', values[3]);
};

const handler: FiltersHandler = {
  type: Handlers.Filters,
  read,
  save,
};

export default handler;
