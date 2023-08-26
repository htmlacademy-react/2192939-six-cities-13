import { NameSpace } from '../../settings';
import { State, UserProcess } from '../state';
import { createSelector } from '@reduxjs/toolkit';

export const getAuthStatus = createSelector(
  (state: Pick<State, NameSpace.User>) => state[NameSpace.User],
  (state: UserProcess) => state.authStatus
);

export const getUserName = createSelector(
  (state: Pick<State, NameSpace.User>) => state[NameSpace.User],
  (state: UserProcess) => state.userName
);

export const getLoginStatus = createSelector(
  (state: Pick<State, NameSpace.User>) => state[NameSpace.User],
  (state: UserProcess) => state.loginStatus
);
