import { BoardConnection } from './types';
import { makeConnectionWithBetaflightBoard } from './index';

let boardConnecion: BoardConnection | null = null;

export const makeGlobalBoardConnectionAndSetInstance = ({
  usbModule,
}): BoardConnection => {
  if (boardConnecion) {
    throw new Error('It is impossible to open more than one board connection.');
  }
  boardConnecion = makeConnectionWithBetaflightBoard({ usbModule });

  return boardConnecion;
};

export const getGlobalBoardConnectionInstance = (): BoardConnection => {
  if (!boardConnecion) {
    throw new Error('Can not get current board instance, not yet initialized.');
  }

  return boardConnecion;
};
