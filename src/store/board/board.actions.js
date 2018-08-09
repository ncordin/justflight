import board from '../../board';
import { boardDetailsParser, sendCommands } from '../../helpers';

export const ACTION_TYPES = {
  BOARD_CONNECTED: 'BOARD_CONNECTED',
  BOARD_DISCONNECTED: 'BOARD_DISCONNECTED',
  SET_BOARD_DETAILS: 'SET_BOARD_DETAILS',
};

export const connected = () => ({
  type: ACTION_TYPES.BOARD_CONNECTED,
});

export const disconnected = () => ({
  type: ACTION_TYPES.BOARD_DISCONNECTED,
});

export const fetchBoardDetails = () => dispatch => {
  const commands = {
    status: 'status',
    version: 'version',
    protocol: 'get motor_pwm_protocol',
    gyroDenom: 'get gyro_sync_denom',
    pidDenom: 'get pid_process_denom',
  };

  sendCommands(commands).then(response => {
    const details = setBoardDetails(boardDetailsParser(response));

    dispatch(details);
  });
};

const setBoardDetails = details => ({
  type: ACTION_TYPES.SET_BOARD_DETAILS,
  payload: details,
});
