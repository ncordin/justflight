import { ACTION_TYPES } from './board.actions';

const initialState = {
  connected: false,
  details: {}
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ACTION_TYPES.BOARD_CONNECTED:
      return {
        ...state,
        connected: true
      };

    case ACTION_TYPES.BOARD_DISCONNECTED:
      return {
        ...state,
        connected: false
      };

    case ACTION_TYPES.SET_BOARD_DETAILS:
      return {
        ...state,
        details: payload
      };

    default:
      return state;
  }
};

export default reducer;
