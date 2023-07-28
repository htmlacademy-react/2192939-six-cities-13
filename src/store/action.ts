import { createAction } from '@reduxjs/toolkit';

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
