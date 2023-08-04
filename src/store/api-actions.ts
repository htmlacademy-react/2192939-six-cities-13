import { createAsyncThunk } from '@reduxjs/toolkit';
import { Offers } from '../types/data-types';
import {
  APIRoute,
  AppRoute,
  AuthStatus,
  TIMEOUT_SHOW_ERROR,
} from '../settings';
import {
  loadOffersAction,
  redirectToRoute,
  setError,
  setOffersDataLoadingStatus,
  setUserAuthStatus,
  setUserName,
} from './action';
import { UserData } from '../types/user-data';
import { dropToken, saveToken } from '../services/token';
import { store } from './';
import { A, C, U, V } from '../types/api-types';

export const fetchOffersAction = createAsyncThunk<V, U, C>(
  'data/fetchOffers',
  async (_arg, { dispatch, extra: api }) => {
    dispatch(setOffersDataLoadingStatus(true));
    const { data } = await api.get<Offers>(APIRoute.Offers);
    dispatch(setOffersDataLoadingStatus(false));
    dispatch(loadOffersAction(data));
  }
);

export const checkAuthStatus = createAsyncThunk<V, U, C>(
  'user/checkAuthStatus',
  async (_arg, { dispatch, extra: api }) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(setUserAuthStatus(AuthStatus.Auth));
    } catch {
      dispatch(setUserAuthStatus(AuthStatus.NoAuth));
    }
  }
);

export const loginAction = createAsyncThunk<V, A, C>(
  'user/login',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    const {
      data: { token },
    } = await api.post<UserData>(APIRoute.Login, { email, password });
    saveToken(token);

    dispatch(setUserAuthStatus(AuthStatus.Auth));
    dispatch(setUserName(email));
    dispatch(redirectToRoute(AppRoute.Root));
  }
);

export const logoutAction = createAsyncThunk<V, U, C>(
  'user/logout',
  async (_arg, { dispatch, extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropToken();

    dispatch(setUserAuthStatus(AuthStatus.NoAuth));
  }
);

export const clearErrorAction = createAsyncThunk('main/clearError', () => {
  setTimeout(() => store.dispatch(setError(null)), TIMEOUT_SHOW_ERROR);
});
