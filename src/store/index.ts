import { configureStore } from '@reduxjs/toolkit';
import { reducer } from './reducer';
import { createAPI } from '../services/api';
import { redirect } from './middleware/redirect';

const api = createAPI();

export const store = configureStore({
  reducer,
  middleware: (curryGetDefaultMiddleware) =>
    curryGetDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }).concat(redirect),
});
