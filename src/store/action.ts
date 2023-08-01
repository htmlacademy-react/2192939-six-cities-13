import { createAction } from '@reduxjs/toolkit';
import { Offers } from '../types/data-types';
import {
  LOAD_OFFERS_ACTION,
  SELECT_CITY_ACTION,
  SET_OFFERS_DATA_LOADING_STATUS,
} from './constants';

export const selectCityAction = createAction<string>(SELECT_CITY_ACTION);

export const loadOffersAction = createAction<Offers>(LOAD_OFFERS_ACTION);

export const setOffersDataLoadingStatus = createAction<boolean>(
  SET_OFFERS_DATA_LOADING_STATUS
);
