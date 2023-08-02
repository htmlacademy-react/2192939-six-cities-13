import { createReducer } from '@reduxjs/toolkit';
import { AuthStatus, DEFAULT_CITY } from '../settings';
import {
  loadOffersAction,
  selectCityAction,
  setOffersDataLoadingStatus,
  setUserAuthStatus,
} from './action';
import { Offers } from '../types/data-types';

const initialState = {
  cityName: DEFAULT_CITY,
  offers: [] as Offers,
  isOffersDataLoading: false,
  authStatus: AuthStatus.Unknown,
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
    });
});
