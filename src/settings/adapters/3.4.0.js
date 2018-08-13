import board from '../../board';

import receiverPortHandler from '../handlers/receiverPort';
import minVoltageHandler from '../handlers/minVoltage';
import armChannelHandler from '../handlers/armChannel';

const settingHandlers = [
  receiverPortHandler,
  minVoltageHandler,
  armChannelHandler,
];

const onSave = (settings, boardDetails) => {
  /*
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
  board.set('pid_process_denom', 2);

  // Hype tunning
  board.set('rc_interp_ch', 'RPYT');
  board.set('rc_smoothing_type', 'FILTER');
  board.set('iterm_relax', 'RP');
  board.set('setpoint_relax_ratio', 20);
  board.set('dterm_setpoint_weight', 45);
  board.set('throttle_boost', 10);

  // OSD
  board.set('osd_rssi_pos', 99);
  board.set('osd_tim_1_pos', 388);
  board.set('osd_tim_2_pos', 2435);
  board.set('osd_warnings_pos', 2313);
  board.set('osd_avg_cell_voltage_pos', 2446);
  */
};

export default {
  settingHandlers,
  onSave,
};

/*
--- TUNNING:
rateprofile 0

set roll_expo = 16
set pitch_expo = 16
set yaw_expo = 16

set roll_srate = 75
set pitch_srate = 75
set yaw_srate = 75

set dshot_idle_value = 700
set serialrx_provider = IBUS
set yaw_motors_reversed = ON

set gyro_lowpass_hz = 100
set gyro_lowpass2_hz = 300
profile 0
set dterm_lowpass_hz = 90
set dterm_lowpass2_hz = 190

adjrange  0 0 1(AUX) 900 2100 12(RATE PROFILES) 1(RE AUX) 0 0
*/
