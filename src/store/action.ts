import { createAction } from '@reduxjs/toolkit';
import { Offers } from '../types/data-types';
import {
  LOAD_OFFERS_ACTION,
  SELECT_CITY_ACTION,
  SET_ERROR,
  SET_OFFERS_DATA_LOADING_STATUS,
  SET_USER_AUTH_STATUS,
} from './constants';
import { AuthStatus } from '../settings';

export const selectCityAction = createAction<string>(SELECT_CITY_ACTION);

export const loadOffersAction = createAction<Offers>(LOAD_OFFERS_ACTION);

export const setOffersDataLoadingStatus = createAction<boolean>(
  SET_OFFERS_DATA_LOADING_STATUS
);

export const setUserAuthStatus = createAction<AuthStatus>(SET_USER_AUTH_STATUS);

export const setError = createAction<string | null>(SET_ERROR);
