import { State } from 'store/types';

export const selectIsBoardConnected = (state: State) => state.board.connected;

export const selectBoardDetails = (state: State) => state.board.details;
