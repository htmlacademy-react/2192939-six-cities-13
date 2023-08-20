import { Status } from './../../settings';
import { AuthStatus, NameSpace } from '../../settings';
import { State } from '../state';

export const getAuthStatus = (state: Pick<State, NameSpace.User>): AuthStatus => state[NameSpace.User].authStatus;

export const getUserName = (state: Pick<State, NameSpace.User>): string => state[NameSpace.User].userName;

export const getLoginStatus = (state: Pick<State, NameSpace.User>): Status => state[NameSpace.User].loginStatus;
