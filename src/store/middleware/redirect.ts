import { Middleware } from '@reduxjs/toolkit';
import browserHistory from '../../browser-history';
import { PayloadAction } from '@reduxjs/toolkit';
import { reducer } from '../reducer';

type Reducer = ReturnType<typeof reducer>;

export const redirect: Middleware<unknown, Reducer> =
  () => (next) => (action: PayloadAction<string>) => {
    if (action.type === 'user/redirectToRoute') {
      browserHistory.push(action.payload);
    }
    return next(action);
  };
