import { AuthStatus } from '../settings';
import { FullOffer, Offer, Offers, Reviews } from '../types/data-types';
import { store } from './index';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type UserProcess = {
  authStatus: AuthStatus;
  userName: string;
}

export type AppData = {
  offers: Offers;
  fullOffer: FullOffer;
  reviews: Reviews;
  neighborPlaces: Offers;
  favorites: Offers;
  isOffersDataLoading: boolean;
  isFullOfferDataLoading: boolean;
  isReviewsDataLoading: boolean;
  isNeighborPlacesDataLoading: boolean;
  isFavoritesLoading: boolean;
  isFavoriteAdding: boolean;
  hasError: boolean;
  favoritesCount: number;
};

export type AppProcess = {
  cityName: string;
  activeCard: Offer | undefined;
  sortingType: string;
}
