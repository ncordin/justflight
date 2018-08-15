import { readSettings, saveSettings as save } from '../../settings';
import { selectBoardDetails } from '../board/board.selectors';
import { selectSettings } from '../settings/settings.selectors';

export const ACTION_TYPES = {
  READ_SETTINGS_SUCCESS: 'READ_SETTINGS_SUCCESS',
  CHANGE_SETTING: 'CHANGE_SETTING',
  SAVE_SETTINGS: 'SAVE_SETTINGS',
};

export const fetchSettings = () => dispatch => {
  readSettings().then(settings => {
    dispatch(setSettings(settings));
  });
};

const setSettings = settings => ({
  type: ACTION_TYPES.READ_SETTINGS_SUCCESS,
  payload: settings,
});

export const changeSetting = (name, value) => ({
  type: ACTION_TYPES.CHANGE_SETTING,
  payload: { name, value },
});

export const saveSettings = () => (dispatch, getState) => {
  const state = getState();

  dispatch(saveSettingsStart());
  save(selectSettings(state), selectBoardDetails(state));
};

const saveSettingsStart = () => ({
  type: ACTION_TYPES.SAVE_SETTINGS,
});
