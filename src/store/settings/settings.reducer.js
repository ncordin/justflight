import { ACTION_TYPES } from './settings.actions';

const initialState = {
  data: {},
  changes: {},
  saving: false,
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ACTION_TYPES.READ_SETTINGS_SUCCESS:
      return {
        data: payload,
        changes: {},
        saving: false,
      };

    case ACTION_TYPES.CHANGE_SETTING:
      const { name, value } = payload;

      return {
        ...state,
        changes: {
          ...state.changes,
          [name]: true,
        },
        data: {
          ...state.data,
          [name]: value,
        },
      };

    case ACTION_TYPES.SAVE_SETTINGS:
      return {
        ...state,
        changes: {},
        saving: true,
      };

    default:
      return state;
  }
};

export default reducer;
