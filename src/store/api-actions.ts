import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from './state';
import { Offers } from '../types/data-types';
import { APIRoute, AuthStatus, TIMEOUT_SHOW_ERROR } from '../settings';
import {
  loadOffersAction,
  setError,
  setOffersDataLoadingStatus,
  setUserAuthStatus,
  setUserName,
} from './action';
import { UserData } from '../types/user-data';
import { dropToken, saveToken } from '../services/token';
import { AuthData } from '../types/auth-data';
import { store } from './';

export const fetchOffersAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchOffers', async (_arg, { dispatch, extra: api }) => {
  dispatch(setOffersDataLoadingStatus(true));
  const { data } = await api.get<Offers>(APIRoute.Offers);
  dispatch(setOffersDataLoadingStatus(false));
  dispatch(loadOffersAction(data));
});

type V = void;
type U = undefined;
type C = {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
};

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

export const loginAction = createAsyncThunk<V, AuthData, C>(
  'user/login',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    const {
      data: { token },
    } = await api.post<UserData>(APIRoute.Login, { email, password });
    saveToken(token);

    dispatch(setUserAuthStatus(AuthStatus.Auth));
    dispatch(setUserName(email));
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
