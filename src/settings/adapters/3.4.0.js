import board from '../../board';

const settingHandlers = [];

settingHandlers.push({
  name: 'receiverPort',
  read: () => {
    return board.sendCommand('serial').then(response => {
      const [, , ...portLines] = response.split('\n');
      const portLine = portLines.find(line => {
        const [, , port] = line.split(' ');
        return port === '64';
      });
      const [, port] = portLine.split(' ');

      return parseInt(port) + 1;
    });
  },
  save: ({ channel, rangeMin, rangeMax }) =>
    board.sendCommand(`aux 0 0 ${channel} ${rangeMin} ${rangeMax} 0`),
});

settingHandlers.push({
  name: 'minVoltage',
  read: () => {
    return board
      .get('vbat_warning_cell_voltage')
      .then(response => (response / 10).toFixed(1));
  },
  save: value => {
    const voltage = value * 10;

    board.set('vbat_warning_cell_voltage', voltage);
    board.set('vbat_min_cell_voltage', voltage - 2);
  },
});

settingHandlers.push({
  name: 'arming',
  read: () => {
    return board.sendCommand('aux').then(response => {
      const [, armLine] = response.split('\n');
      const [, , , channel, rangeMin, rangeMax] = armLine.split(' ');

      return {
        channel: parseInt(channel) + 1,
        rangeMin: parseInt(rangeMin),
        rangeMax: parseInt(rangeMax),
      };
    });
  },
  save: ({ channel, rangeMin, rangeMax }) =>
    board.sendCommand(`aux 0 0 ${channel - 1} ${rangeMin} ${rangeMax} 0`),
});

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

  board.sendCommand('save');
};

const handledParams = ['iterm_relax'];

export default {
  settingHandlers,
  onSave,
  handledParams,
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
