import { ActionTypes, NavigationActions } from './navigation.actions';
import { PageTypes } from 'constants/navigation.constants';

export interface NavigationState {
  page: PageTypes;
}

const initialState: NavigationState = {
  page: PageTypes.Welcome,
};

const reducer = (state = initialState, action: NavigationActions) => {
  switch (action.type) {
    case ActionTypes.SetCurentPage:
      return { page: action.payload };

    default:
      return state;
  }
};

export default reducer;
