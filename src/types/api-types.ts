import { AppDispatch, State } from '../store/state';
import { AxiosInstance } from 'axios';

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
