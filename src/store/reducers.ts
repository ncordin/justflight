import { combineReducers } from 'redux';
import board from './board/board.reducer';
import navigation from './navigation/navigation.reducer';
import settings from './settings/settings.reducer';

const rootReducer = combineReducers({
  board,
  navigation,
  settings,
});

export default rootReducer;
