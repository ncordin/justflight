import { readSettings } from '../../settings';

export const ACTION_TYPES = {
  READ_SETTINGS_SUCCESS: 'READ_SETTINGS_SUCCESS',
  CHANGE_SETTING: 'CHANGE_SETTING',
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
