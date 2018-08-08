import { ACTION_TYPES } from './navigation.actions';

const initialState = {
  page: null
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ACTION_TYPES.SET_CURRENT_PAGE:
      return { page: payload };

    default:
      return state;
  }
};

export default reducer;
