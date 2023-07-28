import { createAction } from '@reduxjs/toolkit';
import { Offers } from '../types/data-types';
import { LOAD_OFFERS_ACTION, SELECT_CITY_ACTION } from './constants';

export const selectCityAction = createAction(
  SELECT_CITY_ACTION,
  (value: string) => {
    {
      return {
        payload: value,
      };
    }
  }
);

export const loadOffersAction = createAction(
  LOAD_OFFERS_ACTION,
  (value: Offers) => {
    {
      return {
        payload: value,
      };
    }
  }
);
