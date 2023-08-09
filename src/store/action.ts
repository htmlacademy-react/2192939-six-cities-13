import { AppRoute } from './../settings';
import { createAction } from '@reduxjs/toolkit';
import {
  REDIRECT_TO_ROUTE,
} from './constants';

export const redirectToRoute = createAction<AppRoute>(REDIRECT_TO_ROUTE);
