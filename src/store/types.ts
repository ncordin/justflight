import { BoardState } from './board/board.reducer';
import { NavigationState } from './navigation/navigation.reducer';
import { SettingsState } from './settings/settings.reducer';

export interface State {
  navigation: NavigationState;
  board: BoardState;
  settings: SettingsState;
}
