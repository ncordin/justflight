import { ACTION_TYPES } from './settings.actions';
import { BoardSettings } from 'types';

export interface SettingsState {
  data: BoardSettings | null;
  changes: { [key: string]: boolean };
  saving: boolean;
}

const initialState: SettingsState = {
  data: null,
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
      const previousSetting = state.data[name];

      return {
        ...state,
        changes: {
          ...state.changes,
          [name]: true,
        },
        data: {
          ...state.data,
          [name]: { ...previousSetting, current: value },
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
