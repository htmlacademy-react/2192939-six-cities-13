import { configureStore } from '@reduxjs/toolkit';
import { createAPI } from '../services/api';
import { redirect } from './middleware/redirect';
import { rootReducer } from './root-reducer';

const api = createAPI();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (curryGetDefaultMiddleware) =>
    curryGetDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }).concat(redirect),
});
