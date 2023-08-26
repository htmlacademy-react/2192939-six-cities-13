import { AppDispatch, State } from '../store/state';
import { AxiosInstance } from 'axios';
import { FullOffer, Offers, Reviews } from './data-types';

export type ReviewType = {
  comment: string;
  rating: number;
  offerId: string;
};

export type FavoriteType = {
  offerId: string;
  status: number;
}

export type CombinedType = {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
};

export type offerPageDataType = {
  fullOffer: FullOffer;
  reviews: Reviews;
  neighborPlaces: Offers;
}
