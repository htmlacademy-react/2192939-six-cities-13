import { createReducer } from '@reduxjs/toolkit';
import { DEFAULT_CITY } from '../settings';
import { fillOffersListAction, selectCityAction } from './action';
import { offers } from '../mocks/offers';

const initialState = {
  cityName: DEFAULT_CITY,
  cityOffers: offers.filter((offer) => offer.city.name === DEFAULT_CITY),
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(selectCityAction, (state, action) => {
      state.cityName = action.payload;
    })
    .addCase(fillOffersListAction, (state, action) => {
      state.cityOffers = action.payload.filter(
        (offer) => offer.city.name === state.cityName
      );
    });
});
