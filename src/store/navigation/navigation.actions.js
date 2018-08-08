import { selectIsBoardConnected } from '../board/board.selectors';
import { PAGE_DETAILS } from '../../constants/navigation.constants';

export const ACTION_TYPES = {
  SET_CURRENT_PAGE: 'SET_CURRENT_PAGE'
};

export const setCurrentPage = page => (dispatch, getState) => {
  const isBoardConnected = selectIsBoardConnected(getState());
  const pageDetails = PAGE_DETAILS[page] || {};

  if (pageDetails.requireBoard === false || isBoardConnected) {
    dispatch({
      type: ACTION_TYPES.SET_CURRENT_PAGE,
      payload: page
    });
  }
};
