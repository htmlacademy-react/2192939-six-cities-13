import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { reducer } from './reducer';
import { createAPI } from '../axios-api/api';

const api = createAPI();

export const store = configureStore({
  reducer,
  middleware: (curryGetDefaultMiddleware) =>
    curryGetDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});
