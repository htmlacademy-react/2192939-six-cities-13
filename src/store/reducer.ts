import { createReducer } from '@reduxjs/toolkit';
import { AuthStatus, DEFAULT_CITY } from '../settings';
import {
  loadOffersAction,
  selectCityAction,
  setError,
  setOffersDataLoadingStatus,
  setUserAuthStatus,
  setUserName,
} from './action';
import { Offers } from '../types/data-types';

type InitialState = {
  cityName: string;
  offers: Offers;
  isOffersDataLoading: boolean;
  authStatus: AuthStatus;
  error: string | null;
  userName: string;
};

const initialState: InitialState = {
  cityName: DEFAULT_CITY,
  offers: [],
  isOffersDataLoading: false,
  authStatus: AuthStatus.Unknown,
  error: null,
  userName: '',
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(selectCityAction, (state, action) => {
      state.cityName = action.payload;
    })
    .addCase(loadOffersAction, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    })
    .addCase(setUserAuthStatus, (state, action) => {
      state.authStatus = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(setUserName, (state, action) => {
      state.userName = action.payload;
    });
});
