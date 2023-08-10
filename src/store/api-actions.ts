import { getToken } from './../services/token';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { FullOffer, Offers, Review, Reviews } from '../types/data-types';
import { APIRoute, AppRoute } from '../settings';
import {
  redirectToRoute,
} from './action';
import { UserData } from '../types/user-data';
import { dropToken, saveToken } from '../services/token';
import { A, C, F, I, R, U, V } from '../types/api-types';

export const fetchOffersAction = createAsyncThunk<Offers, U, C>(
  'data/fetchOffers',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<Offers>(APIRoute.Offers);
    return data;
  }
);

export const fetchFullOfferAction = createAsyncThunk<FullOffer, I, C>(
  'data/fetchFullOffer',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<FullOffer>(
      `${APIRoute.Offers}/${offerId}`
    );
    return data;
  }
);

export const fetchReviewsFullOfferAction = createAsyncThunk<Reviews, I, C>(
  'data/fetchReviewsFullOffer',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<Reviews>(`${APIRoute.Comments}/${offerId}`);

    return data;
  }
);

export const fetchNeighborPlacesAction = createAsyncThunk<Offers, I, C>(
  'data/fetchNeighborPlaces',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<Offers>(
      `${APIRoute.Offers}/${offerId}${APIRoute.NearBy}`
    );
    return data;
  }
);

export const fetchFavoritesAction = createAsyncThunk<Offers, U, C>(
  'data/fetchFavoritesAction',
  async (_arg, { extra: api }) => {
    const token = getToken();
    const { data } = await api.get<Offers>(
      `${APIRoute.Favorites}`,
      { headers: { 'X-token': token } }
    );
    return data;
  }
);


export const checkAuthStatus = createAsyncThunk<string, U, C>(
  'user/checkAuthStatus',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<UserData>(APIRoute.Login);
    return data.email;
  }
);

export const loginAction = createAsyncThunk<string, A, C>(
  'user/login',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    const { data: { token }, } = await api.post<UserData>(APIRoute.Login, { email, password });
    saveToken(token);
    dispatch(redirectToRoute(AppRoute.Root));
    return email;
  }
);

export const logoutAction = createAsyncThunk<V, U, C>(
  'user/logout',
  async (_arg, { extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropToken();
  }
);

export const reviewAction = createAsyncThunk<Review, R, C>(
  'user/review',
  async ({ comment, rating, offerId }, { extra: api }) => {
    const token = getToken();
    const response = await api.post<Review>(
      `${APIRoute.Comments}/${offerId}`,
      {
        comment,
        rating,
      },
      { headers: { 'X-token': token } }
    );
    return response.data;
  }
);

export const favoriteStatusAction = createAsyncThunk<FullOffer, F, C>(
  'data/favoriteStatus',
  async ({ offerId, status }, { extra: api }) => {
    const token = getToken();
    const { data } = await api.post<FullOffer>(
      `${APIRoute.Favorites}/${offerId}/${status}`,
      {},
      { headers: { 'X-token': token } }
    );

    return data;
  }
);
