import { createReducer } from '@reduxjs/toolkit';
import { DEFAULT_CITY } from '../constants/settings';
import {
  loadOffersAction,
  selectCityAction,
  setOffersDataLoadingStatus,
} from './action';
import { Offers } from '../types/data-types';

const initialState = {
  cityName: DEFAULT_CITY,
  offers: [] as Offers,
  isOffersDataLoading: true,
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
    });
});
