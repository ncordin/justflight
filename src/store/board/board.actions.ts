import { boardDetailsFetcher, BoardDetails } from '../../helpers';

export enum ActionTypes {
  BoardConnected = 'BOARD_CONNECTED',
  BoardDisconnected = 'BOARD_DISCONNECTED',
  SetBoardDetails = 'SET_BOARD_DETAILS',
}

interface ConnectedAction {
  type: typeof ActionTypes.BoardConnected;
}

interface DisconnectedAction {
  type: typeof ActionTypes.BoardDisconnected;
}

interface SetBoardDetailsAction {
  type: typeof ActionTypes.SetBoardDetails;
  payload: BoardDetails;
}

export type BoardActions =
  | ConnectedAction
  | DisconnectedAction
  | SetBoardDetailsAction;

export const connected = (): ConnectedAction => ({
  type: ActionTypes.BoardConnected,
});

export const disconnected = (): DisconnectedAction => ({
  type: ActionTypes.BoardDisconnected,
});

export const fetchBoardDetails = () => dispatch => {
  boardDetailsFetcher().then(details => {
    dispatch(setBoardDetails(details));
  });
};

const setBoardDetails = (details: BoardDetails) => ({
  type: ActionTypes.SetBoardDetails,
  payload: details,
});
