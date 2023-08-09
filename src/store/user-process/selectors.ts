import { AuthStatus, NameSpace } from '../../settings';
import { Reviews } from '../../types/data-types';
import { State } from '../state';

export const getAuthStatus = (state: State): AuthStatus => state[NameSpace.User].authStatus;

export const getUserName = (state: State): string => state[NameSpace.User].userName;

export const getReviews = (state: State): Reviews => state[NameSpace.User].reviews;

