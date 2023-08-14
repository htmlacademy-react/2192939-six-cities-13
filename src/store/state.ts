import { AuthStatus } from '../settings';
import { FullOffer, Offer, Offers, Reviews } from '../types/data-types';
import { store } from './index';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type UserProcess = {
  authStatus: AuthStatus;
  loginStatus: string;
  userName: string;
}

export type AppData = {
  offers: Offers;
  fullOffer: FullOffer;
  reviews: Reviews;
  neighborPlaces: Offers;
  favorites: (Offer | FullOffer)[];
  isOffersDataLoading: boolean;
  isFullOfferDataLoading: boolean;
  isReviewsDataLoading: boolean;
  isNeighborPlacesDataLoading: boolean;
  isFavoritesLoading: boolean;
  isFavoriteAdding: boolean;
  hasError: boolean;
  currentCityName: string;
  activeCard: Offer | null;
  sortingType: string;
  statusReview: string;
};
