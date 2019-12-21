import { ActionTypes, BoardActions } from './board.actions';
import { BoardDetails } from 'helpers/index';

export interface BoardState {
  connected: boolean;
  details: BoardDetails | null;
}

const initialState: BoardState = {
  connected: false,
  details: null,
};

const reducer = (state = initialState, action: BoardActions): BoardState => {
  switch (action.type) {
    case ActionTypes.BoardConnected:
      return {
        ...state,
        connected: true,
      };

    case ActionTypes.BoardDisconnected:
      return {
        ...state,
        connected: false,
      };

    case ActionTypes.SetBoardDetails:
      return {
        ...state,
        details: action.paylaod,
      };

    default:
      return state;
  }
};

export default reducer;
