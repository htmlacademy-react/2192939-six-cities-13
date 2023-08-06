import { AppRoute } from './../settings';
import { createAction } from '@reduxjs/toolkit';
import { FullOffer, Offer, Offers, Review, Reviews } from '../types/data-types';
import {
  LOAD_FULL_OFFER_ACTION,
  LOAD_NEIGHBOR_PLACES_ACTION,
  LOAD_OFFERS_ACTION,
  LOAD_REVIEWS_FULL_OFFER_ACTION,
  REDIRECT_TO_ROUTE,
  SELECT_CITY_ACTION,
  SET_REVIEW_ACTION,
  SET_FULL_OFFER_DATA_LOADING_STATUS,
  SET_NEIGHBOR_PLACES_DATA_LOADING_STATUS,
  SET_OFFERS_DATA_LOADING_STATUS,
  SET_REVIEWS_DATA_LOADING_STATUS,
  SET_USER_AUTH_STATUS,
  SET_USER_NAME,
  SET_ACTIVE_CARD_ACTION,
} from './constants';
import { AuthStatus } from '../settings';

export const selectCityAction = createAction<string>(SELECT_CITY_ACTION);

export const loadOffersAction = createAction<Offers>(LOAD_OFFERS_ACTION);

export const loadFullOfferAction = createAction<FullOffer>(
  LOAD_FULL_OFFER_ACTION
);

export const loadReviewsFullOfferAction = createAction<Reviews>(
  LOAD_REVIEWS_FULL_OFFER_ACTION
);

export const loadNeighborPlacesAction = createAction<Offers>(
  LOAD_NEIGHBOR_PLACES_ACTION
);

export const setOffersDataLoadingStatus = createAction<boolean>(
  SET_OFFERS_DATA_LOADING_STATUS
);

export const setFullOfferDataLoadingStatus = createAction<boolean>(
  SET_FULL_OFFER_DATA_LOADING_STATUS
);

export const setReviewsDataLoadingStatus = createAction<boolean>(
  SET_REVIEWS_DATA_LOADING_STATUS
);

export const setNeighborPlacesDataLoadingStatus = createAction<boolean>(
  SET_NEIGHBOR_PLACES_DATA_LOADING_STATUS
);

export const setUserAuthStatus = createAction<AuthStatus>(SET_USER_AUTH_STATUS);

export const setUserName = createAction<string>(SET_USER_NAME);

export const redirectToRoute = createAction<AppRoute>(REDIRECT_TO_ROUTE);

export const setReviewAction = createAction<Review>(SET_REVIEW_ACTION);

export const setActiveCardAction = createAction<Offer | undefined>(SET_ACTIVE_CARD_ACTION);
