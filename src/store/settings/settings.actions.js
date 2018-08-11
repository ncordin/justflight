import { readSettings } from '../../settings';

export const ACTION_TYPES = {
  READ_SETTINGS_SUCCESS: 'READ_SETTINGS_SUCCESS',
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
