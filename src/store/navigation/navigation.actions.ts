import { selectIsBoardConnected } from '../board/board.selectors';
import { PageTypes, getPageDetail } from '../../constants/navigation.constants';

export enum ActionTypes {
  SetCurentPage = 'SET_CURRENT_PAGE',
}

interface SetCurrentPageAction {
  type: typeof ActionTypes.SetCurentPage;
  payload: PageTypes;
}

export type NavigationActions = SetCurrentPageAction;

export const setCurrentPage = (page: PageTypes) => (dispatch, getState) => {
  const isBoardConnected = selectIsBoardConnected(getState());
  const pageDetails = getPageDetail(page);

  if (pageDetails.requireBoard === false || isBoardConnected) {
    dispatch({
      type: ActionTypes.SetCurentPage,
      payload: page,
    });
  }
};
