import { combineReducers } from 'redux';
import board from './board/board.reducer';
import navigation from './navigation/navigation.reducer';

const rootReducer = combineReducers({
  board,
  navigation
});

export default rootReducer;
