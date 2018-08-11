import { ACTION_TYPES } from './settings.actions';

const initialState = {
  hasChanged: false,
  data: {},
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ACTION_TYPES.READ_SETTINGS_SUCCESS:
      return {
        hasChanged: false,
        data: payload,
      };

    default:
      return state;
  }
};

export default reducer;
