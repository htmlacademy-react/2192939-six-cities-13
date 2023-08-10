import { AuthStatus, NameSpace } from '../../settings';
import { State } from '../state';

export const getAuthStatus = (state: State): AuthStatus => state[NameSpace.User].authStatus;

export const getUserName = (state: State): string => state[NameSpace.User].userName;


