import { State } from 'store/types';

export const selectCurrentPage = (state: State) => state.navigation.page;
