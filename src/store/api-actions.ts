import { getToken } from './../services/token';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { FullOffer, Offers, Review, Reviews } from '../types/data-types';
import { APIRoute, AppRoute, AuthStatus } from '../settings';
import {
  loadFullOfferAction,
  loadNeighborPlacesAction,
  loadOffersAction,
  loadReviewsFullOfferAction,
  redirectToRoute,
  setFullOfferDataLoadingStatus,
  setNeighborPlacesDataLoadingStatus,
  setOffersDataLoadingStatus,
  setReviewAction,
  setReviewsDataLoadingStatus,
  setUserAuthStatus,
  setUserName,
} from './action';
import { UserData } from '../types/user-data';
import { dropToken, saveToken } from '../services/token';
import { A, C, I, R, U, V } from '../types/api-types';

export const fetchOffersAction = createAsyncThunk<V, U, C>(
  'data/fetchOffers',
  async (_arg, { dispatch, extra: api }) => {
    dispatch(setOffersDataLoadingStatus(true));
    const { data } = await api.get<Offers>(APIRoute.Offers);
    dispatch(setOffersDataLoadingStatus(false));
    dispatch(loadOffersAction(data));
  }
);

export const fetchFullOfferAction = createAsyncThunk<V, I, C>(
  'data/fetchFullOffer',
  async (offerId, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<FullOffer>(
        `${APIRoute.Offers}/${offerId}`
      );
      dispatch(setFullOfferDataLoadingStatus(false));
      dispatch(loadFullOfferAction(data));
    } catch {
      dispatch(redirectToRoute(AppRoute.NoFound));
    }
  }
);

export const fetchReviewsFullOfferAction = createAsyncThunk<V, I, C>(
  'data/fetchReviewsFullOffer',
  async (offerId, { dispatch, extra: api }) => {
    const { data } = await api.get<Reviews>(`${APIRoute.Comments}/${offerId}`);
    dispatch(setReviewsDataLoadingStatus(false));
    dispatch(loadReviewsFullOfferAction(data));
  }
);

export const fetchNeighborPlacesAction = createAsyncThunk<V, I, C>(
  'data/fetchNeighborPlaces',
  async (offerId, { dispatch, extra: api }) => {
    const { data } = await api.get<Offers>(
      `${APIRoute.Offers}/${offerId}${APIRoute.NearBy}`
    );
    dispatch(setNeighborPlacesDataLoadingStatus(false));
    dispatch(loadNeighborPlacesAction(data));
  }
);

export const checkAuthStatus = createAsyncThunk<V, U, C>(
  'user/checkAuthStatus',
  async (_arg, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<UserData>(APIRoute.Login);
      dispatch(setUserAuthStatus(AuthStatus.Auth));
      dispatch(setUserName(data.email));
    } catch {
      dispatch(setUserAuthStatus(AuthStatus.NoAuth));
    }
  }
);

export const loginAction = createAsyncThunk<V, A, C>(
  'user/login',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    const {
      data: { token },
    } = await api.post<UserData>(APIRoute.Login, { email, password });
    saveToken(token);

    dispatch(setUserAuthStatus(AuthStatus.Auth));
    dispatch(setUserName(email));
    dispatch(redirectToRoute(AppRoute.Root));
  }
);

export const logoutAction = createAsyncThunk<V, U, C>(
  'user/logout',
  async (_arg, { dispatch, extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropToken();

    dispatch(setUserAuthStatus(AuthStatus.NoAuth));
  }
);

export const reviewAction = createAsyncThunk<V, R, C>(
  'user/review',
  async ({ comment, rating, offerId }, { dispatch, extra: api }) => {
    const token = getToken();
    const response = await api.post<Review>(
      `${APIRoute.Comments}/${offerId}`,
      {
        comment,
        rating,
      },
      { headers: { 'X-token': token } }
    );
    dispatch(setReviewAction(response.data));
  }
);
