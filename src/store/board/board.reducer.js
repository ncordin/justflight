export const ACTION_TYPES = {
  SET_BOARD_VERSION: 'SET_BOARD_VERSION',
};

const initialState = {};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ACTION_TYPES.SET_BOARD_VERSION:
      return {
        version: payload,
      };
    default:
      return state;
  }
};

export default reducer;
