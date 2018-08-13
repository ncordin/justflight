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
import board from '../../board';

const filters = {
  clean: [150, 400, 100, 250],
  default: [100, 300, 100, 200],
  tolerent: [90, 180, 70, 140],
};

const read = () => {
  return board
    .get('gyro_lowpass_hz')
    .then(response =>
      findKey(filters, ([gyroLowpass]) => gyroLowpass === parseInt(response))
    );
};

const save = display => {
  const values = filters[display];

  board.set('gyro_lowpass_hz', values[0]);
  board.set('gyro_lowpass2_hz', values[1]);
  board.set('dterm_lowpass_hz', values[2]);
  board.set('dterm_lowpass2_hz', values[3]);
};

export default {
  name: 'filters',
  read,
  save,
};
