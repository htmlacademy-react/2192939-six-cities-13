import { createAsyncThunk } from '@reduxjs/toolkit';
import { FullOffer, Offers, Review, Reviews } from '../types/data-types';
import { APIRoute, AppRoute } from '../settings';
import {
  redirectToRoute,
} from './action';
import { UserData } from '../types/user-data';
import { dropToken, saveToken } from '../services/token';
import { CombinedType, FavoriteType, ReviewType, offerPageDataType } from '../types/api-types';
import { AuthData } from '../types/auth-data';

export const fetchOffersAction = createAsyncThunk<Offers, undefined, CombinedType>(
  'data/fetchOffers',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<Offers>(APIRoute.Offers);
    return data;
  }
);

export const fetchFavoritesAction = createAsyncThunk<Offers, undefined, CombinedType>(
  'data/fetchFavoritesAction',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<Offers>(
      `${APIRoute.Favorites}`,
    );
    return data;
  }
);

export const fetchOfferPageDataAction = createAsyncThunk<offerPageDataType, string, CombinedType>(
  'data/fetchOfferPageDataAction',
  async (offerId, { extra: api }) => {
    const { data: fullOffer } = await api.get<FullOffer>(`${APIRoute.Offers}/${offerId}`);
    const { data: reviews } = await api.get<Reviews>(`${APIRoute.Comments}/${offerId}`);
    const { data: neighborPlaces } =
      await api.get<Offers>(`${APIRoute.Offers}/${offerId}${APIRoute.NearBy}`);
    return { fullOffer, reviews, neighborPlaces };
  }
);


export const checkAuthStatus = createAsyncThunk<string, undefined, CombinedType>(
  'user/checkAuthStatus',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<UserData>(APIRoute.Login);
    return data.email;
  }
);

export const loginAction = createAsyncThunk<string, AuthData, CombinedType>(
  'user/login',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    const { data: { token }, } =
      await api.post<UserData>(APIRoute.Login, { email, password });
    saveToken(token);
    dispatch(redirectToRoute(AppRoute.Root));
    return email;
  }
);

export const logoutAction = createAsyncThunk<void, undefined, CombinedType>(
  'user/logout',
  async (_arg, { extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropToken();
  }
);

export const reviewAction = createAsyncThunk<Review, ReviewType, CombinedType>(
  'user/review',
  async ({ comment, rating, offerId }, { extra: api }) => {
    const response = await api.post<Review>(
      `${APIRoute.Comments}/${offerId}`,
      {
        comment,
        rating,
      },
    );
    return response.data;
  }
);


export const favoriteStatusAction = createAsyncThunk<FullOffer, FavoriteType, CombinedType>(
  'data/favoriteStatus',
  async ({ offerId, status }, { extra: api }) => {
    const { data } = await api.post<FullOffer>(
      `${APIRoute.Favorites}/${offerId}/${status}`,
      {},
    );

    return data;
  }
);
