import { BoardState } from './board/board.reducer';
import { NavigationState } from './navigation/navigation.reducer';
import { SettingsState } from './settings/settings.reducer';

export interface State {
  board: BoardState;
  navigation: NavigationState;
  settings: SettingsState;
}
