import board from '../../board';

// Tunning
import rates from '../handlers/rates';
import expo from '../handlers/expo';
import stickAcceleration from '../handlers/stickAcceleration-340';
import stickTransition from '../handlers/stickTransition-340';
import idleThrottle from '../handlers/idleThrottle';
import filters from '../handlers/filters';

// Setup
import receiverPort from '../handlers/receiverPort';
import receiverProtocol from '../handlers/receiverProtocol';
import minVoltage from '../handlers/minVoltage';
import armChannel from '../handlers/armChannel';
import propsDirection from '../handlers/propsDirection';

const settingHandlers = [
  rates,
  expo,
  stickAcceleration,
  stickTransition,
  idleThrottle,
  filters,
  receiverPort,
  receiverProtocol,
  minVoltage,
  armChannel,
  propsDirection,
];

const onSave = (settings, boardDetails) => {
  // Features
  board.sendCommand('feature -TELEMETRY');
  board.sendCommand('feature -RX_PARALLEL_PWM');
  board.sendCommand('feature RX_SERIAL');
  board.sendCommand('feature AIRMODE');
  board.set('acc_hardware', 'NONE');
  board.set('mag_hardware', 'NONE');
  board.set('baro_hardware', 'NONE');

  // Core speed
  board.set('motor_pwm_protocol', 'DSHOT600');
  board.set('gyro_sync_denom', 1);
  board.set('pid_process_denom', boardDetails.family === 'F4' ? 1 : 2);

  // Hype tunnings
  board.set('rc_interp_ch', 'RPYT');
  board.set('rc_smoothing_type', 'FILTER');
  board.set('iterm_relax', 'RP');
  board.set('throttle_boost', 10);

  // OSD
  board.set('osd_tim_2_pos', 2433);
  board.set('osd_warnings_pos', 2313);
  board.set('osd_avg_cell_voltage_pos', 2455);
  board.set('osd_stat_max_spd', 'OFF');
  board.set('osd_stat_min_rssi', 'OFF');
  board.set('osd_stat_max_curr', 'OFF');
  board.set('osd_stat_used_mah', 'OFF');
  board.set('osd_stat_bbox', 'OFF');
};

export default {
  settingHandlers,
  onSave,
};

/*
--- TODO:
rateprofile 0
profile 0
adjrange  0 0 1(AUX) 900 2100 12(RATE PROFILES) 1(RE AUX) 0 0
*/
