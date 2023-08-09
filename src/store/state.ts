import { AuthStatus } from '../settings';
import { FullOffer, Offer, Offers, Reviews } from '../types/data-types';
import { store } from './index';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type UserProcess = {
  authStatus: AuthStatus;
  userName: string;
  reviews: Reviews;
}

export type AppData = {
  offers: Offers;
  fullOffer: FullOffer;
  reviews: Reviews;
  neighborPlaces: Offers;
  isOffersDataLoading: boolean;
  isFullOfferDataLoading: boolean;
  isReviewsDataLoading: boolean;
  isNeighborPlacesDataLoading: boolean;
  hasError: boolean;
};

export type AppProcess = {
  cityName: string;
  activeCard: Offer | undefined;
  sortingType: string;
}
