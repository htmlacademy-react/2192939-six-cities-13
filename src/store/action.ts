import { createAction } from '@reduxjs/toolkit';
import { Offers } from '../types/data-types';

export const selectCityAction = createAction(
  'main/selectCityAction',
  (value: string) => {
    {
      return {
        payload: value,
      };
    }
  }
);

export const fillOffersListAction = createAction(
  'main/fillCityListAction',
  (value: Offers) => ({ payload: value })
);
