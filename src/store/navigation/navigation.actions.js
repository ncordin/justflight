export const ACTION_TYPES = {
  SET_CURRENT_PAGE: 'SET_CURRENT_PAGE'
};

export const setCurrentPage = page => ({
  type: ACTION_TYPES.SET_CURRENT_PAGE,
  payload: page
});
