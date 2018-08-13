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

    case ACTION_TYPES.CHANGE_SETTING:
      const { name, value } = payload;

      return {
        hasChanged: true,
        data: {
          ...state.data,
          [name]: value,
        },
      };

    default:
      return state;
  }
};

export default reducer;
