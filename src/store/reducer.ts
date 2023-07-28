import { createReducer } from '@reduxjs/toolkit';
import { DEFAULT_CITY } from '../settings';
import { loadOffersAction, selectCityAction } from './action';
import { Offer } from '../types/data-types';

const initialState = {
  cityName: DEFAULT_CITY,
  cityOffers: Array<Offer>,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(selectCityAction, (state, action) => {
      state.cityName = action.payload;
    })
    .addCase(loadOffersAction, (state, action) => {
      state.cityOffers = [...action.payload];
    });
});
