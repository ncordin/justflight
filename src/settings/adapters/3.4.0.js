import board from '../../board';

const settingHandlers = [];

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
    board.sendCommand(`aux 0 0 ${channel} ${rangeMin} ${rangeMax} 0`),
});

const onSave = (settings, boardDetails) => {
  board.set('iterm_relax', 3);
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
set yaw_srate = 76

set dshot_idle_value = 700

set setpoint_relax_ratio = 19
set dterm_setpoint_weight = 45

set gyro_lowpass_hz = 100
set gyro_lowpass2_hz = 300
profile 0
set dterm_lowpass_hz = 90
set dterm_lowpass2_hz = 190

--- SETUP:
2 disable = serial 1  0 115200 57600 0 115200
3 enable  = serial 2 64 115200 57600 0 115200
set serialrx_provider = IBUS

set yaw_motors_reversed = ON

--- DEFAULTS:
feature -TELEMETRY
feature AIRMODE
set acc_hardware = NONE

(AUTO):
set gyro_sync_denom = 2
set pid_process_denom = 1
set motor_pwm_protocol = DSHOT600

/*
Notifications : saved / usb error / aux 3 is moving
Loader : rebooting

= Home
Warning 4 diffs [Show][Reset]
JustFlight approved

= Tuning
Rates : [300 - 1300] /!\ Hight # Average
Expo : [ 1 / 2 / 3 / 4 / 5 ]
Yaw rates : Checked
Filters
Stick responsivity
Min throttle

= Setup
Receiver is on AUX [ 1 / 2 / 3 / 4 ]
Voltage
Rssi
Smart audio ?
Prop direction
ARM channel
*/
