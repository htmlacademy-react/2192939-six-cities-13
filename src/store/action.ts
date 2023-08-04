import { AppRoute } from './../settings';
import { createAction } from '@reduxjs/toolkit';
import { Offers } from '../types/data-types';
import {
  LOAD_OFFERS_ACTION,
  REDIRECT_TO_ROUTE,
  SELECT_CITY_ACTION,
  SET_OFFERS_DATA_LOADING_STATUS,
  SET_USER_AUTH_STATUS,
  SET_USER_NAME,
} from './constants';
import { AuthStatus } from '../settings';

export const selectCityAction = createAction<string>(SELECT_CITY_ACTION);

export const loadOffersAction = createAction<Offers>(LOAD_OFFERS_ACTION);

export const setOffersDataLoadingStatus = createAction<boolean>(
  SET_OFFERS_DATA_LOADING_STATUS
);

export const setUserAuthStatus = createAction<AuthStatus>(SET_USER_AUTH_STATUS);

export const setUserName = createAction<string>(SET_USER_NAME);

export const redirectToRoute = createAction<AppRoute>(REDIRECT_TO_ROUTE);
