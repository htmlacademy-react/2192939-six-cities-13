import { FullOffer, Offer, Reviews } from './../types/data-types';
import { createReducer } from '@reduxjs/toolkit';
import { AuthStatus, DEFAULT_CITY } from '../settings';
import {
  loadFullOfferAction,
  loadNeighborPlacesAction,
  loadOffersAction,
  loadReviewsFullOfferAction,
  selectCityAction,
  setActiveCardAction,
  setFullOfferDataLoadingStatus,
  setNeighborPlacesDataLoadingStatus,
  setOffersDataLoadingStatus,
  setReviewAction,
  setReviewsDataLoadingStatus,
  setUserAuthStatus,
  setUserName,
} from './action';
import { Offers } from '../types/data-types';

type InitialState = {
  cityName: string;
  offers: Offers;
  fullOffer: FullOffer;
  reviews: Reviews;
  neighborPlaces: Offers;
  isOffersDataLoading: boolean;
  isFullOfferDataLoading: boolean;
  isReviewsDataLoading: boolean;
  isNeighborPlacesDataLoading: boolean;
  authStatus: AuthStatus;
  userName: string;
  activeCard: Offer | undefined;
};

const initialState: InitialState = {
  cityName: DEFAULT_CITY,
  offers: [],
  fullOffer: {} as FullOffer,
  reviews: [],
  neighborPlaces: [],
  isOffersDataLoading: false,
  isFullOfferDataLoading: true,
  isReviewsDataLoading: true,
  isNeighborPlacesDataLoading: true,
  authStatus: AuthStatus.Unknown,
  userName: '',
  activeCard: undefined
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(selectCityAction, (state, action) => {
      state.cityName = action.payload;
    })
    .addCase(loadOffersAction, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(loadFullOfferAction, (state, action) => {
      state.fullOffer = action.payload;
    })
    .addCase(loadReviewsFullOfferAction, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(loadNeighborPlacesAction, (state, action) => {
      state.neighborPlaces = action.payload;
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    })
    .addCase(setFullOfferDataLoadingStatus, (state, action) => {
      state.isFullOfferDataLoading = action.payload;
    })
    .addCase(setReviewsDataLoadingStatus, (state, action) => {
      state.isReviewsDataLoading = action.payload;
    })
    .addCase(setNeighborPlacesDataLoadingStatus, (state, action) => {
      state.isNeighborPlacesDataLoading = action.payload;
    })
    .addCase(setUserAuthStatus, (state, action) => {
      state.authStatus = action.payload;
    })
    .addCase(setUserName, (state, action) => {
      state.userName = action.payload;
    })
    .addCase(setReviewAction, (state, action) => {
      state.reviews.push(action.payload);
    })
    .addCase(setActiveCardAction, (state, action) => {
      state.activeCard = action.payload;
    });
});
