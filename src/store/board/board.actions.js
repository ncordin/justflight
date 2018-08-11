import { boardDetailsFetcher } from '../../helpers';

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
  boardDetailsFetcher().then(details => {
    dispatch(setBoardDetails(details));
  });
};

const setBoardDetails = details => ({
  type: ACTION_TYPES.SET_BOARD_DETAILS,
  payload: details,
});
